"use client";
import axios from "axios";
import React from "react";

const Checking: React.FC = () => {
  const storeResponsesData = async () => {
    try {
      const response = await axios.post("/api/storeResponsesData", {
        // _id: "12345678",
        name: "Subhan",
        email: "subhan@gmail.com",
        prompt: "i am prompt",
        selectedTitle: "i am selected title",
        // article: "I am the article",
        totalTokensUsed: 500,
      });

      if (!response.data.success) {
        throw new Error(`Failed to store data: ${response.data.error}`);
      }
      console.log("Data submitted successfully");
    } catch (error) {
      // console.error("Error storing data:", error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <button onClick={storeResponsesData}>Submit Data</button>
    </div>
  );
};

export default Checking;
