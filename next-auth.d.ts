// declare module 'next-auth'{
//     interface Session{
//         id:string,
//     }
//     interface Jwt {
//         id:string
//     }
// }
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    id: string
    user: {
      id: string
    } & DefaultSession["user"]
  }
  
  interface JWT {
    id: string
  }
}