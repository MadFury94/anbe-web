import TejereLayout from "../../components/TejereLayout";
import {
  PageHero,
  StatsStrip,
  TrackRecord,
  LeadershipSection,
  CtaBand,
} from "../../components/TejereSections";

export default function ProjectsPage() {
  return (
    <TejereLayout path="/projects">
      <PageHero
        label="Track Record"
        title="Experience across complex energy corridors."
        text="Our CEO’s experience spans upstream operations, offshore and exploration, pipeline security and community risk management."
      />
      <StatsStrip />
      <TrackRecord />
      <LeadershipSection />
      <CtaBand />
    </TejereLayout>
  );
}
