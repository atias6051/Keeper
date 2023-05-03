import { useEffect, useState } from "react"

function SalesRatioCard({stats}){

    const [filtered,setFiltered] = useState([])

    useEffect(()=>{
        setFiltered(()=> stats.sort((a,b)=> b.closeRate-a.closeRate).slice(0,4))
    },[stats])

    return (
        <div id="sales-ratio-card" className="cities-stats-card">
            <h5>Sales Close Rate</h5>
            <ul>
                {filtered.map((el,i)=>(
                    <>
                    <li key={i} className="single-state-bar">{`${el.firstName} ${el.lastName[0].toUpperCase()} - ${el.closeRate}%`}</li>
                    <p>{`Sale/Estimate - ${el.numSales}/${el.numEstimates}`}</p>
                    </>
                ))}
            </ul>
        </div>
    )
}

export default SalesRatioCard
