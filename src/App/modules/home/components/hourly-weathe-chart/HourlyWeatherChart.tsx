import { ChartSeries } from "App/shared/interfaces/weather.interface";
import { ApexOptions } from "apexcharts";
import React from "react"
import Chart from 'react-apexcharts'
import "./HourlyWeatherChart.scss"
import Skeleton from '@mui/material/Skeleton';
import { WidgetContainer } from "../../../../shared/components/widget-container/WidgetContainer";
import { WeatherIcons } from "../../../../shared/constants/icons";

const options: ApexOptions = {
    chart: {
        type: "line",
        width: "100%",
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false,
        }
    },
    fill: {
        type: "gradient",
        gradient: {
            type: 'vertical',
            shadeIntensity: 1,
            opacityFrom: 1,
            opacityTo: 1,
            colorStops: [
                {
                    offset: 0,
                    color: "#fc440b",
                    opacity: 1
                },
                {
                    offset: 50,
                    color: "#ffce63",
                    opacity: 1
                },
                {
                    offset: 90,
                    color: "#0a95f9",
                    opacity: 1
                }
            ]
        }
    },
    stroke: {
        curve: 'smooth',
    },
    dataLabels: {
        enabled: false,
    },
    markers: {
        hover: {
            sizeOffset: 4,
        },
    },
    tooltip: {
        marker: {
            show: false,
        },
        custom: ({ series, seriesIndex, dataPointIndex, w }) => {
            const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
            return `
            <div class="tooltip_custom">
                <img className="icon" src="${WeatherIcons[data.icon]}" alt="icon" />
                <div class="temp">${data.y}°</div>
            </div>`;

        }
    },
    yaxis: {
        labels: {
            formatter: (value) => {
                return `${value}°`;
            }
        },
    },
    xaxis: {
        tooltip: {
            enabled: false
        },
        labels: {
            formatter: (value) => {
                return `${new Date(value).toLocaleTimeString("en-US", {
                    hour: '2-digit'
                })}`;
            }
        },
    },
};

export const HourlyWeatherChart = (props: { data: ChartSeries[] }) => {

    const series = [
        {
            data: props.data,
        },
    ];

    return (
        props.data?.length ? (
            <WidgetContainer icon="schedule" title="Hourly forecast">
                <Chart options={options} series={series} height={320}/>
            </WidgetContainer>
        ) : (
            <Skeleton variant="rectangular" width={700} height={320} />
        )
    )
}