import { mockCertificates } from "@/data/certificates.mock";
import type { Certificate } from "@/types";
import { apiRequest, delay, USE_MOCKS } from "./api";

export const certificatesService = {
  list(): Promise<Certificate[]> {
    if (USE_MOCKS) return delay(mockCertificates);
    return apiRequest<Certificate[]>("/certificates");
  },

  getById(id: string): Promise<Certificate> {
    if (USE_MOCKS) {
      const cert = mockCertificates.find((c) => c.id === id);
      if (!cert) return Promise.reject(new Error("Certificado não encontrado."));
      return delay(cert);
    }
    return apiRequest<Certificate>(`/certificates/${id}`);
  },
};
