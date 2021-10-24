import React, { FunctionComponent, MouseEvent, useState } from "react";
import { Button } from "@material-ui/core";
import { ChangeEvent } from "react";
import TextInputForm from "../components/Forms/TextInputForm";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { signupUserAsync } from "../redux/userSignupSlice";
import { useEffect } from "react";
import { openSnackbarSuccess } from "../redux/alertSlice";
import { useHistory } from "react-router-dom";

interface SignupPageProps { };

const SignupPage: FunctionComponent<SignupPageProps> = () => {

    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.signupUser);

    const initialUserSignupData: IUserSignupCredentials = {
        email: "",
        username: "",
        password: "",
    };

    const [userSignupData, setUserSignupData] = useState<IUserSignupCredentials>(initialUserSignupData);

    const history = useHistory();

    useEffect(() => {
        if (user.done) {
            dispatch(openSnackbarSuccess(`Successfully signed ${user.user?.username} up`));
            history.push("/login");
        }
    }, [dispatch, user.done, history, user.user?.username]);


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
