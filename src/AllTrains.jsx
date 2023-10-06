import React, { useEffect, useState } from "react";

const AllTrains = () => {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [access, setAccess] = useState(""); // Moved setAccess outside of the fetch block
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
        setAccess(data.access_token); // Moved setAccess here after data is received
        setResponseData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []); // Removed the if statement and fetch block from here

  useEffect(() => {
    // Moved the fetch block here
    if (access) {
      fetch("http://20.244.56.144:80/train/trains", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setResponseData(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [access]);

  return (
    <div>
      <h1>AllTrains</h1>
      {loading ? (
        <div>Loading...</div>
      ) : responseData ? (
        <div>
          <h2>Server Response</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
          <h1>{responseData.access_token}</h1>
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default AllTrains;
