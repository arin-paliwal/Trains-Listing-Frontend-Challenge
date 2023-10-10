import React, { useEffect } from 'react'

const TrainDetails = () => {
    const trainNumber=localStorage.getItem("trainNumber");
    useEffect(()=>{
        fetch(`http://20.244.56.144:80/train/trains/${trainNumber}`,{
            method:"GET",
            headers:{
                Authorization:`Bearer`
            }
        });
    })
  return (
    <div>TrainDetails</div>
  )
}

export default TrainDetails