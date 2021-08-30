import { combineReducers } from "redux";
import alertReducer from "./alertSlice";
// import authReducer from "./authSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
    alert: alertReducer,
    user: userReducer,
    // auth: authReducer
});

export default rootReducer;