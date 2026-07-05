import Navbar from "@/components/hotel/Navbar";
import Footer from "@/components/hotel/Footer";
import ChatWidget from "@/components/hotel/ChatWidget";

export default function HotelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}
