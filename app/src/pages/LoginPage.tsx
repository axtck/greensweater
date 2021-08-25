import { Button } from "@material-ui/core";
import React, { FunctionComponent, MouseEvent } from "react";
import { useHistory } from "react-router-dom";

interface LoginPageProps { };

const LoginPage: FunctionComponent<LoginPageProps> = () => {

    const history = useHistory();

    const handleSignupClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        history.push("/signup");
    };

    return (
        <div>
            <h5>Sign in</h5>

            <h6>Don't have an account yet?</h6>
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
