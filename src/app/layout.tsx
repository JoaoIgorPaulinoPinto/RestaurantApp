"use client";
import Script from "next/script";
import { useEffect, useState } from "react";
import Header from "../Components/Header/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  return (
    <html lang="pt-br">
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
        <Script id="theme-init" strategy="lazyOnload">
          {`
            try {
              const pref = localStorage.getItem('preferencias-storage');
              if (pref) {
                const { state } = JSON.parse(pref);
                document.documentElement.dataset.theme = state.temaDark ? 'dark' : 'light';
              }
            } catch (e) {}
          `}
        </Script>
        {hydrated ? (
          <>
            <Header />
            {children}
          </>
        ) : (
          <></>
        )}
      </body>
    </html>
  );
}
