import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import api from "../apis/greensweaterAPI";

export interface IUserState {
    user: {
        username: string;
        accessToken: string;
    } | null;
    status: "idle" | "loading" | "failed";
    loggedIn: boolean;
}

const initialState: IUserState = {
    user: null,
    status: "idle",
    loggedIn: false,
};

export const loginUserAsync = createAsyncThunk(
    "user/loginUser",
    async (user: IUserLoginCredentials) => {
        const response = await api
            .post<IUserLoginResponse>("/auth/login", user);

        return response.data;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.loggedIn = false;
            state.user = null;
            state.status = "idle";
        },
        clearState: (state) => {
            state.user = null;
            state.status = "idle";
            state.loggedIn = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUserAsync.pending, (state) => {
                state.status = "loading";
                state.user = null;
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.loggedIn = true;
                state.user = action.payload;
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.status = "failed";
                state.loggedIn = false;
                state.user = null;
            });
    }
});

export const {
    logoutUser,
    clearState
} = userSlice.actions;

export default userSlice.reducer;

