import TejereLayout from "../../components/TejereLayout";
import { PageHero, ContactSection } from "../../components/TejereSections";

export default function ContactPage() {
  return (
    <TejereLayout path="/contact">
      <PageHero
        label="Contact"
        title="Talk to us about your corridor."
        text="Discuss pipeline security, oilfield support or community engagement with Tejere Anderson Services."
      />
      <ContactSection />
    </TejereLayout>
  );
}
