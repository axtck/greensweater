import React, { FunctionComponent } from "react";
import SignupForm from "../containers/SignupForm";

interface SignupPageProps { };

const SignupPage: FunctionComponent<SignupPageProps> = () => {

    return (
        <div>
            <h5>Sign up</h5>
            <SignupForm />
        </div>
    );
};

export default SignupPage;
