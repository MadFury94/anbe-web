import TejereLayout from "../../components/TejereLayout";
import {
  PageHero,
  News,
  GovernanceSection,
  CtaBand,
} from "../../components/TejereSections";

export default function InsightsPage() {
  return (
    <TejereLayout path="/blog">
      <PageHero
        label="Insights"
        title="A clearer view of energy corridors."
        text="Perspectives on pipeline security, community partnership and Smart Petroleum Governance."
      />
      <GovernanceSection />
      <News />
      <CtaBand />
    </TejereLayout>
  );
}
