import React, { useEffect, useState } from "react";

const AllTrains = () => {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
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
      ownerEmail:object1.ownerEmail
    };
    console.log(requestData);

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
          setResponseData(data);
          console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>AllTrains</h1>
      {responseData && (
        <div>
          <h2>Server Response</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AllTrains;
