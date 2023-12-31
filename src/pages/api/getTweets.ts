import type { NextApiRequest, NextApiResponse } from 'next'
import { Tweet } from '../../../typings'
import { groq } from 'next-sanity'
import { sanityClient } from '../../../sanity'

const feedQuery = groq`
    *[_type == "tweet" && !blockTweet]{
        _id,
        ...
    } | order(_createdAt desc)
`

type Data = {
    tweets: Tweet[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const tweets: Tweet[] = await sanityClient.fetch(feedQuery)
    res.status(200).json({ tweets })
}