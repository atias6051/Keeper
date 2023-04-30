import React, { useEffect, useState } from 'react';
import {Line} from "react-chartjs-2";
import './index.css'

export default function AnualSalesChart({stats}){
    const months = ['January', 'February', 'March', 'April','May', 'June', 'July', 'August','September', 'October', 'November', 'December']
    const [chartData,setChartData] = useState(null)

    useEffect(()=>{
        const newData = {
            labels: Object.keys(stats).map(el=> months[el-1]),
            datasets:[
                {
                label: "Estimates",
                data: Object.values(stats).map(el=>el.totalEstimates),
                backgroundColor: '#FF6384',
                hoverBackgroundColor: '#9966FF'
                // borderWidth: 12,
                },
                {
                label: "Sales",
                data: Object.values(stats).map(el=>el.totalSales),
                backgroundColor: '#9966FF',
                hoverBackgroundColor: '#36A2EB'
                // borderWidth: 12,
                },
            ],
        }
        setChartData(()=>newData)
    },[stats])
    if(!chartData) return null
    return (
        <div className='cities-stats-card sales-2fr-card'>
            <h5>Anual sales/estaimtes</h5>
            <Line data={chartData}/>
        </div>
    )
}
