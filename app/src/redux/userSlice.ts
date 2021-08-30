import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import api from "../apis/greensweaterAPI";
import { setAuthToken } from '../helpers/authHeader';

export interface IUserState {
    user: {
        username: string;
        email: string;
        password?: string;
        accessToken: string;
    } | null;
    status: "idle" | "loading" | "failed";
    loggedIn: boolean;
}

const initialState: IUserState = {
    user: {
        username: "",
        email: "",
        password: "",
        accessToken: ""
    },
    status: "idle",
    loggedIn: false,
};

export const signinUserAsync = createAsyncThunk(
    "user/signinUser",
    async (user: IUserLoginCredentials) => {
        const response = await api
            .post<IUserLoginResponse>("/auth/signin", user);

        localStorage.setItem("jwtToken", response.data.accessToken);
        setAuthToken(response.data.accessToken);

        return response.data;
    }
);

export const signupUserAsync = createAsyncThunk(
    "user/signupUser",
    async (user: IUserSignupCredentials) => {
        const response = await api.post("/auth/signup", {
            ...user,
            roles: ["user"]
        });

        return response.data;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<string>) => {
            state.loggedIn = true;
        },
        logoutUser: (state, action: PayloadAction<string>) => {
            state.loggedIn = false;
            state.user = null;
            state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signinUserAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signinUserAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.loggedIn = true;
                state.user = action.payload;
            })
            .addCase(signinUserAsync.rejected, (state, action) => {
                state.status = "failed";
                state.loggedIn = false;
                state.user = initialState.user;
            })
            .addCase(signupUserAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signupUserAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.loggedIn = true;
                state.user = action.payload;
            })
            .addCase(signupUserAsync.rejected, (state, action) => {
                state.status = "failed";
                state.loggedIn = false;
            });
    }
});

export const {
    loginUser,
    logoutUser
} = userSlice.actions;

export default userSlice.reducer;

