import React, { FunctionComponent, ChangeEvent, useState } from "react";
import TextInputForm from "../components/Forms/TextInputForm";

interface SignupFormProps { };

const SignupForm: FunctionComponent<SignupFormProps> = () => {

    const initialUserData = {
        email: "",
        userName: "",
        password: ""
    };
    const [userData, setUserData] = useState(initialUserData);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const signupFormFields: ITextFieldDef[] = [
        {
            name: "email",
            label: "email",
            value: userData.email,
            onInputChange: handleInputChange
        },
        {
            name: "userName",
            label: "Username",
            value: userData.userName,
            onInputChange: handleInputChange
        }, {
            name: "password",
            label: "Password",
            value: userData.password,
            onInputChange: handleInputChange,
            type: "password"
        }
    ];

    return (
        <div>
            <TextInputForm fields={signupFormFields} />

        </div>
    );
};

export default SignupForm;
