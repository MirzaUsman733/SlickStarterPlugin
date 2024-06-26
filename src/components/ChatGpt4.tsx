'use client';
import React, { useState, useEffect, useRef } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { useUser } from '@/app/contexts/userData';
interface ChatGptPromptProps {
  userEmail: string | null | undefined;
  userName: string | null | undefined;
}
import axios from 'axios';
const ChatGptPrompt: React.FC<ChatGptPromptProps> = ({
  userEmail,
  userName,
}) => {
  const [loading, setLoading] = useState(false);
  const [totalTokensUsed, setTotalTokensUsed] = useState<number>(0);
  const [tokensUsedPerPrompt, setTokensUsedPerPrompt] = useState<number[]>([]);
  const [response, setResponse] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [originalPrompt, setOriginalPrompt] = useState<string>('');
  const [articleGenerated, setArticleGenerated] = useState<boolean>(false);
  const [outlines, setOutlines] = useState<string[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [responsesData, setResponsesData] = useState<
    { prompt: string; selectedTitle: string; totalUsedToken: number }[]
  >([]);
  const updateTotalTokensUsed = (tokens: number) => {
    setTotalTokensUsed((prevTotalTokensUsed) => prevTotalTokensUsed + tokens);
  };
  const languageAddOn =
    selectedLanguage !== 'English' ? `${selectedLanguage}` : '';
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const selectedTitleRef = useRef<string>('');
  const totalTokenRef = useRef<number>(0);
  const articleGeneratedRef = useRef<string>('');
  const { userWithEmail } = useUser();

  if (articleGenerated) {
    totalTokenRef.current = totalTokensUsed;
    articleGeneratedRef.current = response;
  }
  const fetchOpenAIResponse = async () => {
    try {
      setLoading(true);
      if (!prompt.trim()) {
        return;
      }

      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      const openaiEndpoint = 'https://api.openai.com/v1/chat/completions';
      const progressInterval = setInterval(() => {
        if (loadingProgress < 80) {
          setLoadingProgress((prevProgress) => prevProgress + 20);
        }
      }, 5000);
      const { data } = await axios.post(
        openaiEndpoint,
        {
          model: 'gpt-4',
          messages: [
            {
              role: 'user',
              content: `write the 10 titles that cannot start with the numbers on "${prompt}" the title are fully seo based and the output of any line cannot start with any number and the language is [${languageAddOn}]`,
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
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      clearInterval(progressInterval);
      setLoadingProgress(100);
      setResponse(data.choices[0].message.content);
      const tokensUsedInResponse = data.usage.total_tokens;
      setTokensUsedPerPrompt((prevTokens) => [
        ...prevTokens,
        tokensUsedInResponse,
      ]);
      updateTotalTokensUsed(tokensUsedInResponse);
      setOriginalPrompt(prompt);
      setResponsesData((prevData) => [
        ...prevData,
        { prompt, selectedTitle: '', totalUsedToken: 0 },
      ]);
      setLoading(false);
      setLoadingProgress(0);
    } catch (error) {
      console.error('Error fetching OpenAI response:', error);
    }
  };

  const upgradeResponse = async () => {
    try {
      if (!originalPrompt.trim()) {
        return;
      }

      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      const openaiEndpoint = 'https://api.openai.com/v1/chat/completions';

      const { data } = await axios.post(
        openaiEndpoint,
        {
          model: 'gpt-4',
          messages: [
            {
              role: 'user',
              content: `write the 10 titles that cannot start with the numbers on "${prompt}" the title are fully seo based and the output of any line cannot start with any number  and the language is [${languageAddOn}]`,
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
            'Content-Type': 'application/json',
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
      setOriginalPrompt(prompt);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching OpenAI response:', error);
    }
  };

  const generateArticleForTitle = async (selectedTitle: string) => {
    try {
      setLoading(true);
      if (!selectedTitle.trim()) {
        return;
      }

      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      const openaiEndpoint = 'https://api.openai.com/v1/chat/completions';

      // Step 1: Get outlines
      const { data: outlinesData } = await axios.post(
        openaiEndpoint,
        {
          model: 'gpt-4',
          messages: [
            {
              role: 'user',
              content: `write the 10 outline that cannot start with the numbers on:  "${selectedTitle}" only give me outlines not sub outlines and the language is [${languageAddOn}]`,
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
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      const outlines = outlinesData.choices[0].message.content.split('\n');
      const tokensUsedInResponse = outlinesData.usage.total_tokens;
      setTokensUsedPerPrompt((prevTokens) => [
        ...prevTokens,
        tokensUsedInResponse,
      ]);
      updateTotalTokensUsed(tokensUsedInResponse);
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
      const totalOutlines = outlines.length;
      let outlinesProcessed = 0;
      const initialOutlineProgress = 5;
      setLoadingProgress(initialOutlineProgress);
      for (const outline of outlines) {
        const { data } = await axios.post(
          openaiEndpoint,
          {
            model: 'gpt-4',
            messages: [
              {
                role: 'user',
                content: `write the content as an IT Expert and the outline is show on the top in h2 tag and the outline heading cannot be start with number for:  "${outline}" in 300 words that is 15 year old understandable and the must output in the html tags  and the language is [${languageAddOn}]`,
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
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );

        responses.push(data.choices[0].message.content);
        const tokensUsedInResponse = data.usage.total_tokens;
        setTokensUsedPerPrompt((prevTokens) => [
          ...prevTokens,
          tokensUsedInResponse,
        ]);
        updateTotalTokensUsed(tokensUsedInResponse);
        outlinesProcessed++;
        const progressPercentage =
          initialOutlineProgress +
          (outlinesProcessed / totalOutlines) * (100 - initialOutlineProgress);

        setLoadingProgress(progressPercentage);
      }
      setLoadingProgress(100);
      setResponse(responses.join('\n'));
      setOriginalPrompt(selectedTitle);
      setArticleGenerated(true);
      const updatedDataAfterGettingAllToken = responsesData.map((dataItem) =>
        dataItem.prompt === originalPrompt
          ? { ...dataItem, totalUsedToken: totalTokenRef.current }
          : dataItem
      );
      setResponsesData(updatedDataAfterGettingAllToken);
      setLoading(false);
    } catch (error) {
      console.error('Error generating article:', error);
    }
  };
  const storeResponsesData = async () => {
    try {
      const response = await fetch('/api/storeResponsesData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userWithEmail._id,
          name: userName,
          email: userEmail,
          language: selectedLanguage,
          prompt: prompt,
          selectedTitle: selectedTitleRef.current,
          article: articleGeneratedRef.current,
          totalTokensUsed: totalTokenRef.current,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to store data: ${response.statusText}`);
      }
      console.log('Data submitted successfully');
    } catch (error) {
      console.error('Error storing data:', error);
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

  type HeadingSizes = {
    [key: string]: string;
  };
  
  const copyToClipboard = async () => {
    try {
      const container = document.getElementById('generatedContentContainer');

      if (container) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(container);
        selection?.removeAllRanges();
        selection?.addRange(range);

        document.execCommand('copy');

        selection?.removeAllRanges();

        setCopyStatus('Copied content to clipboard!');
      } else {
        setCopyStatus('No content to copy!');
      }
    } catch (err) {
      console.error('Error copying to clipboard:', err);
      setCopyStatus('Failed to copy to clipboard');
    }

    setTimeout(() => {
      setCopyStatus(null);
    }, 3000);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-4 justify-center">
        <label htmlFor="prompt" className="me-4 text-lg">
          Enter the Keyword for given titles:{' '}
        </label>
        <input
          disabled={articleGenerated}
          id="prompt"
          type="text"
          placeholder="Enter your Keyword..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="py-1 px-3 rounded border border-primary w-1/4"
        />
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
      {loading && (
        <div className="loader-container bg-white shadow-md rounded p-4 my-3">
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
          <div className="progress-bar-container ">
            <div
              className="progress-bar"
              style={{ width: `${loadingProgress}%` }}
            ></div>
            <div className="progress-text">{`Progress: ${loadingProgress.toFixed(
              2
            )}%`}</div>
          </div>
        </div>
      )}

      {originalPrompt && (
        <div className="bg-white shadow-md rounded p-4 my-3 ">
          <ul className="list-none list-inside">
            {originalPrompt.split('\n').map((line, index) => (
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
                  listStyleType: 'none',
                }}
              >
                {outline}
              </li>
            ))}
          </ul>
        </div>
      )}
      {response && !articleGenerated && (
        <div className="table-of-contents bg-white p-4 shadow-lg mt-8">
          <h2 className="text-4xl font-bold text-blue-600 text-center">
            Generated Titles
          </h2>
          <ul className="list-none list-inside">
            {response.split('\n').map((title, index) => (
              <li
                key={index}
                className="cursor-pointer py-3 text-blue-700 list-group-item text-xl"
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
            id="generatedContentContainer"
            className=""
            dangerouslySetInnerHTML={{ __html: response }}
            style={{ marginTop: '10px' }}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={copyToClipboard}
          >
            Copy to Clipboard
          </button>
          {copyStatus && <p className="text-green-600">{copyStatus}</p>}
        </div>
      )}
    </div>
  );
};

export default ChatGptPrompt;
