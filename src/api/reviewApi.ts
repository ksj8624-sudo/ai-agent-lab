import { postJson } from "./apiClient";
import type {
  ReviewAgentType,
  ReviewRequest,
  ReviewResponse,
  ReviewWorkspace,
} from "../types/review";

export async function requestReview(
  agentType: ReviewAgentType,
  workspace: ReviewWorkspace,
  task: string,
): Promise<ReviewResponse> {
  const body: ReviewRequest = {
    agentType,
    workspace,
    taskType: "review",
    task,
  };

  return postJson<ReviewResponse>("/dev/agent", body);
}
