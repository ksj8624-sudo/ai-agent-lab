import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import AgentListPage from "../pages/AgentListPage/AgentListPage";
import ReviewPage from "../pages/ReviewPage/ReviewPage";
import PlanPage from "../pages/PlanPage/PlanPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/agentList" element={<AgentListPage />} />
      <Route path="/review" element={<ReviewPage />} />
      <Route path="/plan" element={<PlanPage />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRouter;
