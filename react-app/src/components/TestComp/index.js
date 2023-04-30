import React, { useEffect, useState } from 'react';
import {Bar} from "react-chartjs-2";
import {Chart as ChartJs} from 'chart.js/auto'


export default function TestComp({chartData}){

    return <Bar data={chartData} />
}
