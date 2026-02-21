import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import IndustrialGallery from "@/components/IndustrialGallery";
import ClientLogos from "@/components/ClientLogos";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSlider />
      <AboutSection />
      <ServicesSection />
      <IndustrialGallery />
      <ClientLogos />
      <ProjectsShowcase />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-blue to-dark-navy text-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Partner with ANBE Nigeria for world-class engineering solutions tailored to your needs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/contact">
              <button className="bg-primary-orange text-white px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-accent-gold transition-all shadow-lg">
                Get a Quote
              </button>
            </a>
            <a href="/services">
              <button className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-dark-navy transition-all">
                Our Services
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
