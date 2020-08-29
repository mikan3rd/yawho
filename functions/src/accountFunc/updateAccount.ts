import * as admin from "firebase-admin";
import { PubSub } from "@google-cloud/pubsub";
import { google } from "googleapis";

import { toBufferJson } from "../common/utils";
import { ServiceAccountByYoutubeJsonType, ServiceAccountByYoutubeTopic } from "../firebase/topic";
import { AccountCollectionPath } from "../firebase/collectionPath";
import { getUserById } from "../twitterFunc/common/api";
import { formatTwitterUserData } from "../twitterFunc/common/formatUserData";
import { updateTwitterUser } from "../twitterFunc/common/updateTwitterUser";
import { formatChannelData } from "../youtubeFunc/common/formatYoutubeData";
import { updateChannel } from "../youtubeFunc/common/updateChannel";
import { api_key } from "../common/config";

export const updateAccount = async (accountId: string) => {
  const db = admin.firestore();
  const accountCollection = db.collection(AccountCollectionPath);

  const accountRef = accountCollection.doc(accountId);
  const accountDoc = await accountRef.get();

  if (!accountDoc.exists) {
    console.log(`NOT FOUND, accountId: ${accountId}`);
    return false;
  }

  const { youtubeMainRef, twitterMainRef } = accountDoc.data() as IAccountData;

  const pubSub = new PubSub();
  if (youtubeMainRef) {
    const { id } = (await youtubeMainRef.get()).data();
    const topicData: ServiceAccountByYoutubeJsonType = { channelId: id };
    await pubSub.topic(ServiceAccountByYoutubeTopic).publish(toBufferJson(topicData));

    const service = google.youtube({ version: "v3", auth: api_key });
    const channelResponse = await service.channels.list({
      part: ["id", "snippet", "contentDetails", "statistics", "topicDetails", "brandingSettings"],
      id: [id],
    });
    const channelData = formatChannelData(channelResponse.data.items[0]);
    await updateChannel(accountId, channelData);
  }

  if (twitterMainRef) {
    const { id } = (await twitterMainRef.get()).data() as TwitterUserDataType;
    const {
      data: { data },
    } = await getUserById(id);
    const twitterUser = formatTwitterUserData(data);
    await updateTwitterUser(accountId, twitterUser);
  }

  return true;
};
