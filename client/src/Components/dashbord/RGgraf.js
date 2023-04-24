import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import useAxiosGet from "../../Hooks/useGet"
// import {GetGrafOfFiles} from '../../Hooks/dashboard'
import { SelectButton } from 'primereact/selectbutton';
function RGgraf() {
    const [chartDataY, setChartDataY] = useState({});
    const [chartOptionsY, setChartOptionsY] = useState({});
    const [chartDataM, setChartDataM] = useState({});
    const [chartOptionsM, setChartOptionsM] = useState({});
    const { data: dy, loading: ly, error: et, refetch: ry } = useAxiosGet("dashboard/RGFilesByYear", 2);
    const { data: dm, loading: lm, error: em, refetch: rm } = useAxiosGet("dashboard/RGFilesByMonth", 2);
    const options = ['לפי שנים', 'לפי חודשים'];
    const [value, setValue] = useState(options[0]);
    useEffect(() => {
        const years = [];
        const reds = [];
        const greens = [];
        if (dy) {
            console.log((dy));
            console.log("not loading");
            dy.forEach(element => {
                years.push(element.year)
            });

            console.log(years);


            dy.forEach(element => {
                reds.push(element.red)
            });


            dy.forEach(element => {
                greens.push(element.green)
            });
        }
        else {
            console.log("loading");
        }
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const data1 = {
            labels: years,
            datasets: [
                {
                    label: 'red',
                    data: reds,
                    fill: false,
                    backgroundColor: '#2f4860',
                    borderColor: '#2f4860',
                    tension: 0.4
                },
                {
                    label: 'green',
                    data: greens,
                    fill: false,
                    backgroundColor: '#00bb7e',
                    borderColor: '#00bb7e',
                    tension: 0.4
                }
            ]
        };


        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartDataY(data1);
        setChartOptionsY(options);
    }, [dy]);



    useEffect(() => {
        const months = [];
        const reds = [];
        const greens = [];
        if (dm) {
            console.log((dm));
            console.log("not loading");
            dm.forEach(element => {
                months.push(element.month)
            });

            console.log(months);


            dm.forEach(element => {
                reds.push(element.red)
            });


            dm.forEach(element => {
                greens.push(element.green)
            });
        }
        else {
            console.log("loading");
        }
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const data1 = {
            labels: months,
            datasets: [
                {
                    label: 'red',
                    data: reds,
                    fill: false,
                    backgroundColor: '#2f4860',
                    borderColor: '#2f4860',
                    tension: 0.4
                },
                {
                    label: 'green',
                    data: greens,
                    fill: false,
                    backgroundColor: '#00bb7e',
                    borderColor: '#00bb7e',
                    tension: 0.4
                }
            ]
        };


        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartDataM(data1);
        setChartOptionsM(options);
    }, [dm]);
    {/* <Chart  options={lineOptions} /> */ }




    if (value == 'לפי שנים')
        return (<>
        <h3>תוצאות תיקים בשנים האחרונות</h3>
            <div className="card flex justify-content-center" style={{ direction: "ltr" }}>
                <SelectButton value={value} onChange={(e) => setValue(e.value)} options={options} />
            </div>
            <div className="card">
                <Chart type="line" data={chartDataY} options={chartOptionsY} />
            </div>
        </>
        )
    if (value == 'לפי חודשים')
        return (<>
        <h3>תוצאות תיקים בחודשים האחרונים</h3>
            {console.log("by monthhhhhhhhhhhhhhhhhhhhhhhhh")}
            <div className="card flex justify-content-center" style={{ direction: "ltr" }}>
                <SelectButton value={value} onChange={(e) => setValue(e.value)} options={options} />
            </div>
            <div className="card">
                <Chart type="line" data={chartDataM} options={chartOptionsM} />
            </div>
        </>
        )

}
export default RGgraf;