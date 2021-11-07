import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import collectionComponent from "../pages/collection/collection.component";

const config = {
  apiKey: "AIzaSyBXo7JI7NGJKsYD7pY1C8OKWPESB2_bAmw",
  authDomain: "lasttry-df740.firebaseapp.com",
  projectId: "lasttry-df740",
  storageBucket: "lasttry-df740.appspot.com",
  messagingSenderId: "328897066997",
  appId: "1:328897066997:web:0e816b28a0ac556f5852bc",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// console.log(
//   firestore
//     .collection("users")
//     .doc("YezbakqI11XjtwSgVo7v")
//     .collection("cartItems")
//     .doc("gNC7eGGNjcZn015K6lvC")
// );

export const createuserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // console.log(userAuth.displayName);

  const snapShot = await userRef.get();
  console.log(userRef);
  // console.log(snapShot);

  // console.log(snapShot);
  if (!snapShot.exists) {
    const { displayName, email, phoneNumber } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        phoneNumber,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

export const converCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser=()=>{
  return new Promise((resolve, reject)=>{
    const unsubscribe= auth.onAuthStateChanged(userAuth=>{
        unsubscribe()
        resolve(userAuth)
    }, reject)
})
}

//   const provider = new firebase.auth.GoogleAuthProvider();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;

