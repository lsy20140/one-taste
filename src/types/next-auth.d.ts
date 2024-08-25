import { AuthUser } from "@/model/user"
import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: AuthUser
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: 'admin' | 'user'
  }
}