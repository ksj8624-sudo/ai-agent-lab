export type ReviewAgentType = "cursor" | "codex" | "claude";
export type ReviewWorkspace = "backend" | "server" | "front";

export type ReviewRequest = {
  agentType: ReviewAgentType;
  workspace: ReviewWorkspace;
  taskType: "review";
  task: string;
};

export type ReviewResponse = {
  ok: boolean;
  tool: string;
  workspace: string;
  type: string;
  answer: string;
};
