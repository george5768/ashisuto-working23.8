
import HeroSection from "./components/HeroSection";
import TrustedPartners from "./components/trustedpartners";
import SolutionsSection from "./components/SolutionSection";
import FeatureSection from "./components/FeatureSection";
import SectorsSection from "./components/SectorsSection";
import FeatureSection2 from "./components/FeatureSection2";
import GalleryServer from "./components/GalleryServer";
import ContactCardForm from "./components/ContactCardForm";

export default function Home() {
    return (
 <main>
  <HeroSection />
 <TrustedPartners />
 <SolutionsSection />
 <FeatureSection />
 <SectorsSection />
 <FeatureSection2 />
 <GalleryServer />
 <ContactCardForm />
 </main>
    )
  }