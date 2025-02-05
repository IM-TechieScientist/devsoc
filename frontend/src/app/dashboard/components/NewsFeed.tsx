"use client"

import { Card, Title, Text } from "@tremor/react"
import { useEffect, useState } from "react"
import fetch from "node-fetch";

interface NewsItem {
  id: number
  title: string
  date: string
  summary: string
}

interface NewsFeedProps {
  company: string;
}
export default function NewsFeed({ company }: NewsFeedProps) {
    // const [currentNews, setCurrentNews] = useState<NewsItem[]>(news);
  
    // useEffect(() => {
    //   const interval = setInterval(() => {
    //     // Simulate fetching new news items
    //     const updatedNews = fetchUpdatedNews(); // Replace with your fetching logic
    //     setCurrentNews(updatedNews);
    //   }, 60000); // Update every 60 seconds
  
    //   return () => clearInterval(interval); // Cleanup on unmount
    // }, []);

    // function fetchUpdatedNews(): NewsItem[] {
    //     return [
    //         {}
    //     ]
    // }

    // const data = await response.json();

    const [positiveNews, setPositiveNews] = useState<NewsItem[]>([]);
    const [negativeNews, setNegativeNews] = useState<NewsItem[]>([])


    useEffect(() => {
        const fetchPositiveNews = async() => {
            try {
                const response = await fetch(`http://192.168.141.150:6969/pos_news/${company}`);

                if(!response.ok){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json() as NewsItem[];
                setPositiveNews(data);

            } catch(error) {
                console.log('Flag! Error fetching the positive news, look into it', error);
            }
        };

        const fetchNegativeNews = async() => {
            try {
                const response = await fetch(`http://192.168.141.150:6969/neg_news/${company}`);

                if(!response.ok){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json() as NewsItem[];
                setNegativeNews(data);

            } catch(error) {
                console.log('Flag! Error fetching the positive news, look into it', error);
            }
        };

        fetchPositiveNews();
        fetchNegativeNews();
        
        const interval = setInterval(()=>{
            fetchPositiveNews();
            fetchNegativeNews();
        }, 60000)
        
        return () => clearInterval(interval)

    }, [company]);


    return (
        <Card className="bg-white">
          <Title className="text-black font-bold">Positive News</Title>
          <div className="mt-4 space-y-4">
            {positiveNews.map((item) => (
              <div key={item.id} className="border-b pb-4 last:border-0">
                <Text className="font-medium text-black">{item.title}</Text>
                <Text className="text-sm text-gray-700">{item.date}</Text>
                <Text className="mt-1 text-black">{item.summary}</Text>
              </div>
            ))}
          </div>
    
          <Title className="text-black font-bold mt-8">Negative News</Title>
          <div className="mt-4 space-y-4">
            {negativeNews.map((item) => (
              <div key={item.id} className="border-b pb-4 last:border-0">
                <Text className="font-medium text-black">{item.title}</Text>
                <Text className="text-sm text-gray-700">{item.date}</Text>
                <Text className="mt-1 text-black">{item.summary}</Text>
              </div>
            ))}
          </div>
        </Card>
      );
    }

