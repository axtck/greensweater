import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface IUser {
    name: string;
    logedIn: boolean;
}

const initialState: IUser = {
    name: "",
    logedIn: false
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<string>) => {
            state.logedIn = true;
        },
        logoutUser: (state, action: PayloadAction<string>) => {
            state.logedIn = false;
        }
    }
});

export const {
    loginUser
} = userSlice.actions;

export default userSlice.reducer;