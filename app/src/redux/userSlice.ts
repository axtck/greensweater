import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import api from "../apis/greensweaterAPI";

interface IUser {
    name: string;
    logedIn: boolean;
}

const initialState: IUser = {
    name: "",
    logedIn: false
};

export const registerUser = createAsyncThunk(
    "user/registerUser",
    (user: IUserSignupCredentials) => {
        api.post("/auth/signup", {
            ...user,
            roles: ["user"]
        })
            .then((res) => {
                return res.data;
            });
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<string>) => {
            state.logedIn = true;
        },
        logoutUser: (state, action: PayloadAction<string>) => {
            state.logedIn = false;
        },
    }
});

export const {
    loginUser,
    logoutUser
} = userSlice.actions;

export default userSlice.reducer;