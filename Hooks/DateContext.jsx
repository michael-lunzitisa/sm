import React, { createContext, useContext, useState } from "react";

const DateContext = createContext();

export const DateProvider = ({ children }) => {
    const [arrivalDate, setArrivalDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const updateArrivalDate = (date) => {
        setArrivalDate(date);
    };

    const updateEndDate = (date) => {
        setEndDate(date);
    };

    return (
        <DateContext.Provider
            value={{ arrivalDate, endDate, updateArrivalDate, updateEndDate }}
        >
            {children}
        </DateContext.Provider>
    );
};

export const useDateContext = () => {
    return useContext(DateContext);
};
