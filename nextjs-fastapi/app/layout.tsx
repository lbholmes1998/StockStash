import "./globals.css";
import { Inter } from "next/font/google";
import StoreProvider from "./Redux/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stock Stash",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full"lang="en">
      <StoreProvider>
        <body className={inter.className}>{children}</body>
      </StoreProvider>
    </html>
  );
}
