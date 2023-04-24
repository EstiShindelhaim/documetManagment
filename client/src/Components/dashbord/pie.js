import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import useAxiosGet from "../../Hooks/useGet"
// import {GetGrafOfFiles} from '../../Hooks/dashboard'
import { SelectButton } from 'primereact/selectbutton';
function Pie() {
    const [chartDataY, setChartDataY] = useState({});
    const [chartOptionsY, setChartOptionsY] = useState({});
    const [chartDataM, setChartDataM] = useState({});
    const [chartOptionsM, setChartOptionsM] = useState({});
    const { data: dy, loading: ly, error: et, refetch: ry } = useAxiosGet("dashboard/filesBy2year", 2);
    const { data: dm, loading: lm, error: em, refetch: rm } = useAxiosGet("dashboard/filesBy2Month", 2);
    const options = ['לפי שנים', 'לפי חודשים'];
    const [value, setValue] = useState(options[0]);


    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        let data = {};
        let options = {};
        let counts = []

        if (dy) {
            counts = [dy.current, dy.last];
            data = {
                labels: ['שנה נוכחית', 'שנה שעברה'],
                datasets: [
                    {
                        data: counts,
                        backgroundColor: [
                            documentStyle.getPropertyValue('--green-500'),
                            documentStyle.getPropertyValue('--yellow-500')
                        ],
                        hoverBackgroundColor: [
                            documentStyle.getPropertyValue('--green-400'),
                            documentStyle.getPropertyValue('--yellow-400')
                        ]
                    }
                ]
            }
            options = {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true
                        }
                    }
                }
            };
        }
        setChartDataY(data);
        setChartOptionsY(options);
    }, [dy]);



    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        let data = {};
        let options = {};
        let counts = []

        if (dm) {
            counts = [dm.current, dm.last];
            data = {
                labels: ['חודש נוכחי', 'חודש שעבר'],
                datasets: [
                    {
                        data: counts,
                        backgroundColor: [
                            documentStyle.getPropertyValue('--green-500'),
                            documentStyle.getPropertyValue('--yellow-500')
                        ],
                        hoverBackgroundColor: [
                            documentStyle.getPropertyValue('--green-400'),
                            documentStyle.getPropertyValue('--yellow-400')
                        ]
                    }
                ]
            }
            options = {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true
                        }
                    }
                }
            };
        }
        setChartDataM(data);
        setChartOptionsM(options);
    }, [dm]);
    {/* <Chart  options={lineOptions} /> */ }




    if (value == 'לפי שנים')
        return (<>
            <h3>תיקים שנפתחו בשנתייים האחרונות</h3>
            <div className="card flex justify-content-center" style={{ direction: "ltr" }}>
                <SelectButton value={value} onChange={(e) => setValue(e.value)} options={options} />
            </div>
            <div className="card flex justify-content-center">
                <Chart type="pie" data={chartDataY} options={chartOptionsY} className="w-full md:w-30rem" />
            </div>
        </>
        )
    if (value == 'לפי חודשים')
        return (<>
            <h3>תיקים שנפתחו בחודשיים האחרונים</h3>
            {console.log("by monthhhhhhhhhhhhhhhhhhhhhhhhh")}
            <div className="card flex justify-content-center" style={{ direction: "ltr" }}>
                <SelectButton value={value} onChange={(e) => setValue(e.value)} options={options} />
            </div>
            {/* 
            <div className="card">
                <Chart type="bar" data={chartDataM} options={chartOptionsM} />
            </div> */}
            <div className="card flex justify-content-center">
                <Chart type="pie" data={chartDataM} options={chartOptionsM} className="w-full md:w-30rem" />
            </div>
        </>

        )

}
export default Pie;