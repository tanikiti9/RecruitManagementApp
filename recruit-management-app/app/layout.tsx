import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Train_One, M_PLUS_1p } from "next/font/google";
import "../style/globals.css";
import Header from "@/components/Header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const trainOne = Train_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-train",
});

const mplus = M_PLUS_1p({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mplus",
});

export const metadata: Metadata = {
  title: "就活管理",
  description: "就活管理アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${mplus.variable}
        ${trainOne.variable}
        h-full
        antialiased
      `}
    >
      <body
        className={mplus.className}
        style={{
          minHeight: "100vh",
        }}
      >
        <Header />
        <div
          style={{
            margin: "10px",
            marginTop: "75px",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}