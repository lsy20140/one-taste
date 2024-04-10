import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || ""
    })
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error'
  },
  callbacks: {
    // session에서 상속받아 저장된 user 정보 받아옴
    async signIn({user: {id, email, name, image}}) {
      if(!email) {
        return false
      }
      return true
    },
    // JWT 생성(signIn 성공), 업데이트(client에서 session 접근 시) 실행됨
    async jwt({token}) {      
      return token
    },
    async session({session, token}) {
      const user = session?.user;
      if(user && token.sub) {
        session.user = {
          ...user, 
          nickname: user.email?.split('@')[0] || "",
          user_id: token.sub || ''
        }
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET
}