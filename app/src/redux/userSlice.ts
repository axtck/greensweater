import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import api from "../apis/greensweaterAPI";
import { setAuthToken } from '../helpers/authHeader';

export interface IUserState {
    user: {
        username: string;
        email: string;
        password?: string;
    };
    status: "idle" | "loading" | "failed";
    logedIn: boolean;
}

const initialState: IUserState = {
    user: {
        username: "",
        email: "",
        password: ""
    },
    status: "idle",
    logedIn: false
};

export const signinUserAsync = createAsyncThunk(
    "user/signinUser",
    async (user: IUserLoginCredentials) => {
        try {
            const response = await api
                .post<IUserLoginResponse>("/auth/signin", user);
            if (response.status === 200) {
                localStorage.setItem("jwtToken", response.data.accessToken);
                // not sure
                setAuthToken(response.data.accessToken);
                // return what you need to action payload from fullfilled
                return response.data;
            } else {
                // reject
                return response.status.toString();
            }
        }
        catch (e) {
            console.log(e);
            // reject
            return e.response;
        }
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
            state.logedIn = true;
        },
        logoutUser: (state, action: PayloadAction<string>) => {
            state.logedIn = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signinUserAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signinUserAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.logedIn = true;
                state.user = action.payload;
            })
            .addCase(signinUserAsync.rejected, (state, action) => {
                state.status = "failed";
                state.logedIn = false;
                state.user = initialState.user;
            })
            .addCase(signupUserAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signupUserAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.logedIn = true;
                state.user = action.payload;
            })
            .addCase(signupUserAsync.rejected, (state, action) => {
                state.status = "failed";
                state.logedIn = false;
            });;
    }
});

export const {
    loginUser,
    logoutUser
} = userSlice.actions;

export default userSlice.reducer;

