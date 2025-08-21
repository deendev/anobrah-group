import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "../components/navbar";
import Footer from "@/components/footer";


export const metadata: Metadata = {
  title: "Anobrah Group",
  description: "Your one-stop shop for all your Garri. From wholesale to retail, we have you covered.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-full flex-col bg-white">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
