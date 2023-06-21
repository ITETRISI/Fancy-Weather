import React from "react";
import "./Login.scss";

import { Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserCredentials } from "App/shared/interfaces/auth.interface";
import { AuthService } from "App/core/services/auth.service";



export const Login = () => {

    const { register, handleSubmit } = useForm<UserCredentials>();
    const onSubmit: SubmitHandler<UserCredentials> = data => {
        AuthService.auth(data).then(console.log).catch(console.log)
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
                        {...register("username", { required: true })}
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
                <Button variant="contained" type="submit" form='login-form'>Submit</Button>
            </div>
        </div>
    );
}