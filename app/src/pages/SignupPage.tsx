import React, { FunctionComponent, MouseEvent, useState } from "react";
import { Button } from "@material-ui/core";
import { ChangeEvent } from "react";
import TextInputForm from "../components/Forms/TextInputForm";
import { useAppDispatch } from "../app/hooks";
import { signupUserAsync } from "../redux/userSlice";

interface SignupPageProps { };

const SignupPage: FunctionComponent<SignupPageProps> = () => {

    const dispatch = useAppDispatch();

    const initialUserSignupData: IUserSignupCredentials = {
        email: "",
        username: "",
        password: "",
    };

    const [userSignupData, setUserSignupData] = useState<IUserSignupCredentials>(initialUserSignupData);

    const handleUserDataChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUserSignupData({
            ...userSignupData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignupClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (userSignupData.email && userSignupData.password && userSignupData.username) {
            dispatch(signupUserAsync(userSignupData));
        }
    };

    const signupFormFields: ITextFieldDef[] = [
        {
            name: "email",
            label: "email",
            value: userSignupData.email,
            onInputChange: handleUserDataChange
        },
        {
            name: "username",
            label: "Username",
            value: userSignupData.username,
            onInputChange: handleUserDataChange
        }, {
            name: "password",
            label: "Password",
            value: userSignupData.password,
            onInputChange: handleUserDataChange,
            type: "password"
        }
    ];

    return (
        <div>
            <h5>Sign up</h5>
            <TextInputForm fields={signupFormFields} />
            <div className="mt-3">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSignupClick} >
                    sign up
                </Button>
            </div>
        </div>
    );
};

export default SignupPage;
