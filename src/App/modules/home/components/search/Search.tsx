import { TextField } from "@mui/material";
import React from "react";
import { DebounceInput } from "react-debounce-input";
import "./Search.scss"

type valueFunction = (arg: string) => void;

export const Search = (props: { value: valueFunction }) => {
    const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.value(e.target.value);
    };
    return (
        <DebounceInput
            className="search-field"
            label="Search Country"
            variant="outlined"
            debounceTimeout={500}
            element={TextField}
            onChange={setValue}
        />
    );
};