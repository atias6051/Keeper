import {useState,useEffect} from "react"
import { useSelector } from "react-redux"
import './index.css'

export default function PersonalStats(){
    const stats = useSelector(state => state.company.stats)

    return (
        <div>

        </div>
    )
}
