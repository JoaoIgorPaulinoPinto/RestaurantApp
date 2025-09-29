import type { Metadata } from "next";
import "./globals.css";
import Header from "../Components/Header/header";

export const metadata: Metadata = {
  title: "Restaurante",
  description: "App for restaurants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" data-theme="dark">
      <body
        style={{
          backgroundColor: "var(--background-color)",
          fontFamily: "Arial, sans-serif",
          width: "100%",
          height: "100%",
          margin: 0,
          padding: 0,
          overflowX: "unset",
          overflowY: "auto",
        }}
      >
        <Header />
        {children}
      </body>
    </html >
  );
}
