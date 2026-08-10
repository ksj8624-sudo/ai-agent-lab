import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/agentList");
  };

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <h1 id="login-title">Private AI Agent</h1>
        <p className="login-subtitle">개인 AI 에이전트 관리 서비스</p>

        <form className="login-form" onSubmit={(event) => event.preventDefault()}>
          <label className="login-field" htmlFor="userId">
            <span>ID</span>
            <input id="userId" name="userId" type="text" placeholder="ID" />
          </label>

          <label className="login-field" htmlFor="password">
            <span>Password</span>
            <input id="password" name="password" type="password" placeholder="Password" />
          </label>

          <button type="button" onClick={handleLogin}>
            로그인
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
