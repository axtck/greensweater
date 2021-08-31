import { combineReducers } from "redux";
import alertReducer from "./alertSlice";
import userLoginReducer from "./userLoginSlice";
import userSignupReducer from "./userSignupSlice";

const rootReducer = combineReducers({
    alert: alertReducer,
    loginUser: userLoginReducer,
    signupUser: userSignupReducer
});

export default rootReducer;