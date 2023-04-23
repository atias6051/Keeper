import React, { useEffect, useState } from 'react';
import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJs} from 'chart.js/auto'
import { useSelector } from 'react-redux';
import './index.css'


export default function CitiesChart({chartData}){
    // citiesStats = useSelector(state=>state.company.company.stats)
    return <Doughnut height='20px'data={chartData}/>
}
