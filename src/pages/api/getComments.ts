import type { NextApiRequest, NextApiResponse } from 'next'
import { Tweet } from '../../../typings'
import { groq } from 'next-sanity'
import { sanityClient } from '../../../sanity'

const commentQuery = groq`
    *[_type == "comment" && references(*[_type == 'tweet' && _id == $tweetId]._id)]{
        _id,
        ...
    } | order(_createdAt desc)
`

type Data = Comment[]

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { tweetId } = req.query

    const comments: Comment[] = await sanityClient.fetch(commentQuery, {
        tweetId: tweetId
    })

    console.log('Comments >>>', comments)
    res.status(200).json(comments)
}