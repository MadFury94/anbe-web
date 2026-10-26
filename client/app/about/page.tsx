import TejereLayout from "../../components/TejereLayout";
import {
  PageHero,
  AboutSection,
  LeadershipSection,
  CommunitySection,
  GovernanceSection,
  TrackRecord,
  TeamSection,
  CtaBand,
} from "../../components/TejereSections";
import { tejere } from "../../src/data/tejere";

export default function AboutPage() {
  return (
    <TejereLayout path="/about">
      <PageHero
        label="About"
        title="Local knowledge. Shared responsibility."
        text={tejere.company.description}
      />
      <AboutSection />
      <LeadershipSection />
      <TeamSection />
      <CommunitySection />
      <GovernanceSection />
      <TrackRecord />
      <CtaBand />
    </TejereLayout>
  );
}
