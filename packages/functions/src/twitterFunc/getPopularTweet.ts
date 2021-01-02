import admin from "firebase-admin";

import { TwitterTweetCollectionPath, db } from "../firebase/collectionPath";

import { getTweets } from "./common/api";
import { crawlSearchTweet } from "./common/crawlSearchTweet";
import { formatTweetData } from "./common/formatUserData";

const { FieldValue } = admin.firestore;

export const getPopularTweet = async (username: string) => {
  const tweetIds = await crawlSearchTweet(username);

  console.log(tweetIds);

  if (!tweetIds.length) {
    return false;
  }

  const { data } = await getTweets(tweetIds);

  const tweetCollection = db.collection(TwitterTweetCollectionPath);

  for (const tweetObject of data) {
    const tweetData = formatTweetData(tweetObject);
    const tweetRef = tweetCollection.doc(tweetData.id);
    const tweetDoc = await tweetRef.get();

    const firestoreTweetData = {
      ...tweetData,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    if (tweetDoc.exists) {
      delete firestoreTweetData.createdAt;
    }

    await tweetRef.set(firestoreTweetData, { merge: true });
  }

  return true;
};
