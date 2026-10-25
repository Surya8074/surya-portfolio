export type ComskiMediaConfig = {
  type: "image" | "video";
  src: string | null;
  alt: string;
  objectFit: "cover" | "contain";
  objectPosition: string;
  poster?: string;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  fallback: "speaking" | "writing" | "dashboard";
};

export const comskiProject = {
  id: "comski",
  index: "01",
  category: "Communication AI",
  title: { primary: "Com", highlight: "Ski" },
  headline: "The human side of communication.",
  description:
    "An AI-powered platform to practice speaking, writing, listening and reading with real-time feedback.",
  tags: ["AI", "EdTech", "Communication"],
  caseStudyUrl: "/surya-portfolio/comski.html",
  media: {
    upper: {
      type: "image",
      src: "/surya-portfolio/comski/speaking-card-visual.svg",
      alt: "ComSki speaking practice visual",
      objectFit: "cover",
      objectPosition: "center",
      fallback: "speaking",
    },
    lower: {
      type: "image",
      src: "/surya-portfolio/comski/writing-card-visual.svg",
      alt: "ComSki writing assistant visual",
      objectFit: "cover",
      objectPosition: "center",
      fallback: "writing",
    },
    hero: {
      type: "image",
      src: "/surya-portfolio/comski/Desktop%20-%201.svg",
      alt: "ComSki desktop dashboard visual",
      objectFit: "cover",
      objectPosition: "center",
      fallback: "dashboard",
    },
  } satisfies Record<"upper" | "lower" | "hero", ComskiMediaConfig>,
} as const;
