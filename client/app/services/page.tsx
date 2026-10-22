import TejereLayout from "../../components/TejereLayout";
import {
  PageHero,
  ServicesSection,
  StatsStrip,
  ApproachSection,
  TerrainSection,
  CtaBand,
} from "../../components/TejereSections";

export default function ServicesPage() {
  return (
    <TejereLayout path="/services">
      <PageHero
        label="Services"
        title="Protecting operations and the people alongside them."
        text="Upstream operations, exploration support and community programmes across the Niger Delta."
      />
      <ServicesSection />
      <StatsStrip />
      <ApproachSection />
      <TerrainSection />
      <CtaBand />
    </TejereLayout>
  );
}
