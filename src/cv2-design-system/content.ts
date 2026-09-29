export type CV2Metadata = {
  role: string;
  product: string;
  focus: string;
  tools: string;
};

export type CV2Skill = {
  id: string;
  index: string;
  title: string;
  task: string;
  input: string;
  output: string;
};

export type CV2CaseStudySection = {
  id: string;
  index: string;
  label: string;
};

export type CV2DesignPrinciple = {
  id: string;
  title: string;
  description: string;
};

export type CV2Technology = {
  name: string;
  purpose: string;
};

export type CV2ExperienceItem = {
  role: string;
  context: string;
  period: string;
};

export const cv2Metadata: CV2Metadata = {
  role: "Product Designer",
  product: "AI communication coach",
  focus: "Personalisation + skill assessment",
  tools: "Figma · interaction design",
};

export const cv2Skills: CV2Skill[] = [
  { id: "reading", index: "01", title: "Reading", task: "Read aloud + answer", input: "Text", output: "Comprehension / expression" },
  { id: "listening", index: "02", title: "Listening", task: "Listen + answer", input: "Audio", output: "Comprehension" },
  { id: "writing", index: "03", title: "Writing", task: "Compose response", input: "Text / scenario", output: "Written expression" },
  { id: "speaking", index: "04", title: "Speaking", task: "Speak naturally", input: "Prompt", output: "Spoken expression" },
];

export const cv2CaseStudySections: CV2CaseStudySection[] = [
  { id: "s01", index: "01", label: "Product premise" },
  { id: "s02", index: "02", label: "Personalisation" },
  { id: "s03", index: "03", label: "Assessment model" },
  { id: "s04", index: "04", label: "Four skills" },
  { id: "s05", index: "05", label: "Interaction system" },
  { id: "s06", index: "06", label: "Progression" },
  { id: "s07", index: "07", label: "Reflection" },
];

export const cv2DesignPrinciples: CV2DesignPrinciple[] = [
  { id: "context", title: "Context before content", description: "Establish the learner model before introducing the skill journey." },
  { id: "grammar", title: "Stable interaction grammar", description: "Keep orientation, task, progress and completion recognisable across skill modes." },
  { id: "direction", title: "Completion should create direction", description: "Use completion states to make the next step explicit rather than ending the journey." },
];

export const cv2Technologies: CV2Technology[] = [
  { name: "React", purpose: "Component-based interface structure" },
  { name: "TypeScript", purpose: "Typed component and data contracts" },
  { name: "Motion", purpose: "Reusable, restrained interface motion" },
  { name: "Lenis", purpose: "Smooth scrolling where it improves usability" },
  { name: "CSS", purpose: "Tokens, responsive layout and lightweight interaction states" },
];

export const cv2Experience: CV2ExperienceItem[] = [
  { role: "Product Designer", context: "ComSki", period: "Case study" },
];
