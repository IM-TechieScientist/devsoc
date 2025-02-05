"use client"

import { useEffect, useState } from "react";
import { Card, Title } from "@tremor/react";

interface NewsDisplayProps {
  companyName: string;
}

const delay = (ms: number) => new Promise ( resolve => setTimeout(resolve,ms));

const NewsDisplay: React.FC<NewsDisplayProps> = ({ companyName }) => {
  const [positiveNews, setPositiveNews] = useState<[string, string][]>([]);
  const [negativeNews, setNegativeNews] = useState<[string, string][]>([]);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        // Fetch positive news
        await delay(1000)
        const posNewsResponse = await fetch(`http://192.168.24.150:6969/pos_news/${companyName}`);
        if (!posNewsResponse.ok) {
          throw new Error(`HTTP error! status: ${posNewsResponse.status}`);
        }
        const posNewsData:[string, string][] = await posNewsResponse.json();
        setPositiveNews(posNewsData); // Assuming the response is a list of strings

        // Fetch negative news
        await delay(1000)
        const negNewsResponse = await fetch(`http://192.168.24.150:6969/neg_news/${companyName}`);
        if (!negNewsResponse.ok) {
          throw new Error(`HTTP error! status: ${negNewsResponse.status}`);
        }
        const negNewsData: [string, string][] = await negNewsResponse.json();
        setNegativeNews(negNewsData); // Assuming the response is a list of strings

      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    if (companyName) {
      fetchNewsData();
    }
  }, [companyName]);

  return (
    <>
      {/* Display Positive News */}
      {positiveNews.length > 0 && (
        <Card className="mt-6">
        <Title className="text-black font-bold">Positive News</Title>
        <ul className="list-disc pl-5">
          {positiveNews.map((newsItem, index) => (
            <li key={index} className="text-black">
              <a href={newsItem[1]} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {newsItem[0]}
              </a>
            </li>
          ))}
        </ul>
      </Card>
      )}

      {/* Display Negative News */}
      {negativeNews.length > 0 && (
        <Card className="mt-6">
        <Title className="text-black font-bold">Negative News</Title>
        <ul className="list-disc pl-5">
          {negativeNews.map((newsItem, index) => (
            <li key={index} className="text-black">
              <a href={newsItem[1]} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {newsItem[0]}
              </a>
            </li>
          ))}
        </ul>
      </Card>
      )}
    </>
  );
};

export default NewsDisplay;