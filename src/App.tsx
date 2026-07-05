import { Routes, Route } from "react-router-dom";
import Home from "../app/page";
import About from "../app/about/page";
import Services from "../app/services/page";
import Projects from "../app/projects/page";
import Contact from "../app/contact/page";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
    );
}
