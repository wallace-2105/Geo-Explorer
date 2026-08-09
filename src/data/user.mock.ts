import type { UserProfile } from "@/types";

export const mockUser: UserProfile = {
  id: "usr-1",
  name: "Lucas Andrade",
  headline: "Desenvolvedor full-stack · focado em Node.js e TypeScript",
  email: "lucas.andrade@geoexplorer.dev",
  memberSince: "2025-11-04T00:00:00Z",
  technologies: ["TypeScript", "Node.js", "React", "JavaScript", "Python"],
  stats: {
    completedTrails: 3,
    challengesSolved: 18,
    currentProgress: 72,
    certificates: 3,
    streakDays: 12,
    hoursStudied: 96,
  },
};
