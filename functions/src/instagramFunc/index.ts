import { sentryWrapper } from "../common/sentry";
import { functions } from "../firebase/functions";
import { UpsertInstagramUserJsonType, UpsertInstagramUserTopic } from "../firebase/topic";

import { upsertProfile } from "./upsertProfile";

export const upsertProfilePubSub = functions
  .runWith({ maxInstances: 10 })
  .pubsub.topic(UpsertInstagramUserTopic)
  .onPublish(
    sentryWrapper(async (message) => {
      const { accountId, username } = message.json as UpsertInstagramUserJsonType;
      return await upsertProfile(accountId, username);
    }),
  );

export const upsertProfileTest = functions.https.onRequest(
  sentryWrapper(async (req, res) => {
    const accountId = "";
    const username = "yukos0520";
    await upsertProfile(accountId, username);
    res.send();
  }),
);