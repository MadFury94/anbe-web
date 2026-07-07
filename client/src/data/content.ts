// ============================================================
// ANBE NIGERIA LIMITED — SITE CONTENT
// Edit this file to update all text across the entire site.
// ============================================================

// ── Company ─────────────────────────────────────────────────
export const company = {
    name: "ANBE Nigeria Limited",
    shortName: "ANBE",
    tagline: "Engineering. Fabrication. Pipeline Integrity.",
    established: "1990",
    location: "Port Harcourt, Nigeria",
    description:
        "An indigenous engineering company delivering pipeline construction, fabrication, and flare systems to Nigeria's oil & gas sector since 1990.",
    ceo: {
        name: "Ernest Azukaeme",
        title: "Chief Executive Officer",
        photo: "/ceo.png",
        quote1:
            "At ANBE Nigeria, we are driven by a passion for excellence and a commitment to delivering innovative engineering solutions that power Nigeria's energy sector. Our success is built on the dedication of our talented team and the trust of our valued clients.",
        quote2:
            "We continue to invest in cutting-edge technology, professional development, and safety protocols to ensure we remain at the forefront of the industry.",
    },
    mission:
        "We create value through innovative, cost-effective pipeline procurement and construction solutions, driven by technical expertise, quality service, and strong client partnerships.",
    vision:
        "To become an international pipeline, engineering and construction service company that provides services of international standard.",
    emailjs: {
        serviceId: "YOUR_SERVICE_ID",
        templateId: "YOUR_TEMPLATE_ID",
        publicKey: "YOUR_PUBLIC_KEY",
    },
};

// ── Contact ──────────────────────────────────────────────────
export const contact = {
    address: "No. 245, Aba Road, Rumuogba Layout",
    city: "Port Harcourt, Rivers State",
    country: "Nigeria",
    phones: ["+234 803 310 0539", "+234 803 775 3444"],
    emails: ["info@anbenig.com", "anbenig@yahoo.com"],
    email: "info@anbenig.com",
    officeHours: "Mon–Fri, 8am–5pm WAT",
    fieldResponse: "24/7 Field Response",
};

// ── Navigation ───────────────────────────────────────────────
export const navLinks = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
];

// ── Hero ─────────────────────────────────────────────────────
export const hero = {
    eyebrow: "Est. 1990 — Port Harcourt, Nigeria",
    headline: "Engineering integrity,",
    headlineEm: "from wellhead to flare tip.",
    body: "ANBE Nigeria Limited designs, fabricates, and installs the pipeline and flare systems that keep Nigeria's oil & gas facilities running safely — built by an indigenous team with 36 years in the field.",
    ctaPrimary: { label: "View Our Projects →", href: "/projects" },
    ctaSecondary: { label: "Explore Capabilities", href: "/services" },
    stats: [
        { num: "36", lbl: "Years in Operation" },
        { num: "24/7", lbl: "Field Response" },
        { num: "100%", lbl: "Indigenous Owned" },
    ],
};

// ── Hero Slider ──────────────────────────────────────────────
export const heroSlides = [
    {
        id: 1,
        image: "/hero-1.jpg",
        title: "ENGINEERING INTEGRITY,\nFROM WELLHEAD TO FLARE TIP.",
        subtitle: "Est. 1990 — Port Harcourt, Nigeria",
        description:
            "ANBE Nigeria Limited designs, fabricates, and installs the pipeline and flare systems that keep Nigeria's oil & gas facilities running safely — built by an indigenous team with 36 years in the field.",
        buttonText: "EXPLORE OUR SERVICES",
        buttonLink: "/services",
    },
    {
        id: 2,
        image: "/industrial-1.jpg",
        title: "SAFETY & QUALITY\nAT THE CORE",
        subtitle: "Uncompromising Standards",
        description:
            "Our commitment to safety, quality, and excellence has made us a trusted partner for major operators across Nigeria. Every scope is planned, permitted, and closed out against a documented HSE standard.",
        buttonText: "LEARN MORE ABOUT US",
        buttonLink: "/about",
    },
    {
        id: 3,
        image: "/industrial-10.jpg",
        title: "INDIGENOUS ENGINEERING\nFOR COMPLEX CHALLENGES",
        subtitle: "36 Years in the Field",
        description:
            "From flare stack fabrication to trunkline installation, our scopes move through the same three disciplines — design, procurement, and construction — sequenced by our own field teams.",
        buttonText: "VIEW OUR PROJECTS",
        buttonLink: "/projects",
    },
];

// ── Stats ────────────────────────────────────────────────────
export const stats = [
    { value: 36, suffix: "", label: "Years in Business" },
    { value: 140, suffix: "+", label: "Projects Completed" },
    { value: 60, suffix: "+", label: "Engineers & Technicians" },
    { value: 24, suffix: "", label: "Hour Field Response" },
    { value: 0, suffix: "", label: "Lost-Time Incidents YTD" },
];

// ── About Section (homepage) ─────────────────────────────────
export const aboutSection = {
    eyebrow: "About ANBE",
    heading: "An indigenous engineering house built for the Niger Delta's toughest work.",
    body: "Incorporated in 1990, ANBE Nigeria Limited provides pipeline construction, fabrication engineering, and flare system design to operators across Nigeria's oil & gas sector. Our fabrication and maintenance facility, combined with a technical team drawn from combustion engineering and equipment maintenance disciplines, lets us take a project from design through procurement to commissioning without handing it off.",
    cta: { label: "Learn More About ANBE →", href: "/about" },
    values: [
        {
            title: "Mission",
            text: "Deliver engineering solutions of international standard, executed by Nigerian talent.",
        },
        {
            title: "Vision",
            text: "Become a leading Pipeline, Engineering & Construction company across West Africa.",
        },
        {
            title: "Safety",
            text: "Every scope is planned, permitted, and closed out against a documented HSE standard.",
        },
        {
            title: "Reliability",
            text: "Budgets and schedules are backed by real project data, not estimates alone.",
        },
    ],
};

// ── About Page ───────────────────────────────────────────────
export const aboutPage = {
    eyebrow: "Who We Are",
    heading: "About ANBE Nigeria",
    subheading: "Engineering excellence for the oil and gas sector since 1990.",
    overview: [
        "ANBE Nigeria Limited is a leading engineering solutions provider specializing in pipeline construction, fabrication engineering, and flare system design for Nigeria's oil and gas sector.",
        "Incorporated in 1990, our team of highly skilled engineers and technicians brings together expertise in design, project management, installation, and maintenance to deliver turnkey solutions.",
        "We are committed to safety, quality, and innovation in every project we undertake, ensuring that our clients receive the best possible service and value.",
    ],
    overviewImage: "/industrial-1.jpg",
    coreValues: [
        { title: "Safety First", desc: "Uncompromising commitment to safety in all operations." },
        { title: "Quality Excellence", desc: "Delivering superior quality in every project." },
        { title: "Client Focus", desc: "Building lasting partnerships through exceptional service." },
        { title: "Innovation", desc: "Embracing cutting-edge technology and solutions." },
        { title: "Integrity", desc: "Operating with honesty and transparency." },
        { title: "Accountability", desc: "Taking responsibility for our commitments." },
    ],
    cta: {
        heading: "Ready to Work Together?",
        body: "Talk to our team about your next engineering scope.",
        label: "Contact Us →",
        href: "/contact",
    },
};

// ── Services ─────────────────────────────────────────────────
export const services = [
    {
        idx: "01 — ENGINEERING",
        title: "Engineering Works",
        desc: "Comprehensive engineering services including design, fabrication, and installation of smokeless flare systems, remote ignition systems, and oil & gas facility infrastructure.",
        features: ["Smokeless Flare Design", "Remote Ignition Systems", "Facility Engineering", "Technical Design"],
    },
    {
        idx: "02 — CONSTRUCTION",
        title: "Pipeline Construction & Repair",
        desc: "Full-scope pipeline construction, installation, and repair including tie-ins, hydrotesting, corrosion repair, and right-of-way reinstatement.",
        features: ["New Construction", "Tie-ins & Repair", "Corrosion & Leak Repair", "ROW Reinstatement"],
    },
    {
        idx: "03 — PROCUREMENT",
        title: "Procurement & Stockpiling",
        desc: "Sourcing, quality verification, and stockpiling of materials and equipment for oil & gas facility construction, ensuring on-time delivery within budget.",
        features: ["Material Sourcing", "Quality Verification", "Stockpile Management", "Vendor Management"],
    },
    {
        idx: "04 — FABRICATION",
        title: "Fabrication & Workshop Services",
        desc: "Custom fabrication of oil and gas equipment — flare components, structural steel, and skid-mounted packages — at our Port Harcourt facility with full QA/QC.",
        features: ["Flare Components", "Structural Steel", "Skid Fabrication", "QA/QC Inspection"],
    },
    {
        idx: "05 — MANPOWER & LOGISTICS",
        title: "Manpower & Logistics Services",
        desc: "Skilled manpower supply and efficient logistics solutions to ensure seamless field operations, minimise downtime, and optimise cost-effectiveness across project sites.",
        features: ["Skilled Manpower Supply", "Field Logistics", "Project Mobilisation", "Cost Optimisation"],
    },
    {
        idx: "06 — PIPELINE INTEGRITY",
        title: "Pipeline Integrity Testing",
        desc: "Advanced pipeline integrity testing to detect leaks, corrosion, and structural weaknesses — ensuring safe, reliable, and long-lasting pipeline performance.",
        features: ["Leak Detection", "Corrosion Assessment", "Hydrotest", "Integrity Reporting"],
    },
    {
        idx: "07 — INSTRUMENTATION",
        title: "Instrumentation Services",
        desc: "Accurate and reliable data acquisition through comprehensive instrumentation design, installation, calibration, and maintenance services for oil & gas facilities.",
        features: ["Instrument Design", "Installation", "Calibration", "Ongoing Maintenance"],
    },
    {
        idx: "08 — FLOW STATIONS",
        title: "Flow Station Upgrades",
        desc: "Expert flow station upgrade services to optimise production, improve safety systems, and meet evolving regulatory and operational requirements.",
        features: ["Production Optimisation", "Safety Upgrades", "Regulatory Compliance", "System Integration"],
    },
    {
        idx: "09 — MAINTENANCE",
        title: "Equipment Maintenance",
        desc: "Combustion equipment maintenance covering generators, earth-moving equipment, and flare ignition assemblies with 24/7 emergency response capability.",
        features: ["Preventive Maintenance", "Emergency Response", "Generator Overhaul", "Ignition Assemblies"],
    },
];

export const servicesPage = {
    eyebrow: "EPC Capability",
    heading: "Our Services",
    subheading:
        "Engineering, procurement, and construction under one roof — sequenced by our own field teams, not subcontracted out.",
    sectionHeading: "Engineering, procurement, and construction under one roof.",
    sectionBody:
        "From flare stack design to trunkline installation, our scopes move through the same three disciplines — sequenced by our own field teams, not subcontracted out.",
    galleryEyebrow: "Field Work",
    galleryHeading: "Our Work in Action",
    galleryImages: [
        { img: "/industrial-10.jpg", title: "Pipeline Engineering" },
        { img: "/industrial-11.jpg", title: "Offshore Operations" },
        { img: "/industrial-12.jpg", title: "Process Engineering" },
        { img: "/industrial-1.jpg", title: "Installation Services" },
    ],
    cta: {
        heading: "Ready to Start Your Project?",
        body: "Contact us today to discuss how we can deliver your next engineering scope.",
        label: "Get in Touch →",
        href: "/contact",
    },
};

// ── Industries ───────────────────────────────────────────────
export const industriesSection = {
    eyebrow: "Where We Work",
    heading: "Industries served across the Niger Delta and beyond.",
    body: "Our core is oil & gas, but the same fabrication and construction disciplines carry across adjacent industrial sectors.",
    items: [
        { tag: "Core", name: "Oil & Gas" },
        { tag: "Core", name: "Energy & Flare Systems" },
        { tag: "Adjacent", name: "Industrial Fabrication" },
        { tag: "Adjacent", name: "Infrastructure & Utilities" },
        { tag: "Adjacent", name: "Construction" },
        { tag: "Adjacent", name: "Government & Public Works" },
        { tag: "Adjacent", name: "Manufacturing" },
        { tag: "Adjacent", name: "Industrial Automation" },
    ],
};

// ── Projects ─────────────────────────────────────────────────
export const projects = [
    {
        tag: "Flare Systems",
        category: "Flare Systems",
        client: "Niger Delta Terminal",
        title: "Smokeless Flare Stack Retrofit",
        desc: "Design and fabrication of a high turndown flare system to replace an ageing stack at an onshore export terminal.",
        description:
            "Design and fabrication of a high turndown flare system to replace an ageing stack at an onshore export terminal.",
        year: "2024",
        status: "Completed",
        image: "/industrial-1.jpg",
    },
    {
        tag: "Pipeline",
        category: "Pipeline",
        client: "Delta State Flowline",
        title: "18km Trunkline Replacement",
        desc: "Full pipeline construction and hydrotesting scope, delivered with zero lost-time incidents across an 11-month programme.",
        description:
            "Full pipeline construction and hydrotesting scope, delivered with zero lost-time incidents across an 11-month programme.",
        year: "2023",
        status: "Completed",
        image: "/industrial-5.jpg",
    },
    {
        tag: "Fabrication",
        category: "Fabrication",
        client: "Rivers State Facility",
        title: "Remote Ignition System Upgrade",
        desc: "Installation of a tropicalised remote ignition system across three flare points to reduce manual intervention.",
        description:
            "Installation of a tropicalised remote ignition system across three flare points to reduce manual intervention.",
        year: "2024",
        status: "Completed",
        image: "/industrial-9.jpg",
    },
    {
        tag: "Fabrication",
        category: "Fabrication",
        client: "Onshore Export Terminal",
        title: "Skid Fabrication Package",
        desc: "In-house fabrication of process skids and structural steel assemblies delivered to specification and ahead of schedule.",
        description:
            "In-house fabrication of process skids and structural steel assemblies delivered to specification and ahead of schedule.",
        year: "2024",
        status: "Completed",
        image: "/industrial-3.jpg",
    },
    {
        tag: "Pipeline",
        category: "Pipeline",
        client: "Niger Delta Operator",
        title: "Pipeline Tie-in & Hydrotest",
        desc: "Critical tie-in works and hydrotesting programme completed within a planned facility shutdown window.",
        description:
            "Critical tie-in works and hydrotesting programme completed within a planned facility shutdown window.",
        year: "2025",
        status: "Ongoing",
        image: "/industrial-7.jpg",
    },
    {
        tag: "Maintenance",
        category: "Maintenance",
        client: "Port Harcourt Facility",
        title: "Combustion Equipment Overhaul",
        desc: "Planned overhaul of combustion equipment including generators and flare ignition assemblies.",
        description:
            "Planned overhaul of combustion equipment including generators and flare ignition assemblies.",
        year: "2025",
        status: "Ongoing",
        image: "/industrial-11.jpg",
    },
];

export const projectsPage = {
    eyebrow: "Field Work",
    heading: "Featured Projects",
    subheading:
        "Delivering pipeline, fabrication, and flare scopes across Nigeria's oil & gas sector since 1990.",
    galleryEyebrow: "Gallery",
    galleryHeading: "Project Gallery",
    galleryImages: [
        "/industrial-1.jpg",
        "/industrial-2.jpg",
        "/industrial-3.jpg",
        "/industrial-4.jpg",
        "/industrial-5.jpg",
        "/industrial-6.jpg",
        "/industrial-7.jpg",
        "/industrial-8.jpg",
        "/industrial-9.jpg",
    ],
};

// ── Why Choose ───────────────────────────────────────────────
export const whyChoose = {
    eyebrow: "Why ANBE",
    heading: "Six reasons operators keep us on their bid list.",
    reasons: [
        {
            title: "Experienced Field Teams",
            text: "Personnel with backgrounds spanning combustion engineering, risk asset management, and major-project delivery.",
        },
        {
            title: "Proven Delivery Record",
            text: "36 years executing scopes to budget and schedule, backed by real project data.",
        },
        {
            title: "Safety-First Culture",
            text: "Every site operates under a documented HSE standard from mobilisation to demobilisation.",
        },
        {
            title: "In-House Fabrication",
            text: "An ultra-modern workshop means less dependency on third-party vendors and tighter schedule control.",
        },
        {
            title: "Indigenous Content",
            text: "A Nigerian-owned company prioritising local goods, materials, and manpower wherever available.",
        },
        {
            title: "24/7 Availability",
            text: "Round-the-clock response for operational facilities that cannot afford downtime.",
        },
    ],
};

// ── Testimonials ─────────────────────────────────────────────
export const testimonials = [
    {
        quote:
            "ANBE mobilised within days and closed out the flare retrofit ahead of our turnaround window. Documentation was clean and the crew ran a tight site.",
        name: "Facility Manager",
        company: "Onshore Export Terminal, Rivers State",
    },
    {
        quote:
            "What stood out was the fabrication quality — every skid arrived to spec and passed inspection first time.",
        name: "Project Engineer",
        company: "Independent E&P Operator",
    },
    {
        quote:
            "A dependable indigenous partner for pipeline work. Budgets held and the safety record was spotless across the programme.",
        name: "Procurement Lead",
        company: "EPC Contractor, Niger Delta",
    },
];

// ── Clients ──────────────────────────────────────────────────
export const clients = [
    { name: "Heirs Energies", logo: "/client-heirs.png" },
    { name: "Oando", logo: "/client-oando.png" },
    { name: "TotalEnergies", logo: "/client-total.png" },
];

// ── Gallery (IndustrialGallery component) ────────────────────
export const gallerySlides = [
    {
        images: [
            "/industrial-1.jpg",
            "/industrial-2.jpg",
            "/industrial-3.jpg",
            "/industrial-4.jpg",
            "/industrial-5.jpg",
            "/industrial-6.jpg",
            "/industrial-7.jpg",
            "/industrial-8.jpg",
            "/industrial-9.jpg",
        ],
        topCard: {
            subtitle: "EXPERTISE",
            name: "Engineering Excellence",
            description:
                "Delivering world-class engineering solutions with precision and innovation for the oil and gas sector.",
            bgColor: "bg-primary-blue/90",
        },
        bottomCard: {
            subtitle: "COMMITMENT",
            name: "Safety First",
            description:
                "Uncompromising dedication to safety standards and protocols in every project we undertake.",
            bgColor: "bg-primary-orange/90",
        },
    },
    {
        images: [
            "/industrial-10.jpg",
            "/industrial-11.jpg",
            "/industrial-12.jpg",
            "/industrial-1.jpg",
            "/industrial-2.jpg",
            "/industrial-3.jpg",
            "/industrial-4.jpg",
            "/industrial-5.jpg",
            "/industrial-6.jpg",
        ],
        topCard: {
            subtitle: "SERVICES",
            name: "Comprehensive Solutions",
            description:
                "From design to installation and maintenance, we provide end-to-end engineering services.",
            bgColor: "bg-secondary-teal/90",
        },
        bottomCard: {
            subtitle: "QUALITY",
            name: "36 Years of Delivery",
            description:
                "Meeting international quality standards with certified processes and experienced professionals.",
            bgColor: "bg-dark-navy/90",
        },
    },
];

// ── Contact form scopes ──────────────────────────────────────
export const contactScopes = [
    "Pipeline Construction",
    "Flare & Ignition Systems",
    "Fabrication",
    "Procurement",
    "Equipment Maintenance",
    "Other",
];

// ── Footer ───────────────────────────────────────────────────
export const footerColumns = [
    {
        title: "Company",
        links: [
            { label: "About", href: "/about" },
            { label: "Services", href: "/services" },
            { label: "Projects", href: "/projects" },
            { label: "Contact", href: "/contact" },
        ],
    },
    {
        title: "Services",
        links: [
            { label: "Flare & Ignition Systems", href: "/services" },
            { label: "Pipeline Construction", href: "/services" },
            { label: "Fabrication", href: "/services" },
            { label: "Procurement", href: "/services" },
            { label: "Equipment Maintenance", href: "/services" },
        ],
    },
    {
        title: "Industries",
        links: [
            { label: "Oil & Gas", href: "/services" },
            { label: "Energy & Flare", href: "/services" },
            { label: "Industrial Fabrication", href: "/services" },
            { label: "Infrastructure", href: "/services" },
            { label: "Construction", href: "/services" },
        ],
    },
];

export const socialLinks = [
    { label: "LI", href: "#" },
    { label: "TW", href: "#" },
    { label: "FB", href: "#" },
];
