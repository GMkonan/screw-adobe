import Footer from "@/components/Footer";
import "@/styles/globals.css";

import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Screw Adobe | Buy Affinity",
  description: "Check when Affinity Suite is on sale!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="/website.png" />
        <meta property="twitter:title" content="Screw Adobe | Buy Affinity" />
        <meta
          property="twitter:description"
          content="Check when Affinity Suite is on sale!"
        />
        <meta property="og:image" content="/website.png" />
        <meta property="og:title" content="Screw Adobe | Buy Affinity" />
        <meta
          property="og:description"
          content="Check when Affinity Suite is on sale!"
        />
      </Head>
      <body
        className={`flex h-screen w-full flex-col text-center font-sans ${inter.variable}`}
      >
        <main className="h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
