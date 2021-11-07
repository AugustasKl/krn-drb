import { takeLatest, call,all, put } from "redux-saga/effects";
import ShopActionTypes from "./shop.types";
import {
  firestore,
  converCollectionsSnapshotToMap,
} from "../../../firebase/firebase.utils";

import {
  fetchCollectionsFailure,
  fetchCollectionsSuccess,
} from "./shop.actions";

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection("collections");
    // console.log(collectionRef);
    const snapshot = yield collectionRef.get();
    // console.log(snapshot);
    const collectionsMap = yield call(converCollectionsSnapshotToMap, snapshot);
    console.log(collectionsMap);
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }

  //     collectionRef.get().then((snapshot) => {
  //       const collectionsMap = converCollectionsSnapshotToMap(snapshot);
  //       dispatch(fetchCollectionsSuccess(collectionsMap));
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas(){
  yield all([call(fetchCollectionsStart)])
}