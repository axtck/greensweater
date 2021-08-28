import React, { FunctionComponent } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeSnackbar } from "../../redux/alertSlice";

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

interface CustomSnackbarProps { };

const CustomSnackbar: FunctionComponent<CustomSnackbarProps> = () => {

    const classes = useStyles();
    const dispatch = useAppDispatch();
    const snackbarOpen = useAppSelector((state) => state.alert.open);
    const snackbarSeverity = useAppSelector((state) => state.alert.severity);
    const snackbarMessage = useAppSelector((state) => state.alert.message);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') return;

        dispatch(closeSnackbar());
    };

    return (
        <div className={classes.root}>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CustomSnackbar;
