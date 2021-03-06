export abstract class Constants {
    static readonly pageRoutes: string[] = [
        "greensweater"
    ];

    static readonly highlightStyles = {
        "borderRadius": "5px"
    };

    static readonly userConstants = {
        SIGNUP_REQUEST: 'USERS_SIGNUP_REQUEST',
        SIGNUP_SUCCESS: 'USERS_SIGNUP_SUCCESS',
        SIGNUP_FAILURE: 'USERS_SIGNUP_FAILURE',

        LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
        LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
        LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

        LOGOUT: 'USERS_LOGOUT',

        GETALL_REQUEST: 'USERS_GETALL_REQUEST',
        GETALL_SUCCESS: 'USERS_GETALL_SUCCESS',
        GETALL_FAILURE: 'USERS_GETALL_FAILURE',

        DELETE_REQUEST: 'USERS_DELETE_REQUEST',
        DELETE_SUCCESS: 'USERS_DELETE_SUCCESS',
        DELETE_FAILURE: 'USERS_DELETE_FAILURE'
    };

    static readonly alertConstants = {
        SUCCESS: 'ALERT_SUCCESS',
        ERROR: 'ALERT_ERROR',
        CLEAR: 'ALERT_CLEAR'
    };
}
