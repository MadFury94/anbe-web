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
        text="Pipeline security, oilfield support and community risk management across the Niger Delta."
      />
      <ServicesSection />
      <StatsStrip />
      <ApproachSection />
      <TerrainSection />
      <CtaBand />
    </TejereLayout>
  );
}
