import  UserActionTypes  from "./user.types";

// export const setCurrentUser = (user) => ({
//   type: UserActionTypes.SET_CURRENT_USER,
//   payload: user,
// });
 

export const googleSignInStart =()=>({
  type: UserActionTypes.GOOGLE_SIGN_IN_START
})

export const signInSuccess=(user)=>({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload:user
})

export const signInFailure=(error)=>({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload:error
})

export const emailSignInStart=(emailAndPassword)=>({
  type:UserActionTypes.EMAIL_SIGN_IN_START,
  payload:emailAndPassword
})

export const checkUserSession =() =>({
  type: UserActionTypes.CHECK_USER_SESSION
})

export const signOutStart = (signOut)=>({
  type: UserActionTypes.SIGN_OUT_START,
  payload: signOut
})

export const signOutSuccess = ()=>({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
  
})

export const signOutFailure =(error)=>({
type: UserActionTypes.SIGN_IN_FAILURE,
payload: error
})

export const signUpStart=(signUpProps)=>({
  type:UserActionTypes.SIGN_UP_START,
  payload: signUpProps
})

export const signUpSuccess=({user, ...additionalData})=>({
  type: UserActionTypes.SIGN_UP_SUCCESS,
 payload:{user, ...additionalData}
})

export const signUpFailure=(error)=>({
  type:UserActionTypes.SIGN_UP_FAILURE,
  payload:error
})

// import  UserActionTypes  from "./user.types";

// export const setCurrentUser = (user) => ({
//   type: UserActionTypes.SET_CURRENT_USER,
//   payload: user,
// });
 

// export const googleSignInStart =()=>({
//   type: UserActionTypes.GOOGLE_SIGN_IN_START
// })

// export const googleSignInSuccess=(user)=>({
//   type: UserActionTypes.GOOGLE_SIGN_IN_SUCCESS,
//   payload:user
// })

// export const googleSignInFailure=(error)=>({
//   type: UserActionTypes.GOOGLE_SIGN_IN_FAILURE,
//   payload:error
// })

// export const emailSignInStart=(emailAndPassword)=>({
//   type:UserActionTypes.EMAIL_SIGN_IN_START,
//   payload:emailAndPassword
// })

// export const emailSignInSuccess=(user)=>({
//   type: UserActionTypes.EMAIL_SIGN_IN_SUCCESS,
//   payload:user
// })

// export const emailSignInFailure=(error)=>({
//   type:UserActionTypes.EMAIL_SIGN_IN_FAILURE,
//   payload:error
// })