import { addUser, checkIsExistUser, getUserRole } from "@/service/user";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || ""
    })
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  callbacks: {
    // session에서 상속받아 저장된 user 정보 받아옴
    async signIn({ user: { id, email, name, image }, account }) {
      const res = await checkIsExistUser(id) as any
      const isExist = res[0].isExist

      if (!id) {
        return false
      }
      if (account?.provider === 'google') {
        if (!isExist) {
          addUser({ role: 'user', user_id: id, nickname: email?.split('@')[0] || "", image: image ?? '' })
          return '/'
        }
      }
      else if (account?.provider === 'kakao') {
        if (!isExist) {
          addUser({ role: 'user', user_id: id, nickname: name || "", image: image ?? "" })
          return '/'
        }
      }
      return true
    },
    // JWT 생성(signIn 성공), 업데이트(client에서 session 접근 시) 실행됨
    async jwt({ token }) {
      if (token.sub) {
        const res = await getUserRole(token.sub) as any[]
        if (res) {
          token.role = res[0].role
        }
      }
      return { ...token }
    },
    async session({ session, token }) {
      const user = session?.user;
      if (user && token.sub) {
        session.user = {
          ...user,
          nickname: token.name || '',
          user_id: token.sub || '',
          role: token.role || 'user'
        }
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET
}