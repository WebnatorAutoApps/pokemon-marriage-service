import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import CallToAction from "@/components/CallToAction";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Features />
      <HowItWorks />
      <CallToAction />
    </main>
  );
}
