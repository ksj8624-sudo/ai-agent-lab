import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlanPage.css";
import { requestPlan } from "../../api/planApi";
import AgentRequestStatus from "../../components/AgentRequestStatus/AgentRequestStatus";

function PlanPage() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const trimmedTopic = topic.trim();
    if (!trimmedTopic) {
      setError("요청 내용을 입력해 주세요.");
      return;
    }

    setIsLoading(true);
    setResult("");
    setError(null);

    try {
      const response = await requestPlan(trimmedTopic);
      if (response.ok) {
        setResult(response.answer);
      } else {
        setError("요청에 실패했습니다.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "요청에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="plan-page">
      <section className="plan-header">
        <div>
          <h1>Plan 요청</h1>
          <p>계획 주제를 입력하세요.</p>
        </div>
        <button type="button" onClick={() => navigate("/agentList")}>
          목록으로
        </button>
      </section>

      <section className="plan-form">
        <textarea
          className="plan-textarea"
          placeholder="계획 주제를 입력하세요."
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || !topic.trim()}
        >
          {isLoading ? "요청중...." : "프로젝트 계획 요청"}
        </button>
      </section>

      <AgentRequestStatus isLoading={isLoading} result={result} error={error} />
    </main>
  );
}

export default PlanPage;
