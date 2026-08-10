import { BASE_URL } from "./apiClient";
import type { AgentHistory } from "../types/agent";

type AgentHistoryResponse = {
  agentHistories: AgentHistory[];
};

export async function getAgentHistories(): Promise<AgentHistory[]> {
  const response = await fetch(`${BASE_URL}/dev/agent/history`);

  if (!response.ok) {
    throw new Error(`Agent 이력 조회 실패: ${response.status}`);
  }

  const data: AgentHistoryResponse = await response.json();

  return data.agentHistories;
}
