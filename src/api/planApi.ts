import { postJson } from "./apiClient";
import type { PlanRequest, PlanResponse } from "../types/plan";

export async function requestPlan(topic: string): Promise<PlanResponse> {
  const body: PlanRequest = { topic };

  return postJson<PlanResponse>("/api/plan", body);
}
