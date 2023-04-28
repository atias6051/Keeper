import React, { useEffect, useState } from 'react';
import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJs} from 'chart.js/auto'
import { useSelector } from 'react-redux';
import './index.css'


export default function ServicesChart({stats}){
    // citiesStats = useSelector(state=>state.company.company.stats)
    // console.log("stats for cities!->",stats)
    const [filtered,setFiltered] = useState([])
    const [chartData,setChartData] = useState(null)

    useEffect(()=>{
        setFiltered(()=>stats.sort((a,b)=>b.count-a.count).slice(0,6))
    },[stats])

    useEffect(()=>{
        const newData = {
            labels: filtered.map(el=>el.name),
            datasets:[{
                data: filtered.map(el=>el.count),
                backgroundColor: ['#4BC0C0', '#FF9F40', '#9966FF','#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF5166', '#0077B6', '#FFB800', '#009B9E', '#FF8700', '#7248B6']
                // borderWidth: 12,
            }],
        }
        setChartData(()=>newData)
    },[filtered])

    if(!chartData) return null

    return (
        <div className='cities-stats-card'>
            <h5>Most Popular Services</h5>
            <Doughnut data={chartData}/>
        </div>
    )
}
