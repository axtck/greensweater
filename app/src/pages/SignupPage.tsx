import { Button } from "@material-ui/core";
import React, { FunctionComponent, MouseEvent, useState } from "react";
import { ChangeEvent } from "react";
import TextInputForm from "../components/Forms/TextInputForm";
import api from "../apis/greensweaterAPI";
import { useHistory } from "react-router-dom";

interface SignupPageProps { };

const SignupPage: FunctionComponent<SignupPageProps> = () => {

    const initialUserData: IUserData = {
        email: "",
        username: "",
        password: "",
        roles: ["user"]
    };

    const [userData, setUserData] = useState<IUserData>(initialUserData);

    const history = useHistory();

    const handleUserDataChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignupClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        console.log(userData);

        api.post("/auth/signup", userData)
            .then(({ data }) => history.push(`/settings/user/${data.user.username}`))
            .catch((err) => console.log(err));
    };

    const signupFormFields: ITextFieldDef[] = [
        {
            name: "email",
            label: "email",
            value: userData.email,
            onInputChange: handleUserDataChange
        },
        {
            name: "username",
            label: "Username",
            value: userData.username,
            onInputChange: handleUserDataChange
        }, {
            name: "password",
            label: "Password",
            value: userData.password,
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
