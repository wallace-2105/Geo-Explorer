import type {
  Certificate,
  Challenge,
  ChallengeSubmissionResult,
  Progress,
} from "../types/domain.js";
export class ChallengeRepository {
  private readonly challenges = new Map<string, Challenge>();
  private readonly submissions: Array<{ challenge: Challenge; result: ChallengeSubmissionResult }> =
    [];
  async save(challenge: Challenge): Promise<void> {
    this.challenges.set(challenge.id, challenge);
  }
  async find(id: string): Promise<Challenge | undefined> {
    return this.challenges.get(id);
  }
  async addSubmission(challenge: Challenge, result: ChallengeSubmissionResult): Promise<void> {
    this.submissions.unshift({ challenge, result });
  }
  async history() {
    return this.submissions.map(({ challenge, result }) => ({
      id: result.submissionId,
      challengeTitle: challenge.title,
      technology: challenge.technology,
      difficulty: challenge.difficulty,
      status: result.status,
      solvedAt: result.submittedAt,
    }));
  }
}
export class CertificateRepository {
  private readonly certificates = new Map<string, Certificate>();
  async list(): Promise<Certificate[]> {
    return [...this.certificates.values()].sort((a, b) => b.issuedAt.localeCompare(a.issuedAt));
  }
  async find(id: string) {
    return this.certificates.get(id);
  }
  async save(certificate: Certificate) {
    this.certificates.set(certificate.id, certificate);
  }
}
export class ProgressRepository {
  private readonly values = new Map<string, Progress>();
  private key(userId: string, trailId: string) {
    return `${userId}:${trailId}`;
  }
  async find(userId: string, trailId: string) {
    return this.values.get(this.key(userId, trailId));
  }
  async listByUser(userId: string) {
    return [...this.values.values()].filter((item) => item.userId === userId);
  }
  async save(progress: Progress) {
    this.values.set(this.key(progress.userId, progress.trailId), progress);
  }
}
