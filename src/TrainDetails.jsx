import { useEffect, useState } from "react";
import { useMyContext } from "./context/ContextProvider";

const TrainDetails = () => {
  const [specificTrainData,setSpecificTrainData ] = useState();
  const access=localStorage.getItem("access")
  const trainNumber = localStorage.getItem("TrainNumber");
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    fetch(`http://20.244.56.144:80/train/trains/${trainNumber}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setSpecificTrainData(data);
          console.log(specificTrainData);
        })
        .catch((error) => {
          console.log("Error", error);
        });
  },[])
   useEffect(() => {
     setTimeout(() => {
       setLoading(false);
     }, 1500);
   }, []);
  useEffect(() => {
    console.log(specificTrainData);
    localStorage.removeItem("access")
  }, [specificTrainData]);

  return (
    <div className="p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Train Details</h2>
      {loading ? (
        <div className="flex h-screen justify-center items-center">
          <h1 className="text-3xl">Loading...</h1>
        </div>
      ) : (
        <>
          <div className="bg-white">
            <div className="mb-4">
              <h3 className="text-xl font-semibold">
                Train Name: {specificTrainData.trainName}
              </h3>
              <p className="text-gray-600">
                Train Number: {specificTrainData.trainNumber}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold">Departure Time:</h3>
              <p>
                {specificTrainData.departureTime.Hours}:
                {specificTrainData.departureTime.Minutes}:
                {specificTrainData.departureTime.Seconds}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold">Available Seats:</h3>
              <p>Sleeper: {specificTrainData.seatsAvailable.sleeper}</p>
              <p>AC: {specificTrainData.seatsAvailable.AC}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold">Price:</h3>
              <p>Sleeper Price: {specificTrainData.price.sleeper}</p>
              <p>AC Price: {specificTrainData.price.AC}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Delayed By:</h3>
              <p>{specificTrainData.delayedBy} minutes</p>
            </div>
          </div>
        
        </>
      )}
    </div>
  );
};

export default TrainDetails;
