import { createContext, useContext, useState, useEffect } from "react";
import { initialData } from "../data/wine-data";
import { findClasses, calculateGamma } from "../utility/calculation";

// High Order Component for dataSet context

const dataContext = createContext();

export const WineDataContext = ({ children }) => {
  const [dataSet, setDataSet] = useState(calculateGamma(initialData));
  const [classes, setClasses] = useState();

  useEffect(() => {
    setClasses(findClasses(initialData));
  }, [dataSet]);

  return (
    <dataContext.Provider value={{ dataSet, classes }}>
      {children}
    </dataContext.Provider>
  );
};

export const UseWineDataContext = () => useContext(dataContext);
