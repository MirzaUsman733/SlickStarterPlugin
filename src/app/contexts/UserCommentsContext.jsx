"use client"
import React, { createContext, useContext, useEffect, useState } from "react";

const UserCommentsContext = createContext();

export const useUserCommentsContext = () => {
  const context = useContext(UserCommentsContext);
  if (!context) {
    throw new Error(
      "useUserCommentsContext must be used within a UserCommentsContextProvider"
    );
  }
  return context;
};

export const UserCommentsContextProvider = ({ children }) => {
  const [userCommentsData, setUserCommentsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/showCommentsData", {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUserCommentsData(data.userCommentsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <UserCommentsContext.Provider value={{ userCommentsData, setUserCommentsData, loading }}>
      {children}
    </UserCommentsContext.Provider>
  );
};
