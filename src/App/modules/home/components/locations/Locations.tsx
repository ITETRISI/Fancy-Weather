import { List, ListItemButton, ListItemText, Paper } from "@mui/material";
import { LocationInfo } from "App/shared/interfaces/location.interface";
import React, { useState } from "react";
import "./Locations.scss";

type SelectLocation = (arg: LocationInfo) => void;

export const Locations = (props: { value: SelectLocation; locations: LocationInfo[] }) => {
    const [selectedIndex, setSelectedIndex] = useState<number>();

    const handleListItemClick = (val: LocationInfo, index: number) => {
        props.value(val);
        setSelectedIndex(index);
    };


    return (
        <Paper>
            <List
                sx={{
                    width: 360,
                    bgcolor: "background.paper",
                    position: "relative",
                    overflow: "auto",
                    maxHeight: 300,
                    "& ul": { padding: 0 }
                }}
                component="nav"
                aria-label="main mailbox folders"
            >
                {props.locations.map((location, i) => (
                    <ListItemButton
                        key={i}
                        selected={selectedIndex === i}
                        onClick={() => handleListItemClick(location, i)}
                    >
                        <ListItemText primary={`${location.country} - ${location.adminArea}`} />
                    </ListItemButton>
                ))}
            </List>
        </Paper>
    );
}
