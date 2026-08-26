import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Specialties from "@/components/Specialties";
import GetStarted from "@/components/GetStarted";
import HowWeWork from "@/components/HowWeWork";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <Specialties />
      <GetStarted />
      <HowWeWork />
      <FAQ />
      <Footer />
    </main>
  );
}
