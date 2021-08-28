import { Color } from "@material-ui/lab/Alert";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAlertState {
    open: boolean;
    severity?: Color;
    message?: string;
}

const initialState: IAlertState = {
    open: false,
};

// create slice
export const alertSlice = createSlice({
    name: "alert",
    initialState,
    // reducer functions
    reducers: {
        openSnackbarSuccess: (state, action: PayloadAction<string>) => {
            state.open = true;
            state.severity = "success";
            state.message = action.payload;
        },
        openSnackbarError: (state, action: PayloadAction<string>) => {
            state.open = true;
            state.severity = "error";
            state.message = action.payload;
        },
        openSnackbarInfo: (state, action: PayloadAction<string>) => {
            state.open = true;
            state.severity = "info";
            state.message = action.payload;
        },
        openSnackbarWarning: (state, action: PayloadAction<string>) => {
            state.open = true;
            state.severity = "warning";
            state.message = action.payload;
        },
        closeSnackbar: (state) => {
            state.open = false;
        }
    }
});

// actions
export const {
    openSnackbarSuccess,
    openSnackbarError,
    openSnackbarInfo,
    openSnackbarWarning,
    closeSnackbar
} = alertSlice.actions;

export default alertSlice.reducer;