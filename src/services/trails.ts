import { mockTrails } from "@/data/trails.mock";
import type { Trail, TrailFilters } from "@/types";
import { apiRequest, delay, USE_MOCKS } from "./api";

function matchesFilters(trail: Trail, filters: TrailFilters): boolean {
  const { search, technology, level, status } = filters;
  if (search) {
    const q = search.toLowerCase();
    const haystack = `${trail.title} ${trail.description} ${trail.tags.join(" ")}`.toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  if (technology && technology !== "all" && trail.technology !== technology) return false;
  if (level && level !== "all" && trail.level !== level) return false;
  if (status && status !== "all" && trail.status !== status) return false;
  return true;
}

function toQuery(filters: TrailFilters): string {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== "all") params.set(key, String(value));
  });
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export const trailsService = {
  list(filters: TrailFilters = {}): Promise<Trail[]> {
    if (USE_MOCKS) {
      return delay(mockTrails.filter((t) => matchesFilters(t, filters)));
    }
    return apiRequest<Trail[]>(`/trails${toQuery(filters)}`);
  },

  getById(id: string): Promise<Trail> {
    if (USE_MOCKS) {
      const trail = mockTrails.find((t) => t.id === id || t.slug === id);
      if (!trail) return Promise.reject(new Error("Trilha não encontrada."));
      return delay(trail);
    }
    return apiRequest<Trail>(`/trails/${id}`);
  },

  listInProgress(): Promise<Trail[]> {
    if (USE_MOCKS) {
      return delay(mockTrails.filter((t) => t.status === "in_progress"));
    }
    return apiRequest<Trail[]>("/trails?status=in_progress");
  },

  enroll(id: string): Promise<{ trailId: string }> {
    if (USE_MOCKS) return delay({ trailId: id }, 600);
    return apiRequest<{ trailId: string }>(`/trails/${id}/enroll`, { method: "POST" });
  },
};
