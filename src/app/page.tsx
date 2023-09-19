"use client"

import { GetServerSideProps, NextPage } from 'next'
import Sidebar from '../../components/Sidebar'
import Feed from '../../components/Feed'
import Widgets from '../../components/Widgets'
import { fetchTweets } from '../../utils/fetchTweets'
import { Tweet } from '../../typings'
import { useEffect, useState } from 'react'
import { fetchComments } from '../../utils/fetchComments'
import { Toaster } from 'react-hot-toast'

interface Props {
  tweets: Tweet[]
}
const Home: React.FC<Props> = ({ tweets }: Props) => {
  
  return (
    <div className='lg:max-w-6xl mx-auto max-h-screen overflow-hidden'>
      <Toaster />
      <main className="grid grid-cols-9">
        <Sidebar />
        
        <Feed tweets={tweets}/>
        
        <Widgets />
      </main>
    
    </div>
    
  )
}

const HomePage: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    async function fetchTweetsData() {
      try {
        const tweetsData = await fetchTweets();
        setTweets(tweetsData);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    }

    fetchTweetsData();
  }, []);

  return <Home tweets={tweets} />;
};

export default HomePage;