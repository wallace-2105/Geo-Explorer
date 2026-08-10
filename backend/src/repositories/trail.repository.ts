import type { Trail } from "../types/domain.js";
export interface TrailRepository {
  list(): Promise<Trail[]>;
  findByIdentifier(identifier: string): Promise<Trail | undefined>;
  save(trail: Trail): Promise<void>;
}
export class InMemoryTrailRepository implements TrailRepository {
  private readonly trails: Trail[];
  constructor(seed: Trail[]) {
    this.trails = structuredClone(seed);
  }
  async list(): Promise<Trail[]> {
    return structuredClone(this.trails);
  }
  async findByIdentifier(identifier: string): Promise<Trail | undefined> {
    const found = this.trails.find((trail) => trail.id === identifier || trail.slug === identifier);
    return found && structuredClone(found);
  }
  async save(trail: Trail): Promise<void> {
    const index = this.trails.findIndex((item) => item.id === trail.id);
    if (index === -1) this.trails.push(structuredClone(trail));
    else this.trails[index] = structuredClone(trail);
  }
}
