import type { Metadata } from "next";
import { Geist, Geist_Mono, Rubik, Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-rubik"
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-poppins"
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
