import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import FeatureGrid from "./components/FeatureGrid";
import IntegrationStrip from "./components/IntegrationStrip";
import AnalyticsBlock from "./components/AnalyticsBlock";
import APIDemo from "./components/APIDemo";
import APICodeSample from "./components/APICodeSample";
import CTASection from "./components/CTASection";
import StatsPanel from "./components/StatsPanel";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <FeatureGrid />
      <IntegrationStrip />
      <AnalyticsBlock />
      <StatsPanel />
      <APIDemo />
      <APICodeSample />
      <CTASection />
      <Footer />
    </>
  );
}
