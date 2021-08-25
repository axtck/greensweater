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
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}