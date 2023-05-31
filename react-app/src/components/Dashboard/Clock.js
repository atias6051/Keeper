import React, { useState, useEffect } from "react";

function Clock() {
//   const [time, setTime] = useState(new Date());
  const [time, setTime] = useState("")
  const [ampm, setAmpm] = useState("")
  const [date,setDate] = useState(new Date().toLocaleDateString('en-US'))

  useEffect(() => {
    const intervalID = setInterval(() => {
    //   setTime(new Date());
        let newTime = new Date()
        let hours = newTime.getHours();
        let minutes = newTime.getMinutes();
        let seconds = newTime.getSeconds();
        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        setTime(()=>`${hours}:${minutes}:${seconds}`)
        setAmpm(()=>ampm)

    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return `${hours}:${minutes}:${seconds} ${ampm}`;
  };

  return (
    <div style={{display: "flex",gap: "5px"}}>
      <p>{date}</p>
      <p>{time}</p>
      <p>{ampm}</p>
    </div>
  )
}

export default Clock
