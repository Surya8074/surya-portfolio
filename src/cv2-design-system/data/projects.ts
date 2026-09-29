export type CV2Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  role: string;
  year: string;
  description: string;
  image: string;
  href: string;
  featured?: boolean;
  contribution: string;
};

export const cv2Projects: CV2Project[] = [
  {
    id: "genesis",
    index: "01",
    title: "Genesis",
    category: "AI Test Automation",
    role: "Product Designer",
    year: "2025",
    description: "AI-powered test automation for a more structured testing workflow.",
    image: "/surya-portfolio/genesis/Reports.webp",
    href: "/surya-portfolio/work/genesis-v7/?v=phase4#s01",
    featured: true,
    contribution: "Product architecture, interaction design and visual system.",
  },
  {
    id: "comski",
    index: "02",
    title: "ComSki",
    category: "AI Communication",
    role: "Product Designer",
    year: "2025",
    description: "A communication-learning experience built around personalised onboarding and four skill modes.",
    image: "/surya-portfolio/comski/home.webp",
    href: "/surya-portfolio/comski.html",
    featured: true,
    contribution: "Product experience, onboarding, interaction model and UI design.",
  },
  {
    id: "laundromart",
    index: "03",
    title: "LaundroMart",
    category: "AI Operations",
    role: "Product Designer",
    year: "2025",
    description: "Computer-vision-assisted workflows for laundry operations.",
    image: "/surya-portfolio/laundromart/home.webp",
    href: "#",
    featured: false,
    contribution: "Product flows, dashboard UX and operational tooling.",
  },
];
