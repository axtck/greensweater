import { Constants } from "../../constants";

const success = (message: string): IReduxAction => {
    return {
        type: Constants.alertConstants.SUCCESS,
        payload: message
    };
};

const error = (message: string): IReduxAction => {
    return {
        type: Constants.alertConstants.ERROR,
        payload: message
    };
};

const clear = (): IReduxAction => {
    return {
        type: Constants.alertConstants.CLEAR,
    };
};

export const alertActions = {
    success,
    error,
    clear
};