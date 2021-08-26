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

interface IReduxAction {
    type: string;
    payload?: string;
}