import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ClassesSection } from "@/components/ClassesSection";
import { DirectorySection } from "@/components/DirectorySection";
import { HelpSection } from "@/components/HelpSection";
import { MarketSection } from "@/components/MarketSection";
import { ComingSoonSection } from "@/components/ComingSoonSection";
import { FounderSection } from "@/components/FounderSection";
import { SupportSection } from "@/components/SupportSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ClassesSection />
        <DirectorySection />
        <HelpSection />
        <MarketSection />
        <ComingSoonSection />
        <FounderSection />
        <SupportSection />
      </main>
      <Footer />
    </div>
  );
}
