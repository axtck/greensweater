interface IRouteLink {
    route: string;
    label: string;
}

interface IActionBtnDef {
    label: string;
    action: string;
}

interface ITextFieldDef {
    name: string;
    label: string;
    value: string;
    type?: string;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface IUserData {
    email: string;
    username: string;
    password: string;
    roles?: Array<string>;
}

interface IUserLoginCredentials {
    username: string;
    password: string;
}

interface IUserSignupCredentials extends IUserLoginCredentials {
    email: string;
}

interface IRActionString {
    type: string;
    payload?: string;
}

interface IRActionUser {
    type: string;
    payload?: IUserLoginCredentials;
}

type RAction = IRActionString | IRActionUser;

interface IAlertState {
    type: string;
    message: string;
}