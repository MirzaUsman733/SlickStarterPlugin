"use client"
import React, { createContext, useContext, useEffect, useState } from "react";

const UserResponsesContext = createContext();

export const useUserResponsesContext = () => {
  const context = useContext(UserResponsesContext);
  if (!context) {
    throw new Error(
      "useUserResponsesContext must be used within a UserResponsesContextProvider"
    );
  }
  return context;
};

export const UserResponsesContextProvider = ({ children }) => {
  const [userResponsesData, setUserResponsesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/showResponseData", {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUserResponsesData(data.userResponseData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <UserResponsesContext.Provider value={{ userResponsesData, setUserResponsesData, loading }}>
      {children}
    </UserResponsesContext.Provider>
  );
};
