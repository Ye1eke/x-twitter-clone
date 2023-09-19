import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
export default NextAuth({
    providers: [
    TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID as string,
        clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
        version: "2.0",
    })
    ]
})

// export { handler as GET, handler as POST }