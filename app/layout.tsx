import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import DataSync from "@/components/admin/DataSync";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Peekasha Jewell - Exquisite Jewelry Collection",
  description: "Discover stunning handcrafted jewelry pieces. From elegant rings to beautiful necklaces, find your perfect accessory at Peekasha Jewell.",
  keywords: "jewelry, rings, necklaces, earrings, bracelets, gold, silver, fashion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DataSync />
        <Navbar />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
