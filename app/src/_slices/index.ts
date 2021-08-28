import { combineReducers } from "redux";
import alertReducer from "./alertSlice";

const rootReducer = combineReducers({
    alert: alertReducer
});

export default rootReducer;