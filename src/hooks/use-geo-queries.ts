import { useMutation, useQuery } from "@tanstack/react-query";
import { certificatesService } from "@/services/certificates";
import { challengesService } from "@/services/challenges";
import { trailsService } from "@/services/trails";
import { userService } from "@/services/user";
import type {
  ChallengeSubmission,
  GenerateChallengeInput,
  TrailFilters,
} from "@/types";

export const queryKeys = {
  profile: ["profile"] as const,
  trails: (filters: TrailFilters = {}) => ["trails", filters] as const,
  trail: (id: string) => ["trail", id] as const,
  certificates: ["certificates"] as const,
  challengeHistory: ["challenge-history"] as const,
};

export function useProfile() {
  return useQuery({ queryKey: queryKeys.profile, queryFn: userService.getProfile });
}

export function useTrails(filters: TrailFilters = {}) {
  return useQuery({
    queryKey: queryKeys.trails(filters),
    queryFn: () => trailsService.list(filters),
  });
}

export function useTrail(id: string) {
  return useQuery({
    queryKey: queryKeys.trail(id),
    queryFn: () => trailsService.getById(id),
    retry: false,
  });
}

export function useCertificates() {
  return useQuery({
    queryKey: queryKeys.certificates,
    queryFn: certificatesService.list,
  });
}

export function useChallengeHistory() {
  return useQuery({
    queryKey: queryKeys.challengeHistory,
    queryFn: challengesService.history,
  });
}

export function useGenerateChallenge() {
  return useMutation({
    mutationFn: (input: GenerateChallengeInput) => challengesService.generate(input),
  });
}

export function useSubmitChallenge() {
  return useMutation({
    mutationFn: (submission: ChallengeSubmission) => challengesService.submit(submission),
  });
}
