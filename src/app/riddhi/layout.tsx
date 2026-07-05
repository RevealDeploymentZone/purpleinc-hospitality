import RiddhiNavbar from "@/components/riddhi/Navbar";
import RiddhiFooter from "@/components/riddhi/Footer";
import RiddhiChatWidget from "@/components/riddhi/ChatWidget";

export default function RiddhiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RiddhiNavbar />
      <main className="pt-16">{children}</main>
      <RiddhiFooter />
      <RiddhiChatWidget />
    </>
  );
}
