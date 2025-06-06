import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "孙子智策 | SunTzu Strategist AI",
  description: "使用《孙子兵法》智慧解决现代商业难题的AI战略顾问",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
