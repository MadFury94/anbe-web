import TejereLayout from "../components/TejereLayout";
import {
  Hero,
  LeadershipSection,
  CommunitySection,
  ServicesSection,
  TerrainSection,
  TrackRecord,
  ApproachSection,
  GovernanceSection,
  ContactSection,
} from "../components/TejereSections";

export default function Home() {
  return (
    <TejereLayout path="/">
      <Hero />
      <ServicesSection />
      <TrackRecord />
      <TerrainSection />
      <ApproachSection />
      <GovernanceSection />
      <LeadershipSection />
      <CommunitySection />
      <ContactSection />
    </TejereLayout>
  );
}
