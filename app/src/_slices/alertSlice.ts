import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAlertState = {
    type: "",
    message: ""
};

// create slice
export const alertSlice = createSlice({
    name: "alert",
    initialState,
    // reducer functions
    reducers: {
        success: (state, action: PayloadAction<string>) => {
            state.type = "alert-success";
            state.message = action.payload;
        },
        error: (state, action: PayloadAction<string>) => {
            state.type = "alert-danger";
            state.message = action.payload;
        },
        clear: (state) => {
            state.type = "";
            state.message = "";
        }
    }
});

// actions
export const { success, error, clear } = alertSlice.actions;

export default alertSlice.reducer;