import TejereLayout from "../../components/TejereLayout";
import { PageHero, ContactSection } from "../../components/TejereSections";

export default function ContactPage() {
  return (
    <TejereLayout path="/contact">
      <PageHero
        label="Contact"
        title="Talk to us about your upstream project."
        text="Discuss upstream operations, exploration support or community programmes with Tejere Anderson Services."
      />
      <ContactSection />
    </TejereLayout>
  );
}
