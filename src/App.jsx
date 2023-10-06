import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TrainRegisterForm from "./TrainRegisterForm";

function App() {
  // const [trains, setTrains] = useState([]);

  // useEffect(() => {
  //   fetchTrainData();
  // }, []);

  // const fetchTrainData = async () => {
  //   try {
  //     const response = await axios.get("http://20.244.56.144:80/train/trains");
  //     if (Array.isArray(response.data)) {
  //       setTrains(response.data);
  //     } else {
  //       console.error("Data is not an array:", response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  return (
    <BrowserRouter>
      {/* <ul>
        {Array.isArray(trains) &&
          trains.map((train) => <li key={train.id}>{train.name}</li>)}
      </ul> */}
      <Routes>
        <Route path="/" element={<TrainRegisterForm/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
