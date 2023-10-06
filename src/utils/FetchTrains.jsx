import React, { useState, useEffect } from "react";
import axios from "axios";

const TrainData = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    fetchTrainData();
  }, []);

  const fetchTrainData = async () => {
    try {
      const response = await axios.get("http://20.244.56.144:80/train/trains");
      setTrains(response.data); // Make sure response.data is an array
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h2>Train Data</h2>
      <ul>
        {trains.map((train) => (
          <li key={train.id}>{train.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TrainData;
