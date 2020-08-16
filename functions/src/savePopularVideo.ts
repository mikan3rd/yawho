import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as dayjs from "dayjs";
import { google, youtube_v3 } from "googleapis";

import { YoutubeChannelCollectionPath, YoutubeVideoCollectionPath } from "./firebase/collectionPath";
import { formatVideoData } from "./utils/formatYoutubeData";
import { getChannelPopularVideo } from "./getChannelPopularVideo";
import { getVideoCategories } from "./utils/getVideoCategories";

const YOUTUBE_API_KEY = functions.config().youtube.api_key;

const { FieldValue } = admin.firestore;

export const savePopularVideo = async () => {
  const db = admin.firestore();
  const youtubeChannelCollection = db.collection(YoutubeChannelCollectionPath);

  const now = dayjs().add(9, "hour");
  const updatedAt = now.subtract(1, "day");
  const docs = await youtubeChannelCollection.where("updatedAt", ">=", updatedAt).get();

  const channelDataArray: FirebaseFirestore.DocumentData[] = [];
  docs.forEach((doc) => {
    const data = doc.data();
    channelDataArray.push(data);
  });

  const videoCategories = await getVideoCategories();

  for (const channel of channelDataArray) {
    const { uniqueVideCategoryIds, uniqueVideCategories } = await savePopularVideoByChannel(
      channel.id,
      videoCategories,
    );
  }
};

const savePopularVideoByChannel = async (channelId: string, videoCategories: youtube_v3.Schema$VideoCategory[]) => {
  const service = google.youtube({ version: "v3", auth: YOUTUBE_API_KEY });

  const db = admin.firestore();
  const youtubeVideoCollection = db.collection(YoutubeVideoCollectionPath);

  const videoIds = await getChannelPopularVideo(channelId);

  const videoResponse = await service.videos.list({
    part: ["id", "snippet", "contentDetails", "statistics", "player"],
    hl: "ja",
    regionCode: "JP",
    id: videoIds,
  });

  const videoCategoryIds: string[] = [];

  for (const item of videoResponse.data.items) {
    const {
      id,
      snippet: { categoryId },
    } = item;
    const data = formatVideoData(item);
    const videoRef = youtubeVideoCollection.doc(id);
    const videoDoc = await youtubeVideoCollection.doc(id).get();

    const targetVideCategory = videoCategories.find((category) => categoryId === category.id);

    const videoData = {
      ...data,
      videCategory: targetVideCategory,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    if (videoDoc.exists) {
      delete videoData.createdAt;
    }

    await videoRef.set(videoData, { merge: true });

    videoCategoryIds.push(categoryId);
  }

  const uniqueVideCategoryIds = Array.from(new Set(videoCategoryIds));
  const uniqueVideCategories = videoCategories.filter((category) => uniqueVideCategoryIds.includes(category.id));

  return { uniqueVideCategoryIds, uniqueVideCategories };
};
