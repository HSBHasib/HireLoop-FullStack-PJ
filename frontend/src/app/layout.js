import Navbar from "@/components/HomePage/Navbar/Navbar";
import "./globals.css";
import Footer from "@/components/HomePage/Footer/Footer";

export const metadata = {
  title: "Hire Loop",
  description: "Job Finder",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
