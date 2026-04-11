import { ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnnouncementBar } from "@/components/announcement-bar";
import { ChatIntegrations } from "@/components/chat-integrations";
import { SiteLoader } from "@/components/SiteLoader";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <AnnouncementBar />
      <Header />
      <SiteLoader />
      <main className="flex-grow">{children}</main>
      <Footer />
      <ChatIntegrations />
    </div>
  );
}

