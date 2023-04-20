import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import useAxiosGet from "../../Hooks/useGet"
// import {GetGrafOfFiles} from '../../Hooks/dashboard'
 
function Graf()
{
const [chartData, setChartData] = useState({});
const [chartOptions, setChartOptions] = useState({});
const {data, loading, error, refetch} = useAxiosGet("dashboard/getRGGrafOfFilesByYear",2);

useEffect(() => {
    const years=[];
    const reds=[]; 
    const greens=[];
    if(data)
    {
        console.log((data));
        console.log("not loading");
        data.forEach(element => {
            years.push(element.year)
        });
  
    console.log(years);

    
    data.forEach(element => {
        reds.push(element.red)
    });
    
   
    data.forEach(element => {
        greens.push(element.green)
    });  
}
else{
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
                label: '0',
                data: reds,
                fill: false,
                backgroundColor: '#2f4860',
                borderColor: '#2f4860',
                tension: 0.4
            },
            {
                label: '1',
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

    setChartData(data1);
    setChartOptions(options);
},[data]);
{/* <Chart  options={lineOptions} /> */}

return(
    <div className="card">
    <Chart type="line" data={chartData} options={chartOptions} />
    </div>
)


}
export default Graf;