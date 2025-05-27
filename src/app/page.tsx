import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BestSellers from "@/components/BestSellers";
import Collection from "@/components/Collection";
import SpecialSection from "@/components/SpecialSection";
import CooperationSection from "@/components/CooperationSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <Header />
      <Hero />
      <BestSellers />
      <Collection />
      <SpecialSection />
      <CooperationSection />
      <Footer />
    </main>
  );
}
