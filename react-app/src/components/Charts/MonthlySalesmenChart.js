import {Bar} from "react-chartjs-2";
import {Chart as ChartJs} from 'chart.js/auto'
import { useEffect,useState } from "react";
import './index.css'
export default function MonthlySalesmeChart({stats}){

    const [chartData,setChartData] = useState(null)
    useEffect(()=>{
        const newData = {
            labels: stats.map(el=>`${el.firstName} ${el.lastName}`),
            datasets:[
            // {
            //     data: stats.map(el=>el.numEstimates),
            //     backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40', '#9966FF'],
            //     hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40', '#9966FF']
            //     // borderWidth: 12,
            // },{
            //     data: stats.map(el=>el.numSales),
            //     backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40', '#9966FF'],
            //     hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40', '#9966FF']
            // },
            {
                label: 'Total Estimates',
                data: stats.map(el=>el.totalEstimates),
                backgroundColor: '#17AEBF',
hoverBackgroundColor: '#0077B6'
                // backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40', '#9966FF'],
                // hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40', '#9966FF']
            },{
                label: 'Total Sales',
                data: stats.map(el=>el.totalSales),
                backgroundColor: '#F4A261',
hoverBackgroundColor: '#E76F51'
                // backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40', '#9966FF'],
                // hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40', '#9966FF']
            }],
        }
        setChartData(()=>newData)
    },[stats])

    if(!chartData) return null
    return (
        <div className="salesmen-2fr-card cities-stats-card">
            <h5>Monthly Sales Stats</h5>
            <Bar data={chartData} />
        </div>
    )
}
