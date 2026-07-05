import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PurpleInc Admin Hub | IAH",
  description: "Internal Admin Hub for PurpleInc Group Properties",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
