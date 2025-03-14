import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import "@/styles/globals.css";
import { Analytics } from '@vercel/analytics/next';
import { Poppins } from "next/font/google";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Tapakila App",
  icons: {
    icon: "/assets/favicon.png",
  },
  type: "image/svg+xml",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <div>
          <Navbar />
          <main className="pt-0">
            {children}
            <ToastContainer />
            <Analytics />
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
