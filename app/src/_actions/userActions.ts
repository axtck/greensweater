import { Constants } from "../constants";
import { userService } from "../services/userService";
import { Dispatch } from "redux";

const signup = (user: IUserLoginCredentials) => {
    const request = (user: IUserLoginCredentials): RAction => {
        return {
            type: Constants.userConstants.SIGNUP_REQUEST,
            payload: user
        };
    };

    const success = (user: IUserLoginCredentials): RAction => {
        return {
            type: Constants.userConstants.SIGNUP_SUCCESS,
            payload: user
        };
    };

    const failure = (error: string): RAction => {
        return {
            type: Constants.userConstants.SIGNUP_FAILURE,
            payload: error
        };
    };
    return (dispatch: Dispatch) => {
        dispatch(request(user));

        userService.signup(user)
            .then((res) => console.log(res));
    };
};

const login = (user: IUserLoginCredentials, from: string) => {
    const request = (user: IUserLoginCredentials): RAction => {
        return {
            type: Constants.userConstants.LOGIN_REQUEST,
            payload: user
        };
    };

    const success = (user: IUserLoginCredentials): RAction => {
        return {
            type: Constants.userConstants.LOGIN_SUCCESS,
            payload: user
        };
    };

    const failure = (error: string): RAction => {
        return {
            type: Constants.userConstants.LOGIN_FAILURE,
            payload: error
        };
    };

    return (dispatch: Dispatch) => {
        dispatch(request(user));
        userService.login(user)
            .then((res) => {
                console.log(res);
            });
    };
};

const logout = (): RAction => {
    userService.logout();
    return {
        type: Constants.userConstants.LOGOUT
    };
};

export const userActions = {
    signup,
    login,
    logout
};