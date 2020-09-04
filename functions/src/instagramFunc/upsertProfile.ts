import { AccountCollectionPath, FieldValue, InstagramProfileCollectionPath, db } from "../firebase/collectionPath";

import { getUserData } from "./common/getUserData";

export const upsertProfile = async (accountId: string, username: string) => {
  console.log(`accountId: ${accountId}, username: ${username}`);
  const userData = await getUserData(username);

  const { id } = userData;
  if (!id) {
    console.error(`NOT FOUND: accountId: ${accountId}, username: ${username}`);
    return false;
  }

  const accountCollection = db.collection(AccountCollectionPath);
  const instagramProfileCollection = db.collection(InstagramProfileCollectionPath);

  const accountRef = accountCollection.doc(accountId);
  const instagramMainRef = instagramProfileCollection.doc(id);
  const instagramMainDoc = await instagramMainRef.get();

  const instagramProfilerData = {
    ...userData,
    accountRef,
    updatedAt: FieldValue.serverTimestamp(),
    createdAt: FieldValue.serverTimestamp(),
  };

  if (instagramMainDoc.exists) {
    delete instagramProfilerData.createdAt;
  }

  await instagramMainRef.set(instagramProfilerData, { merge: true });

  const accountData: IAccountData = {
    instagramMainRef,
    updatedAt: FieldValue.serverTimestamp(),
  };

  await accountRef.set(accountData, { merge: true });

  return true;
};
