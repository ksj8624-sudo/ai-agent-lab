import "./AgentRequestStatus.css";

type AgentRequestStatusProps = {
  isLoading: boolean;
  result: string;
  error: string | null;
  resultTitle?: string;
};

function AgentRequestStatus({
  isLoading,
  result,
  error,
  resultTitle = "결과",
}: AgentRequestStatusProps) {
  return (
    <div className="agent-request-status">
      {isLoading && <p className="agent-status-loading">요청중....</p>}

      {result && (
        <section className="agent-status-result">
          <h3>{resultTitle}</h3>
          <pre>{result}</pre>
        </section>
      )}

      {error && <p className="agent-status-error">{error}</p>}
    </div>
  );
}

export default AgentRequestStatus;
