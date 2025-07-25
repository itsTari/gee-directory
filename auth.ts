import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { client } from "./sanity/lib/client"
import { writeClient } from "./sanity/lib/write-client"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks:{
    async signIn({user , profile}){
      const existingUser = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {id: profile?.id});
      if(!existingUser){
        await writeClient.create({_type:'author', id: profile?.id, name: user?.name, username:profile?.login, email:user?.email, image:user?.image, bio:profile?.bio || ''})
      }
      return true
    },
    // jwt token
    async jwt({token, account, profile}){
      if(account && profile){
        const user = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {id: profile?.id})
        token.id = user?._id
      }
      return token
    },
    // creating session in other to use the id
    async session({ session, token }) {
    if (token.id) {
    session.id = token.id as string
    }
    return session
    }
  }
})