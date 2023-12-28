"use client";

import React, { useState, useEffect, useRef } from "react";
import { useUser } from "@/app/contexts/userData";
interface ChatGptPromptProps {
  userEmail: string | null | undefined;
  userName: string | null | undefined;
}
import axios from "axios";
const ChatGptPrompt: React.FC<ChatGptPromptProps> = ({
  userEmail,
  userName,
}) => {
  const [totalTokensUsed, setTotalTokensUsed] = useState<number>(0);
  const [tokensUsedPerPrompt, setTokensUsedPerPrompt] = useState<number[]>([]);
  const [response, setResponse] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [originalPrompt, setOriginalPrompt] = useState<string>("");
  const [articleGenerated, setArticleGenerated] = useState<boolean>(false);
  const [outlines, setOutlines] = useState<string[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [responsesData, setResponsesData] = useState<
    { prompt: string; selectedTitle: string; totalUsedToken: number }[]
  >([]);
  const updateTotalTokensUsed = (tokens: number) => {
    setTotalTokensUsed((prevTotalTokensUsed) => prevTotalTokensUsed + tokens);
  };
  const selectedTitleRef = useRef<string>("");
  const totalTokenRef = useRef<number>(0);

  const { userWithEmail } = useUser();
  console.log(userWithEmail);

  useEffect(() => {
    if (totalTokensUsed > 0) {
      console.log(`Total Tokens Used Across All Prompts: ${totalTokensUsed}`);
    }
  }, [totalTokensUsed]);
  if (articleGenerated) {
    totalTokenRef.current = totalTokensUsed;
  }
  const fetchOpenAIResponse = async () => {
    try {
      if (!prompt.trim()) {
        return;
      }

      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      const openaiEndpoint = "https://api.openai.com/v1/chat/completions";

      const { data } = await axios.post(
        openaiEndpoint,
        {
          model: "gpt-4",
          messages: [
            {
              role: "user",
              content: `write the 10 titles that cannot start with the numbers on "${prompt}" the title are fully seo based and the output of any line cannot start with any number`,
            },
          ],
          temperature: 0,
          max_tokens: 7193,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      setResponse(data.choices[0].message.content);
      console.log(data);
      console.log(data.usage.total_tokens);
      const tokensUsedInResponse = data.usage.total_tokens;
      setTokensUsedPerPrompt((prevTokens) => [
        ...prevTokens,
        tokensUsedInResponse,
      ]);
      updateTotalTokensUsed(tokensUsedInResponse);
      console.log(response);
      setOriginalPrompt(prompt);
      setResponsesData((prevData) => [
        ...prevData,
        { prompt, selectedTitle: "", totalUsedToken: 0 },
      ]);
    } catch (error) {
      console.error("Error fetching OpenAI response:", error);
    }
  };

  const upgradeResponse = async () => {
    try {
      if (!originalPrompt.trim()) {
        return;
      }

      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      const openaiEndpoint = "https://api.openai.com/v1/chat/completions";

      const { data } = await axios.post(
        openaiEndpoint,
        {
          model: "gpt-4",
          messages: [
            {
              role: "user",
              content: `write the 10 titles that cannot start with the numbers on "${prompt}" the title are fully seo based and the output of any line cannot start with any number`,
            },
          ],
          temperature: 0,
          max_tokens: 7193,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      setResponse(data.choices[0].message.content);
      const tokensUsedInResponse = data.usage.total_tokens;
      setTokensUsedPerPrompt((prevTokens) => [
        ...prevTokens,
        tokensUsedInResponse,
      ]);
      updateTotalTokensUsed(tokensUsedInResponse);
      console.log(data.usage.total_tokens);
      console.log(response);
      setOriginalPrompt(prompt);
    } catch (error) {
      console.error("Error fetching OpenAI response:", error);
    }
  };

  const generateArticleForTitle = async (selectedTitle: string) => {
    try {
      if (!selectedTitle.trim()) {
        return;
      }

      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      const openaiEndpoint = "https://api.openai.com/v1/chat/completions";

      // Step 1: Get outlines
      const { data: outlinesData } = await axios.post(
        openaiEndpoint,
        {
          model: "gpt-4",
          messages: [
            {
              role: "user",
              content: `write the 10 outline that cannot start with the numbers on:  "${selectedTitle}" only give me outlines not sub outlines`,
            },
          ],
          temperature: 0,
          max_tokens: 7200,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      console.log(outlinesData.choices[0].message.content.split("\n"));
      const outlines = outlinesData.choices[0].message.content.split("\n");
      const tokensUsedInResponse = outlinesData.usage.total_tokens;
      setTokensUsedPerPrompt((prevTokens) => [
        ...prevTokens,
        tokensUsedInResponse,
      ]);
      updateTotalTokensUsed(tokensUsedInResponse);
      console.log(outlinesData.usage.total_tokens);
      setOutlines(outlines);
      selectedTitleRef.current = selectedTitle;
      const updatedData = responsesData.map((dataItem) =>
        dataItem.prompt === originalPrompt
          ? { ...dataItem, selectedTitle: selectedTitle }
          : dataItem
      );
      setResponsesData(updatedData);
      // Step 2: Get content for each outline
      const responses: string[] = [];

      for (const outline of outlines) {
        const { data } = await axios.post(
          openaiEndpoint,
          {
            model: "gpt-4",
            messages: [
              {
                role: "user",
                content: `write the content as an IT Expert and the outline is show on the top in h2 tag and the outline heading cannot be start with number for:  "${outline}" in 300 words that is 15 year old understandable and the must output in the html tags`,
              },
            ],
            temperature: 0,
            max_tokens: 7200,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );

        console.log(data.choices[0].message.content);
        responses.push(data.choices[0].message.content);
        const tokensUsedInResponse = data.usage.total_tokens;
        setTokensUsedPerPrompt((prevTokens) => [
          ...prevTokens,
          tokensUsedInResponse,
        ]);
        updateTotalTokensUsed(tokensUsedInResponse);
        console.log(data.usage.total_tokens);
      }

      setResponse(responses.join("\n"));
      setOriginalPrompt(selectedTitle);
      setArticleGenerated(true);
      const updatedDataAfterGettingAllToken = responsesData.map((dataItem) =>
        dataItem.prompt === originalPrompt
          ? { ...dataItem, totalUsedToken: totalTokenRef.current }
          : dataItem
      );
      setResponsesData(updatedDataAfterGettingAllToken);
    } catch (error) {
      console.error("Error generating article:", error);
    }
  };
  const storeResponsesData = async () => {
    try {
      const response = await fetch("/api/storeResponsesData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: userWithEmail._id,
          name: userName,
          email: userEmail,
          prompt: prompt,
          selectedTitle: selectedTitleRef.current,
          totalTokensUsed: totalTokenRef.current,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to store data: ${response.statusText}`);
      }

      console.log("Data submitted successfully");
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };
  useEffect(() => {
    if (totalTokensUsed > 4200 && articleGenerated) {
      setResponsesData((prevData) => [
        ...prevData,
        {
          prompt: prompt,
          selectedTitle: selectedTitleRef.current,
          totalUsedToken: totalTokenRef.current,
        },
      ]);
    }
  }, [totalTokensUsed, articleGenerated]);
  useEffect(() => {
    if (articleGenerated) {
      storeResponsesData();
    }
  }, [articleGenerated]);
  return (
    <div className="container mx-auto p-4">
      <h1
        className="text-center text-4xl font-bold mb-4"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        OpenAI Response
      </h1>
      <div className="flex items-center mb-4">
        <label htmlFor="prompt" className="me-4 text-lg">
          Enter the Keyword for given Outlines:{" "}
        </label>
        <input
          disabled={articleGenerated}
          id="prompt"
          type="text"
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="py-1 rounded border border-primary w-1/4"
        />
        {!originalPrompt && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={fetchOpenAIResponse}
          >
            Fetch Response
          </button>
        )}
        {response && originalPrompt && !articleGenerated && (
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={upgradeResponse}
          >
            Upgrade Response
          </button>
        )}
      </div>
      {originalPrompt && (
        <div className="bg-white shadow-md rounded p-4 my-3">
          <ul className="list-none list-inside">
            {originalPrompt.split("\n").map((line, index) => (
              <h1 className="bg-gray-200 p-2 mb-2 rounded" key={index}>
                {line}
              </h1>
            ))}
          </ul>
        </div>
      )}
      {outlines.length > 0 && (
        <div className="table-of-contents bg-white p-4 shadow-lg mt-8">
          <h2 className="text-center">Table of content:</h2>
          <ul className="">
            {outlines.map((outline, index) => (
              <li
                className="list-group-item mb-2"
                key={index}
                style={{
                  listStyleType: "none",
                }}
              >
                {outline}
              </li>
            ))}
          </ul>
        </div>
      )}
      {response && !articleGenerated && (
        <div>
          <h2 className="text-4xl font-bold text-blue-600">
            Generated Titles:
          </h2>
          <ul className="list-none list-inside">
            {response.split("\n").map((title, index) => (
              <li
                key={index}
                className="cursor-pointer my-2 text-blue-700"
                onClick={() => generateArticleForTitle(title)}
              >
                {title}
              </li>
            ))}
          </ul>
        </div>
      )}
      {articleGenerated && (
        <div className="container mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
          <div
            className=""
            dangerouslySetInnerHTML={{ __html: response }}
            style={{ marginTop: "10px" }}
          />
        </div>
      )}
      {tokensUsedPerPrompt.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-blue-600">
            Tokens Used Per Prompt:
          </h2>
          <ul className="list-none list-inside">
            {tokensUsedPerPrompt.map((tokens, index) => (
              <li key={index}>{`Prompt ${index + 1}: ${tokens}`}</li>
            ))}
          </ul>
        </div>
      )}
      {totalTokensUsed > 0 && (
        <p className="mt-2 text-blue-600">
          Total Tokens Used Across All Prompts: {totalTokensUsed}
        </p>
      )}
      {totalTokensUsed > 4200 && (
        <div>
          <h2 className="text-2xl font-bold text-blue-600">Stored Data:</h2>
          <ul className="list-none list-inside">
            {responsesData.map((data, index) => (
              <li className="list-none" key={index}>
                <p>{`Prompt: ${data.prompt}`}</p>
                <p>{`Selected Title: ${data.selectedTitle}`}</p>
                <p>{`Total Tokens Used: ${data.totalUsedToken}`}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChatGptPrompt;
