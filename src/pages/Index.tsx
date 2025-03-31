
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import FeatureCards from "@/components/FeatureCards";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroBanner />
        <FeatureCards />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
