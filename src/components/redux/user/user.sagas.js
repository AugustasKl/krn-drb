import { takeLatest, put, all, call } from "redux-saga/effects";
import UserActionTypes from "./user.types";

import {
  signInFailure,
  signInSuccess,
  signOutFailure,
  signOutSuccess,
  signUpSuccess,
  signUpFailure,
} from "./user.action";
import {
  auth,
  googleProvider,
  createuserProfileDocument,
  getCurrentUser,
} from "../../../firebase/firebase.utils";
import { useRef } from "react";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createuserProfileDocument,
      userAuth,
      additionalData
    );
    const userSnapshot = yield userRef.get();
    console.log(userSnapshot);
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    // const userRef = yield call(createuserProfileDocument, user);
    // const userSnapshot = yield userRef.get();
    // yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    // const userRef = yield call(createuserProfileDocument, user);
    // const userSnapshot = yield userRef.get();
    // yield put (signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

// this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
//   if(userAuth){
//     const userRef = await createuserProfileDocument(userAuth);
//     console.log(userRef)
//     userRef.onSnapshot(snapShot => {
//       setCurrentUser ({
//         id: snapShot.id,
//         ...snapShot.data()
//       })
//   })
//   }
//   else{
//     setCurrentUser(userAuth);
//   }
// });

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    signInFailure(error);
  }
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* SignOutStart() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, SignOutStart);
}

export function* SignUpStart({
  payload: { displayName, email, password, phoneNumber },
}) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const userRef = yield call(createuserProfileDocument, user, {
      displayName,
      phoneNumber,
    });
    const snapshot = yield userRef.get();
    yield put(signUpSuccess({ id: snapshot.id, ...snapshot.data() }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}
// try {
//   const { user } = await auth.createUserWithEmailAndPassword(
//     email,
//     password
//   );
//   await createuserProfileDocument(user, { displayName, phoneNumber });
//   this.setState({
//     displayName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phoneNumber: ""
// //   });

// } catch (erorr) {
//   console.log();

// }

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, SignUpStart);
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* userSagas() {
  yield all(
    [
      call(onGoogleSignInStart),
      call(onEmailSignInStart),
      call(onCheckUserSession),
      call(onSignOutStart),
      call(onSignUpStart),
      call(signInAfterSignUp)
    ],
    
  );
}
