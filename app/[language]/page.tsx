import HeroSection from "@/app/components/HeroSection";
// import TrustedPartners from "@/app/components/trustedpartners";
import SolutionsSection from "@/app/components/SolutionSection";
import FeatureSection from "@/app/components/FeatureSection";
import SectorsSection from "@/app/components/SectorsSection";
import FeatureSection2 from "@/app/components/FeatureSection2";
// import FindSection from "@/app/components/FindSection";
import GalleryServer from "@/app/components/GalleryServer";
import ContactCardForm from "@/app/components/ContactCardForm";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SolutionsSection />
      {/* <TrustedPartners /> */}
      <FeatureSection />
      <SectorsSection />
      <FeatureSection2 />

      {/* Revamp below page - see leftover_To_Do_Page folder */}
      {/* <FindSection /> */}
      <GalleryServer />
      <ContactCardForm />
      

    </main>
  );
}
