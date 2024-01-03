
"use client";
import React, { useState,useEffect,useRef } from "react";
import { MutatingDots } from "react-loader-spinner";
import axios from "axios";
import { useUser } from "@/app/contexts/userData";
interface CommentGptPromptProps {
  userEmail: string | null | undefined;
  userName: string | null | undefined;
}

const GptComments: React.FC<CommentGptPromptProps> = ({
  userEmail,
  userName,
}) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [commentsGenerated, setCommentsGenerated] = useState<boolean>(false);
 const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
   const totalTokenRef = useRef<number>(0);
   const finalResponseRef = useRef<string>("");
    const { userWithEmail } = useUser();
  const fetchOpenAIComment = async () => {
    try {
      if (!prompt.trim()) {
        return;
      }

      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      const openaiEndpoint = "https://api.openai.com/v1/chat/completions";

      setLoading(true);
 const productAddOn = selectedProduct === "DumpsBoss" ? "DumpsBoss.com" :
                           selectedProduct === "DumpsArena" ? "DumpsArena.com" : "";
 const languageAddOn =
   selectedLanguage !== "English" ? `${selectedLanguage}` : "";

      const { data } = await axios.post(
        openaiEndpoint,
        {
          model: "gpt-4-1106-preview",
          messages: [
            {
              role: "user",
              content: `generate 5 comments based on the following prompt: "${prompt}" in the each generated comments add the product name and product name with exam and product name with exam dumps also add product name with dumps and also add the website name and (output is in the html format) (each comment is 250 character and not add seo titles and only this website name can add in it : [${productAddOn}] and the comment is always unique that cannot generate before output is in html format and the language is [${languageAddOn}])`,
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
setCommentsGenerated(true);
      setResponse(data.choices[0].message.content);
      console.log(data.usage.total_tokens)
      finalResponseRef.current = data.choices[0].message.content
      totalTokenRef.current = data.usage.total_tokens
      setLoading(false);
    } catch (error) {
      console.error("Error fetching OpenAI comment:", error);
      setLoading(false);
    }
  };
  console.log(finalResponseRef.current)
const storeCommentsData = async () => {
  try {
    const responseData = await fetch("/api/storeCommentsData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userWithEmail._id,
        name: userName,
        email: userEmail,
        product: selectedProduct,
        language: selectedLanguage,
        prompt: prompt,
        comments: finalResponseRef.current,
        totalTokensUsed: totalTokenRef.current,
      }),
    });

    if (!responseData.ok) {
      throw new Error(`Failed to store data: ${responseData.statusText}`);
    }
    console.log("Data submitted successfully");
  } catch (error) {
    console.error("Error storing data:", error);
  }
};
  useEffect(() => {
    if (commentsGenerated) {
      storeCommentsData();
    }
  }, [commentsGenerated]);
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
        OpenAI Comment Generator
      </h1>
      <div className="flex items-center mb-4">
        <label htmlFor="prompt" className="me-4 text-lg">
          Enter the Prompt for comment generation:{" "}
        </label>
        <input
          id="prompt"
          type="text"
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="py-1 rounded border border-primary w-1/4"
        />
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="mx-4 py-1 rounded border border-primary"
        >
          <option value="">Select Product</option>
          <option value="DumpsBoss">DumpsBoss</option>
          <option value="DumpsArena">DumpsArena</option>
        </select>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="mx-4 py-1 rounded border border-primary"
        >
          
          <option value="English">English </option>
          <option value="Portuguese">Brazil </option>
          <option value="Italian">Italy</option>
          <option value="Spanish">Spain</option>
          <option value="French">France</option>
          <option value="German">Germany</option>
          <option value="Dutch">Netherlands</option>
          <option value="Arabic">Saudi Arabia</option>
          <option value="Polish">Poland</option>
          <option value="Vietnamese">Vietnam </option>
          <option value="Turkish">Turkey</option>
        </select>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={fetchOpenAIComment}
        >
          Generate Comment
        </button>
      </div>
      {loading && (
        <div className="loader-container">
          <div className="loader">
            <MutatingDots
              visible={true}
              height="100"
              width="100"
              color="#4fa94d"
              secondaryColor="#4fa94d"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        </div>
      )}
      {/* {response && (
        <div className="container mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
          <div
            id="generatedContentContainer"
            className=""
            dangerouslySetInnerHTML={{ __html: response }}
            style={{ marginTop: "10px" }}
          />
        </div>
      )} */}
      {response && (
        <div className="container mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
          <div
            id="generatedContentContainer"
            className=""
            dangerouslySetInnerHTML={{ __html: response }}
            style={{ marginTop: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default GptComments;