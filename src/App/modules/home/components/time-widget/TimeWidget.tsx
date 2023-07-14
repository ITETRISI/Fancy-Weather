import React, { useState } from "react";
import "./TimeWidget.scss"

export const TimeWidget = (props: {timezone: string}) => {
    const [currentDate, setCurrentDate] = useState(new Date())
    setInterval(() => { setCurrentDate(new Date()) }, 30000)

    const timeInfo = currentDate.toLocaleTimeString("en-US", {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: props?.timezone || undefined
    })
    const dateInfo = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: props?.timezone || undefined
    })

    return (
        <div className="time-widget">
            <span className="time">{timeInfo}</span>
            <span className="date-info">{dateInfo}</span>
        </div>
    );
}