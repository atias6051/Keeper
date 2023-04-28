import './index.css'
export default function PersonalStats({stats}){
    console.log("statsssss",stats)
    return (
        <div className='cities-stats-card'>
            <h4>Personal Monthly Stats</h4>
            <div className='stats-bars-container'>
                <p className='single-state-bar'>Estimates this month: <strong>{stats.numEstimates}</strong></p>
                <p className='single-state-bar'>Invoices this month: <strong>{stats.numSales}</strong></p>
                <p className='single-state-bar'>Close Rate: <strong>{stats.closeRate}%</strong></p>
                <p className='single-state-bar'>Total Estaimtes: <strong>${(stats.totalEstimates).toFixed(2)}</strong></p>
                <p className='single-state-bar'>Total Sales: <strong>${(stats.totalSales).toFixed(2)}</strong></p>
            </div>
        </div>
    )
}
