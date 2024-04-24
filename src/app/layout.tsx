import Footer from "@/components/Footer";
import "@/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Screw Adobe",
  description: "Buy Affinity",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`flex h-screen w-full flex-col text-center font-sans ${inter.variable}`}
      >
        <main className="h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
