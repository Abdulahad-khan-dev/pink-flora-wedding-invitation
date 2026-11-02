import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Floral Beginning | Wedding Invitation",
  description: "An automatically unfolding floral wedding invitation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}