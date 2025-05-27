import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import BestSellers from "@/components/home/BestSellers";
import Collection from "@/components/home/Collection";
import SpecialSection from "@/components/home/SpecialSection";
import CooperationSection from "@/components/home/CooperationSection";
import Footer from "@/components/home/Footer";

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
