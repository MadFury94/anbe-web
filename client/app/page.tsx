import TejereLayout from "../components/TejereLayout";
import VideoHero from "../components/VideoHero";
import {
  Hero,
  AboutSection,
  StatsStrip,
  PartnersStrip,
  ServicesSection,
  TerrainSection,
  TrackRecord,
  ApproachSection,
  GovernanceSection,
  Testimonials,
  News,
  Careers,
  ContactSection,
} from "../components/TejereSections";

export default function Home() {
  return (
    <TejereLayout path="/">
      <VideoHero />
      <Hero />
      <AboutSection />
      <StatsStrip />
      <PartnersStrip />
      <ServicesSection />
      <TerrainSection />
      <TrackRecord />
      <ApproachSection />
      <GovernanceSection />
      <Testimonials />
      <News />
      <Careers />
      <ContactSection />
    </TejereLayout>
  );
}
