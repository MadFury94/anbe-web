import { Routes, Route } from "react-router-dom";
import Home from "../app/page";
import About from "../app/about/page";
import Services from "../app/services/page";
import Projects from "../app/projects/page";
import Contact from "../app/contact/page";
import Blog from "../app/blog/page";
import TejereIbidun from "../app/team/tejere-ibidun-ighoyota/page";
import DrMathiasAdamu from "../app/team/dr-mathias-adamu/page";
import EbikaboweiCharlesDorgu from "../app/team/ebikabowei-charles-dorgu/page";
import TejereLayout from "../components/TejereLayout";
import { PageHero } from "../components/TejereSections";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/team/tejere-ibidun-ighoyota" element={<TejereIbidun />} />
      <Route path="/team/dr-mathias-adamu" element={<DrMathiasAdamu />} />
      <Route path="/team/ebikabowei-charles-dorgu" element={<EbikaboweiCharlesDorgu />} />
      <Route
        path="*"
        element={
          <TejereLayout path="">
            <PageHero
              label="Page not found"
              title="This page is not available."
              text="Use the navigation to explore Tejere Anderson Services."
            />
            <div className="container section-pad">
              <a href="/" className="btn btn-primary">
                Return home →
              </a>
            </div>
          </TejereLayout>
        }
      />
    </Routes>
  );
}
