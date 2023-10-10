import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllTrains = () => {
  const navigate=useNavigate()
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [access, setAccess] = useState("");
  const [trainNumber, setTrainNumber] = useState("")
  const [specificTrainData, setSpecificTrainData] = useState("")
  const object1String = localStorage.getItem("registerRequest");
  const object2String = localStorage.getItem("registerResponse");
  const object1 = JSON.parse(object1String);
  const object2 = JSON.parse(object2String);
  const requestData = {
    companyName: object1.companyName,
    ownerName: object1.ownerName,
    rollNo: object1.rollNo,
    clientID: object2.data.clientID,
    clientSecret: object2.data.clientSecret,
    ownerEmail: object1.ownerEmail,
  };

  useEffect(() => {
    fetch("http://20.244.56.144/train/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("serverResponse", JSON.stringify(data));
        setAccess(data.access_token);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (access) {
      fetch("http://20.244.56.144:80/train/trains", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setResponseData(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [access]);
  useEffect(() => {
    fetch(`http://20.244.56.144:80/train/trains/${trainNumber}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    .then((response)=>response.json())
    .then((data)=>{
      setSpecificTrainData(data)
      console.log(specificTrainData);
    })
    .catch((error)=>{
      console.log("Error",error);
    })
    ;
  },[trainNumber]);


  return (
    <div className="p-6">
      <div className="flex justify-center">
        <h1 className="text-4xl py-12 font-semibold mb-4">
          All Trains shows up here!
        </h1>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : responseData.length ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-100 border-b border-gray-300">
                  Train Name
                </th>
                <th className="px-6 py-3 bg-gray-100 border-b border-gray-300">
                  Train Number
                </th>
                <th className="px-6 py-3 bg-gray-100 border-b border-gray-300">
                  Departure Time
                </th>
                <th className="px-6 py-3 bg-gray-100 border-b border-gray-300">
                  Seats Available (Sleeper)
                </th>
                <th className="px-6 py-3 bg-gray-100 border-b border-gray-300">
                  Seats Available (AC)
                </th>
                <th className="px-6 py-3 bg-gray-100 border-b border-gray-300">
                  Price (Sleeper)
                </th>
                <th className="px-6 py-3 bg-gray-100 border-b border-gray-300">
                  Price (AC)
                </th>
                <th className="px-6 py-3 bg-gray-100 border-b border-gray-300">
                  Delayed By
                </th>
              </tr>
            </thead>
            <tbody>
              {responseData.map((train, index) => (
                <tr
                  key={index}
                  className={`cursor-pointer ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td
                    className="px-6 py-4 border-b border-gray-300"
                    onClick={()=>setTrainNumber(train.trainNumber)}
                  >
                    {train.trainName}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {train.trainNumber}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {train.departureTime.Hours}:{train.departureTime.Minutes}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {train.seatsAvailable.sleeper}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {train.seatsAvailable.AC}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {train.price.sleeper}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {train.price.AC}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-300">
                    {train.delayedBy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default AllTrains;
