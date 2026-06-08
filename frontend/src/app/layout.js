import Navbar from "@/components/HomePage/Navbar/Navbar";
import "./globals.css";
import Footer from "@/components/HomePage/Footer/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Hire Loop",
  description: "Job Finder",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#010103]">
        <Navbar />
        <main>{children}</main>
        <Footer />

         <Toaster />
      </body>
    </html>
  );
}
