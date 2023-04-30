import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'
import { getCompany, getStats } from '../../store/company';
import TestComp from '../TestComp';
import { getEstimates } from '../../store/documents';
import CitiesChart from '../Charts/CitiesChart';
import Clock from './Clock';
import SalesRatioCard from './SalesRatioCard';
import MonthlySalesmeChart from '../Charts/MonthlySalesmenChart';
import ServicesChart from '../Charts/ServicesChart';
import PersonalStats from './PersonalStats';
import AnualSalesChart from '../Charts/AnualSalesChart';

export default function Dashboard(){
    const history = useHistory()
    const user = useSelector(state => state.session.user);
    const company = useSelector(state => state.company.company)
    const stats = useSelector(state => state.company.stats)
    const dispatch = useDispatch()
    const [services,setServices] = useState([])
    const [salesmen,setSalesmen] = useState([])
    const [cities,setCities] = useState([])
    const [serviceChartData, setServiceChartData] = useState({})



    useEffect(()=>{
        if(user === null){
            return history.push("/")
        }
        if(user){
            dispatch(getCompany())
            dispatch(getEstimates())
            dispatch(getStats())
        }
    },[user])

    useEffect(()=>{
        if(!stats) return
        const {serviceStats, citiesStats, salesmenStats} = stats
        setCities(()=>citiesStats)
        setSalesmen(()=>salesmenStats)
        setServices(()=>serviceStats)
        console.log("stats--->", stats)
    },[stats])





    if(!user || !stats) return null

    return(
        <section id="dashboard-section">
            <div className='flex-row-space'>
                <h1>{`Welcome ${user.firstName} ${user.lastName}`}</h1>
                <Clock />
            </div>
            <div id="stats-grid">
                <PersonalStats stats={stats.salesmenStats.find(el=>el.id === user.id)} />
                <SalesRatioCard stats={stats.salesmenStats} />
                <CitiesChart stats={stats.citiesStats} />
                <MonthlySalesmeChart stats={stats.salesmenStats} />
                <AnualSalesChart stats={stats.yearSalesStats} />
                <ServicesChart stats={stats.serviceStats} />
            </div>
        </section>
    )
}
