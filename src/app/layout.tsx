import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthContext from "@/context/AuthContext";
import Header from "@/components/common/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "원테이스트",
  description: "서울의 하나뿐인 맛집을 한눈에",
};

  export default function RootLayout({
    children,
    modal
  }: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode
  }>) {
    return (
      <html lang="en" className="font-Pretendard text-black">
        <AuthContext>
          <body className={inter.className && `flex flex-col w-full h-screen`}>
            <Header />
            <div className="w-full h-full">
              {children}
              {modal}
            </div>
          </body>
        </AuthContext>
      </html>
    );
  }
