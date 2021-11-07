import  UserActionTypes  from "./user.types"

const INTIAL_STATE = {
    currentUser:null,
    error:null,
}

const userReducer =(state = INTIAL_STATE, action)=>{
       switch(action.type){
        case  UserActionTypes.SET_CURRENT_USER:
            return{
                ...state,
                currentUser:action.payload
                
             }
           case  UserActionTypes.SIGN_IN_SUCCESS:
            case UserActionTypes.SIGN_UP_START:
                           return{
                   ...state,
                   currentUser:action.payload,
                   error:null
                }
            case UserActionTypes.SIGN_OUT_SUCCESS:
                            return{
                    ...state,
                    currentUser:null,
                    error:null
                }

                
            case UserActionTypes.SIGN_IN_FAILURE:
            case UserActionTypes.SIGN_OUT_FAILURE:
            case UserActionTypes.SIGN_UP_FAILURE:
                           return{
                    ...state,
                    error:action.payload
                } 
                default:
                    return state
                
            }
        }      
export default userReducer;  






// import { UserActionTypes } from "./user.types"

// const INTIAL_STATE = {
//     currentUser:null
// }

// const userReducer =(state = INTIAL_STATE, action)=>{
//        switch(action.type){
//            case  UserActionTypes.SET_CURRENT_USER:
//                return{
//                    ...state,
//                    currentUser:action.payload
                   
//                 }
                
//                 default:
//                     return state
//                 }
//             }
            
// export default userReducer; 