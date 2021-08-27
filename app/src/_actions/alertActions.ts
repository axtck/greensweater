import { Constants } from "../constants";

const success = (message: string): IRActionString => {
    return {
        type: Constants.alertConstants.SUCCESS,
        payload: message
    };
};

const error = (message: string): IRActionString => {
    return {
        type: Constants.alertConstants.ERROR,
        payload: message
    };
};

const clear = (): IRActionString => {
    return {
        type: Constants.alertConstants.CLEAR,
    };
};

export const alertActions = {
    success,
    error,
    clear
};