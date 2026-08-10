export type PlanRequest = {
  topic: string;
};

export type PlanResponse = {
  ok: boolean;
  topic: string;
  answer: string;
};
