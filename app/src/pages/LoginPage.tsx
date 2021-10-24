import { Button } from "@material-ui/core";
import React, { ChangeEvent, FunctionComponent, MouseEvent, useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import TextInputForm from "../components/Forms/TextInputForm";
import { openSnackbarError, openSnackbarSuccess } from "../redux/alertSlice";
import { loginUserAsync } from "../redux/userLoginSlice";

interface LoginPageProps { };

const LoginPage: FunctionComponent<LoginPageProps> = () => {

    const dispatch = useDispatch();

    const user = useAppSelector((state) => state.loginUser);

    const initialUserLoginData: IUserLoginCredentials = {
        username: "",
        password: "",
    };

    const [userLoginData, setUserLoginData] = useState<IUserLoginCredentials>(initialUserLoginData);

    const history = useHistory();

    useEffect(() => {
        if (user.loggedIn) {
            dispatch(openSnackbarSuccess(`Succesfully logged ${user.user?.username} in`));
            history.push("/greensweater");
        }
        else if (user.status === "failed") {
            dispatch(openSnackbarError("Login failed"));
        }
    }, [user.loggedIn, user.status, dispatch, history, user.user?.username]);


    const handleSignupClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        history.push("/signup");
    };

    const handleUserDataChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUserLoginData({
            ...userLoginData,
            [e.target.name]: e.target.value
        });
    };

    const handleLoginClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (userLoginData.username && userLoginData.password) {
            dispatch(loginUserAsync(userLoginData));
        }
    };


    const loginFormFields: ITextFieldDef[] = [
        {
            name: "username",
            label: "Username",
            value: userLoginData.username,
            onInputChange: handleUserDataChange
        }, {
            name: "password",
            label: "Password",
            value: userLoginData.password,
            onInputChange: handleUserDataChange,
            type: "password"
        }
    ];

    return (
        <div>
            <h5>Log in</h5>

            <TextInputForm fields={loginFormFields} />
            <div className="mt-3">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLoginClick} >
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

export default LoginPage;
