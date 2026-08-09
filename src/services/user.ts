import { mockUser } from "@/data/user.mock";
import type { UserProfile } from "@/types";
import { apiRequest, delay, USE_MOCKS } from "./api";

export const userService = {
  getProfile(): Promise<UserProfile> {
    if (USE_MOCKS) return delay(mockUser);
    return apiRequest<UserProfile>("/me");
  },
};
