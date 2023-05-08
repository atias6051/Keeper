import React, { useEffect, useState } from 'react';
import {Doughnut} from "react-chartjs-2";
import './index.css'


export default function CitiesChart({stats}){

    const [filtered,setFiltered] = useState([])
    const [chartData,setChartData] = useState(null)

    useEffect(()=>{
        setFiltered(()=>Object.entries(stats).sort((a,b)=>b[1]-a[1]).slice(0,6))
    },[stats])
    useEffect(()=>{
        const newData = {
            labels: filtered.map(el=>el[0]),
            datasets:[{
                data: filtered.map(el=>el[1]),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40', '#9966FF'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40', '#9966FF']
                // borderWidth: 12,
            }],
        }
        setChartData(()=>newData)
    },[filtered])


    if(!chartData) return null

    return (
        <div className='cities-stats-card'>
            <h5>Customer City Distribution</h5>
            <Doughnut data={chartData}/>
        </div>
    )
}
