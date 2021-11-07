import ShopActionTypes from "./shop.types";



export const fetchCollectionsSuccess =collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload:collectionsMap
})

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsFailure = (erorrMessage)=>({
    type:ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload:erorrMessage
})



// import {
//   firestore,
//   converCollectionsSnapshotToMap,
// } from "../../../firebase/firebase.utils";

// export const fetchCollectionsStartAsync = () => {
//   return (dispatch) => {
//     const collectionRef = firestore.collection("collections");
//     dispatch(fetchCollectionsStart());
//     collectionRef.get().then((snapshot) => {
//       const collectionsMap = converCollectionsSnapshotToMap(snapshot); 
//       dispatch(fetchCollectionsSuccess(collectionsMap));
      
//     }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
//   };
// };
