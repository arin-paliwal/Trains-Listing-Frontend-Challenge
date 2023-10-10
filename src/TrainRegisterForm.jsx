import React, { useState } from "react";
import axios from "axios";
import "./TrainRegisterForm.css";
import { useNavigate } from "react-router-dom";

const TrainRegisterForm = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    ownerName: "",
    rollNo: "",
    ownerEmail: "",
    accessCode: import.meta.env.ACCESS_CODE,
  });

  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(
        "http://20.244.56.144/train/register",
        formData,
        { headers }
      );
      
      localStorage.setItem(
        "registerResponse",
        JSON.stringify(response)
      );
      localStorage.setItem(
        "registerRequest",
        JSON.stringify(formData)
      );

      setResponse(response);
    } catch (error) {
      // Handle error here
      console.error(error);
    }
    navigate("/getAllTrains");
  };


  return (
    <div className="train-register-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="ownerName"
          placeholder="Owner Name"
          value={formData.ownerName}
          onChange={handleChange}
        />

        <input
          type="number"
          name="rollNo"
          placeholder="Roll No."
          value={formData.rollNo}
          onChange={handleChange}
        />

        <input
          type="email"
          name="ownerEmail"
          placeholder="Owner Email"
          value={formData.ownerEmail}
          onChange={handleChange}
        />

        <input
          type="text"
          name="accessCode"
          placeholder="Access Code"
          value={formData.accessCode}
          onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>

      {/* {response && (
        <div className="response">
          <h2>Response:</h2>
          <pre>{JSON.stringify(response.data, null, 2)}</pre>
        </div>
      )} */}
      <a href="/getAllTrains">
        <button>Next</button>
      </a>
    </div>
  );
};

export default TrainRegisterForm;
