export type Project = {
  name: string;
  repo: string;
  tagline: string;
  description: string;
  highlights: string[];
};

export const projects: Project[] = [
  {
    name: "crym — Nightmare Edition",
    repo: "https://github.com/eezy18x/crym.git",
    tagline: "cryptokiddo’s offensive network scanner",
    description:
      "Lightweight, high-performance network scanner for offensive security learning. Built for port scanning & host discovery with a clean, professional CLI.",
    highlights: [
      "Multi-threaded TCP scanning",
      "Service and version fingerprinting",
      "Banner grabbing",
      "CIDR discovery + targeted ranges",
      "Animated CLI feedback",
      "Cross-platform (Linux/macOS/Windows)",
    ],
  },
];
