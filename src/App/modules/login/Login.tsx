import React, { useState } from "react";
import "./Login.scss";

import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Snackbar, TextField } from "@mui/material";
import { AuthService } from "../../core/services/auth.service";
import { UserCredentials } from "../../shared/interfaces/auth.interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const [isLoading, updateLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const { register, handleSubmit } = useForm<UserCredentials>();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const onSubmit: SubmitHandler<UserCredentials> = data => {
        updateLoading(true);
        AuthService.auth(data).then(() => {
            updateLoading(false);
            navigate("home");
        }).catch((error: Error) => {
            setOpen(true);
            setErrorMessage(error.message)
            updateLoading(false);
        })
    };

    return (
        <div className="login card">
            <div className="card_header">
                <h2 className="title">Login</h2>
            </div>
            <div className="card_content">
                <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        required
                        {...register("user", { required: true })}
                        label="Username"
                        type="text"
                    />
                    <TextField
                        required
                        {...register("password", { required: true })}
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                    />
                </form>

            </div>
            <div className="card_actions center">
                <LoadingButton loading={isLoading} variant="contained" type="submit" form='login-form'>Submit</LoadingButton>
            </div>
            <Snackbar
                key="bottom right"
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                 }}
            >
                <Alert onClose={handleClose} severity="error">{errorMessage}</Alert>
            </Snackbar>
        </div>

    );
}