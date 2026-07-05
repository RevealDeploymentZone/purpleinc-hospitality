import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Heera Grand | Luxury Hotel in Lucknow",
  description: "Book directly at Heera Grand — Best price guarantee. Luxury hotel near Charbagh, Lucknow.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
