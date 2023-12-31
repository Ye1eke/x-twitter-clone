import React, { useEffect, useState } from 'react'
import { Tweet, Comment, CommentBody } from '../typings'
import TimeAgo from 'react-timeago'
import { ArrowPathRoundedSquareIcon, ArrowUpTrayIcon, ChartBarIcon, ChatBubbleOvalLeftIcon, HeartIcon } from '@heroicons/react/24/outline'
import { fetchComments } from '../utils/fetchComments'
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast'

interface Props {
    tweet: Tweet
}

function Tweet({ tweet }: Props) {
  const [comments, setComments] = useState<Comment[]>([])
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')
  const { data: session } = useSession()

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id)
    setComments(comments)
  }

  useEffect(() => {
    refreshComments()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const commentToast = toast.loading('Posting Comment...')

    const comment: CommentBody = {
      comment: input,
      tweetId: tweet._id,
      username: session?.user?.name || 'Unknown User',
      profileImg: session?.user?.image || 'images/default_profile.png',
    }
    const result = await fetch(`/api/addComment`, {
      body: JSON.stringify(comment),
      method: 'POST',
    })

    console.log('WOOHOO we made it', result)
    toast.success('Comment Posted!', {
      id: commentToast,
    })

    setInput('')
    setCommentBoxVisible(false)
    refreshComments()
  }
  return (
    <div className='flex flex-col space-x-3 p-5'>
      <div className='flex space-x-3'>
        <img className='h-10 w-10 rounded-full object-cover' src={tweet.profileImg} alt="profile image" />

        <div>
          <div className='flex items-center space-x-1'>
            <p className='mr-1 font-bold'>{tweet.username}</p>
            <p className='hidden text-sm text-gray-500 sm:inline'>@{tweet.username.replace(/\s+/g, '').toLowerCase()} ·</p>

            <TimeAgo
              className='text-sm text-gray-500'
              date={tweet._createdAt}
            />
          </div>

          <p className='pt-1'>{tweet.text}</p>

          {tweet.image && <img src={tweet.image} alt='tweet image' className='m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm' />}

          <div className='mt-5 flex justify-between'>
            <div onClick={() => session && setCommentBoxVisible(!commentBoxVisible)} className='flex cursor-pointer items-center space-x-3 text-gray-400'>
              <ChatBubbleOvalLeftIcon className='h-5 w-5' />
              <p>{comments.length}</p>
            </div>

            <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
              <ArrowPathRoundedSquareIcon className='h-5 w-5' />
            </div>

            <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
              <HeartIcon className='h-5 w-5' />
            </div>

            <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
              <ChartBarIcon className='h-5 w-5' />
            </div>

            <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
              <ArrowUpTrayIcon className='h-5 w-5' />
            </div>

          </div>
        </div>
      </div>

      {commentBoxVisible && (
        <form onSubmit={handleSubmit} className='mt-3 flex space-x-3'>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='flex-1 rounded-lg bg-zinc-800 p-2 outline-none'
            type="text" placeholder='Write a comment...'/>
          <button 
            disabled={!input} 
            type='submit'
            className='text-twitter disabled:text-gray-200'>Post</button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className='my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll scrollbar-hide border-t border-zinc-800 p-5'>
          {comments.map((comment) => (
            <div key={comment._id} className='relative flex space-x-2'>
              <hr className='absolute left-5 top-10 h-8 border-x border-zinc-800' />
              <img
                src={comment.profileImg}
                className='mt-2 h-7 w-7 rounded-full object-cover'
                alt='profile image'
              />
              <div>
                <div className='flex items-center space-x-1'>
                  <p className='mr-1 font-bold'>{comment.username}</p>
                  <p className='hidden text-sm text-gray-500 lg:inline'>
                    @{tweet.username.replace(/\s+/g, '').toLowerCase()} ·
                  </p>

                  <TimeAgo
                    className='text-sm text-gray-500'
                    date={comment._createdAt}
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
              
            </div>
          ))}
        </div>          
      )}
    </div>
  )
}

export default Tweet
