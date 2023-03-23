import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'
import { getCompany } from '../../store/company';
import TestComp from '../TestComp';

export default function Dashboard(){
    const history = useHistory()
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()

    useEffect(()=>{
        if(user === null){
            return history.push("/")
        }
        if(user){
            dispatch(getCompany())
        }
    },[user])


    const UserData = [
        {
          id: 1,
          year: 2016,
          userGain: 80000,
          userLost: 823,
        },
        {
          id: 2,
          year: 2017,
          userGain: 45677,
          userLost: 345,
        },
        {
          id: 3,
          year: 2018,
          userGain: 78888,
          userLost: 555,
        },
        {
          id: 4,
          year: 2019,
          userGain: 90000,
          userLost: 4555,
        },
        {
          id: 5,
          year: 2020,
          userGain: 4300,
          userLost: 234,
        },
    ];

    const chartData = {
        labels: UserData.map(el=>el.year),
        datasets: [{
            label: "Test Data",
            data: UserData.map(el=>el.userGain),
            backgroundColor: ["#2e4f4f"]
        }]
    }
    const chartData2 = {
        labels: UserData.map(el=>el.year),
        datasets: [{
            label: "Test Data",
            data: UserData.map(el=>el.userGain*Math.random()),
            backgroundColor: ["#0e8388"]
        }]
    }

    if(!user) return null

    return(
        <section id="dashboard-section">
            <h1>{`Welcome ${user.firstName} ${user.lastName}`}</h1>
            <div id="stats-grid">
            <div className='test-chart'>
                <p>Test data1</p>
                <TestComp chartData={chartData}/>
            </div>
            <div className='test-chart'>
                <p>Test data2</p>
                <TestComp chartData={chartData2}/>
            </div>
            <div className='test-chart'>
                <p>Test data2</p>
                <TestComp chartData={chartData2}/>
            </div>
            <div className='test-chart'>
                <p>Test data1</p>
                <TestComp chartData={chartData}/>
            </div>
            <div className='test-chart'>
                <p>Test data2</p>
                <TestComp chartData={chartData2}/>
            </div>
            <div className='test-chart'>
                <p>Test data1</p>
                <TestComp chartData={chartData}/>
            </div>
            </div>
            <h1>hihihi</h1>
        </section>
    )
}
