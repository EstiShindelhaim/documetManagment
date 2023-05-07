import React, { useState, useEffect, useContext } from 'react';
import { Chart } from 'primereact/chart';
import useAxiosGet from "../../Hooks/useGet"
// import {GetGrafOfFiles} from '../../Hooks/dashboard'
import UserContext from "../User/UserContext"
import { SelectButton } from 'primereact/selectbutton';
function CountGraf() {
    const us=localStorage.getItem("user")
    const user=JSON.parse(us)
    // const user = useContext(UserContext);
    const [chartDataY, setChartDataY] = useState({});
    const [chartOptionsY, setChartOptionsY] = useState({});
    const [chartDataM, setChartDataM] = useState({});
    const [chartOptionsM, setChartOptionsM] = useState({});
    const { data: dy, loading: ly, error: et, refetch: ry } = useAxiosGet("dashboard/filesByYear", user.idmanager);
    const { data: dm, loading: lm, error: em, refetch: rm } = useAxiosGet("dashboard/filesByMonth",user.idmanager);
    const options = ['לפי שנים', 'לפי חודשים'];
    const [value, setValue] = useState(options[0]);
    


    useEffect(() => {
        let data = {};
        let options = {};
        let years = [];
        let counts = [];

        if (dy) {

            dy.forEach(element => {
                years.push(element.year)
            });

            dy.forEach(element => {
                counts.push(element.count)
            });

            data = {
                labels: years,
                datasets: [
                    {
                        label: 'כמות תיקים שנפתחו',
                        data: counts,
                        backgroundColor: [
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 159, 64)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)'
                        ],
                        borderWidth: 1
                    }
                ]
            };
            options = {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            };
        }
        setChartDataY(data);
        setChartOptionsY(options);
    }, [dy]);



    useEffect(() => {
        let data = {};
        let options = {};
        let months = [];
        let counts = [];

        if (dm) {
            console.log("dyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", dm);
            dm.forEach(element => {
                months.push(element.month)
            });
            console.log("yearsssssssssssssssssssssssssssssss", months);
            dm.forEach(element => {
                counts.push(element.count)
            });
            console.log("countssssssssssssssssssssssssssssssssssss", counts);
            data = {
                labels: months,
                datasets: [
                    {
                        label: 'כמות תיקים שנפתחו',
                        data: counts,
                        backgroundColor: [
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 159, 64)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)'
                        ],
                        borderWidth: 1
                    }
                ]
            };
            options = {
                scales: {
                    y: {
                        beginAtZero: true
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
            <h3>תיקים שנפתחו בשנים האחרונות</h3>
            <div className="card flex justify-content-center" style={{ direction: "ltr" }}>
                <SelectButton value={value} onChange={(e) => setValue(e.value)} options={options} />
            </div>
            <div className="card">
                <Chart type="bar" data={chartDataY} options={chartOptionsY} />
            </div>
        </>
        )
    if (value == 'לפי חודשים')
        return (<>
            <h3>תיקים שנפתחו בחודשים האחרונים</h3>
            {console.log("by monthhhhhhhhhhhhhhhhhhhhhhhhh")}
            <div className="card flex justify-content-center" style={{ direction: "ltr" }}>
                <SelectButton value={value} onChange={(e) => setValue(e.value)} options={options} />
            </div>
            <div className="card">
                <Chart type="bar" data={chartDataM} options={chartOptionsM} />
            </div>
        </>
        )

}
export default CountGraf;