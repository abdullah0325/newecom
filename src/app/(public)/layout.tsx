import { ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnnouncementBar } from "@/components/announcement-bar";
import { ChatIntegrations } from "@/components/chat-integrations";
import { SiteLoader } from "@/components/SiteLoader";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <AnnouncementBar />
      <Header />
      <SiteLoader />
      <main className="flex-grow pb-12 lg:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav />
      <ChatIntegrations />
    </div>
  );
}

