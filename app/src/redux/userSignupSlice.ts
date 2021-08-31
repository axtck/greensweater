import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import api from "../apis/greensweaterAPI";

export interface IUserSignupState {
    user: {
        username: string;
        accessToken: string;
    } | null;
    status: "idle" | "loading" | "failed";
    done: boolean;
}

const initialState: IUserSignupState = {
    user: null,
    status: "idle",
    done: false,
};

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

export const userSignupSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearState: (state) => {
            state.user = null;
            state.status = "idle";
            state.done = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUserAsync.pending, (state) => {
                state.user = null;
                state.status = "loading";
                state.done = false;
            })
            .addCase(signupUserAsync.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = "idle";
                state.done = true;
            })
            .addCase(signupUserAsync.rejected, (state, action) => {
                state.user = null;
                state.status = "failed";
                state.done = false;
            });
    }
});

export const {
    clearState: resetState,
} = userSignupSlice.actions;

export default userSignupSlice.reducer;

