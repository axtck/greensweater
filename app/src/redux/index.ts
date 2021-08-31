import { combineReducers } from "redux";
import alertReducer from "./alertSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
    alert: alertReducer,
    user: userReducer,
});

export default rootReducer;