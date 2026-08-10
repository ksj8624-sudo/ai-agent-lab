import { useNavigate } from "react-router-dom";
import "./AgentListPage.css";
import { useEffect, useState } from "react";
import { getAgentHistories } from "../../api/agentApi";
import type { AgentHistory } from "../../types/agent";

function AgentListPage() {
  const navigate = useNavigate();
  const [agentHistories, setAgentHistories] = useState<AgentHistory[]>([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgentHistories = async () => {
      try {
        const histories = await getAgentHistories();
        setAgentHistories(histories);
      } catch (error) {
        console.error(error);
      } finally {
        // setLoading(false);
      }
    };

    fetchAgentHistories();
  }, []);

  return (
    <main className="agent-list-page">
      <section className="agent-list-header">
        <div>
          <h1>Private AI Agent</h1>
          <p>에이전트 실행 이력을 확인합니다.</p>
        </div>

        <div className="agent-list-actions">
          <button type="button" onClick={() => navigate("/review")}>
            Review 요청
          </button>
          <button type="button" onClick={() => navigate("/plan")}>
            Plan 요청
          </button>
        </div>
      </section>

      <section className="agent-card-list">
        {agentHistories.map((history) => (
          <article className="agent-card" key={history.id}>
            <div className="agent-card-header">
              <span className="agent-type">{history.taskType}</span>
              <span className="agent-workspace">{history.workspace}</span>
            </div>

            <p className="agent-task">{history.task}</p>

            <div className="agent-card-footer">
              <span>{history.status}</span>
              <time>{history.created_at}</time>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default AgentListPage;
