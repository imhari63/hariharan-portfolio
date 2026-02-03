import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";

import "./css/card.scss";
import "./css/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Hariharan R – Software Developer",
    template: "%s | Hariharan R",
  },
  description:
    "Hariharan R is a software developer and full-stack engineer. Explore projects, skills, and experience.",
  applicationName: "Hariharan R",
  metadataBase: new URL("https://your-vercel-url.vercel.app"), // replace when you buy domain
  alternates: {
    canonical: "https://your-vercel-url.vercel.app",
  },
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Hariharan R – Software Developer",
    description: "Software Developer & Full-Stack Engineer",
    siteName: "Hariharan R",
    type: "website",
  },
  verification: {
    google: "googleeb944f3f34964655",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />

        <ToastContainer />

        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ScrollToTop />
        </main>

        <Footer />
      </body>
    </html>
  );
}
