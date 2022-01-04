import { AuthState } from "../interfaces/interfaces";

type AuthAction =
   | { type: "logout", payload: false }
   | { type: "login", payload: true };

export const AuthReducer = (state:AuthState, action:AuthAction): AuthState => {

   switch (action.type) {
      case "login":
         return {
            ...state,
            auth: action.payload
         }

      case "logout":
         return {
            ...state,
            auth: action.payload
         }
   
      default:
         return state;
   }
}