import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReviewPage.css";
import { requestReview } from "../../api/reviewApi";
import type { ReviewAgentType, ReviewWorkspace } from "../../types/review";
import AgentRequestStatus from "../../components/AgentRequestStatus/AgentRequestStatus";

const AGENT_TYPES: { value: ReviewAgentType; label: string }[] = [
  { value: "cursor", label: "Cursor" },
  { value: "codex", label: "Codex" },
  { value: "claude", label: "Claude" },
];

const WORKSPACES: { value: ReviewWorkspace; label: string }[] = [
  { value: "backend", label: "Backend" },
  { value: "server", label: "Server" },
  { value: "front", label: "Front" },
];

function ReviewPage() {
  const navigate = useNavigate();
  const [agentType, setAgentType] = useState<ReviewAgentType>("cursor");
  const [workspace, setWorkspace] = useState<ReviewWorkspace>("backend");
  const [task, setTask] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const trimmedTask = task.trim();
    if (!trimmedTask) {
      setError("리뷰 요청 내용을 입력해 주세요.");
      return;
    }

    setIsLoading(true);
    setResult("");
    setError(null);

    try {
      const response = await requestReview(agentType, workspace, trimmedTask);
      if (response.ok) {
        setResult(response.answer);
      } else {
        setError("리뷰 요청에 실패했습니다.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "리뷰 요청에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="review-page">
      <section className="review-header">
        <div>
          <h1>Review 요청</h1>
          <p>AI와 Workspace를 선택하고 리뷰 요청 내용을 입력하세요.</p>
        </div>
        <button type="button" onClick={() => navigate("/agentList")}>
          목록으로
        </button>
      </section>

      <section className="review-form">
        <div className="review-form-row">
          <label htmlFor="agentType">AI</label>
          <select
            id="agentType"
            value={agentType}
            onChange={(event) =>
              setAgentType(event.target.value as ReviewAgentType)
            }
          >
            {AGENT_TYPES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="review-form-row">
          <label htmlFor="workspace">Workspace</label>
          <select
            id="workspace"
            value={workspace}
            onChange={(event) =>
              setWorkspace(event.target.value as ReviewWorkspace)
            }
          >
            {WORKSPACES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <textarea
          className="review-textarea"
          placeholder="리뷰 요청 내용을 입력하세요."
          value={task}
          onChange={(event) => setTask(event.target.value)}
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || !task.trim()}
        >
          {isLoading ? "Review 요청중...." : "Review 요청"}
        </button>
      </section>

      <AgentRequestStatus
        isLoading={isLoading}
        result={result}
        error={error}
        resultTitle="리뷰 결과"
      />
    </main>
  );
}

export default ReviewPage;
