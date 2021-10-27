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
  appId: "1:328897066997:web:0e816b28a0ac556f5852bc"
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

export const addCollectionAndDocuments = async(collectionKey, objectsToAdd) => {
  const collectionRef=firestore.collection(collectionKey)
  console.log(collectionRef)

  const batch =firestore.batch()
  objectsToAdd.forEach((obj)=>{
    const newDocRef=collectionRef.doc();
    batch.set(newDocRef, obj)
  })
  return await batch.commit()
}



//   const provider = new firebase.auth.GoogleAuthProvider();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
