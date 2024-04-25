import Footer from "@/components/Footer";
import "@/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  metadataBase: new URL("https://screw-adobe.vercel.app/"),
  title: "Screw Adobe | Buy Affinity",
  description: "Check when Affinity Suite is on sale!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Screw Adobe | Buy Affinity",
    description: "Check when Affinity Suite is on sale!",
    image: "url/website.png",
  },
  twitter: {
    card: "summary_large_image",
    site: "@eMartiiin94",
    title: "Screw Adobe | Buy Affinity",
    description: "Check when Affinity Suite is on sale!",
    image: "url/website.png",
  },
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
