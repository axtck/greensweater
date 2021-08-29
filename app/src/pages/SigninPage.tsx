import { Button } from "@material-ui/core";
import React, { ChangeEvent, FunctionComponent, MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import TextInputForm from "../components/Forms/TextInputForm";
import { signinUserAsync } from "../redux/userSlice";

interface SigninPageProps { };

const SigninPage: FunctionComponent<SigninPageProps> = () => {

    const dispatch = useDispatch();

    const initialUserSigninData: IUserLoginCredentials = {
        username: "",
        password: "",
    };

    const [userSigninData, setUserSigninData] = useState<IUserLoginCredentials>(initialUserSigninData);

    const history = useHistory();

    const handleSignupClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        history.push("/signup");
    };

    const handleUserDataChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUserSigninData({
            ...userSigninData,
            [e.target.name]: e.target.value
        });
    };

    const handleSigninClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (userSigninData.username && userSigninData.password) {
            dispatch(signinUserAsync(userSigninData));
        }
    };


    const signinFormFields: ITextFieldDef[] = [
        {
            name: "username",
            label: "Username",
            value: userSigninData.username,
            onInputChange: handleUserDataChange
        }, {
            name: "password",
            label: "Password",
            value: userSigninData.password,
            onInputChange: handleUserDataChange,
            type: "password"
        }
    ];

    return (
        <div>
            <h5>Sign in</h5>

            <TextInputForm fields={signinFormFields} />
            <div className="mt-3">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSigninClick} >
                    sign in
                </Button>
            </div>

            <h6 className="mt-5">Don't have an account yet?</h6>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSignupClick}>
                sign up
            </Button>
        </div>
    );
};

export default SigninPage;
