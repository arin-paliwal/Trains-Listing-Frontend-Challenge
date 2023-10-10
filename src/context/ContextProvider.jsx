import { createContext, useContext, useState } from "react";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [specificTrainData, setSpecificTrainData] = useState([]);

  return (
    <MyContext.Provider value={{ specificTrainData, setSpecificTrainData }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
