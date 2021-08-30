import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

// const initialState: IUserState = {
//     user: {
//         username: "",
//         email: "",
//         password: "",
//         accessToken: ""
//     },
//     status: "idle",
//     loggedIn: false,
// };

// const authSlice = createSlice({
//     name: "auth",
//     initialState: initialState,
//     reducers: {
//         setAuth: (state, action: PayloadAction<IUserState>) => {
//             state.status = "idle";
//             state.token = action.payload.token;

//             if (action.payload.token) {
//                 try {
//                     state.user = JSON.parse(atob(action.payload.token.split(".")[1]));
//                 } catch (e) {
//                     state.user = null;
//                 }
//             } else {
//                 state.user = null;
//             }
//         }
//     }
// });

// export const { setAuth } = authSlice.actions;

// export default authSlice.reducer;