import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Krystal Cafe | Chinese & North Indian | Lucknow",
  description: "Dine at Krystal Cafe — authentic Chinese & North Indian cuisine in the heart of Lucknow.",
};

export default function CafeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
