import React, { ReactNode } from "react";
import "./WidgetContainer.scss"
import { Paper } from "@mui/material";

export const WidgetContainer = (props: { children: ReactNode, icon: string, title: string, small?: boolean }) => {
    const imageUrl = `./assets/${props.icon}.svg`;
    return (
        <>
            {
                props.small ?
                    (
                        <Paper elevation={3} className="widget-container small">
                            <div className="widget-icon">
                                <span className="icon">
                                    <img src={imageUrl} alt="icon" />
                                </span>
                            </div>
                            <section className="widget-content">
                                <span>{props.title}</span>
                                {props.children}
                            </section>
                        </Paper>
                    ) :
                    <Paper elevation={3} className="widget-container">
                        <div className="widget-icon">
                            <span className="icon">
                                <img src={imageUrl} alt="icon" />
                            </span>
                            {props.title}
                        </div>
                        <section className="widget-content">{props.children}</section>
                    </Paper>
            }
        </>
    );
};