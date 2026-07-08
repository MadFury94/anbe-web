import { Routes, Route } from "react-router-dom";
import Home from "../app/page";
import About from "../app/about/page";
import Services from "../app/services/page";
import Projects from "../app/projects/page";
import Contact from "../app/contact/page";
import Blog from "../app/blog/page";
import BlogArticle from "../app/blog/article/page";
import ReportPage from "../app/report/page";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/report/:token" element={<ReportPage />} />
        </Routes>
    );
}
