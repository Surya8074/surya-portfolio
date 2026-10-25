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
      src: "/surya-portfolio/comski-speaking-photo.svg",
      alt: "ComSki speaking practice preview with confidence feedback",
      objectFit: "cover",
      objectPosition: "center",
      fallback: "speaking",
    },
    lower: {
      type: "image",
      src: null,
      alt: "ComSki writing assistant displayed on a tablet",
      objectFit: "cover",
      objectPosition: "center",
      fallback: "writing",
    },
    hero: {
      type: "image",
      src: null,
      alt: "ComSki communication dashboard displayed on a laptop",
      objectFit: "cover",
      objectPosition: "center",
      fallback: "dashboard",
    },
  } satisfies Record<"upper" | "lower" | "hero", ComskiMediaConfig>,
} as const;
