import React, { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { error, success } from "../_slices/alertSlice";

interface HomeProps { };

const HomePage: FunctionComponent<HomeProps> = () => {

    const alertMessage = useAppSelector((state) => state.alert.message);
    const dispatch = useAppDispatch();

    return (
        <div>
            <h4>Home</h4>
            <button onClick={() => dispatch(success("success"))}>success</button>
            <button onClick={() => dispatch(error("fail"))}>fail</button>
            {alertMessage}
        </div>
    );
};

export default HomePage;
