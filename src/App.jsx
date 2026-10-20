import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import ZoneDetails from "./pages/ZoneDetails";
import DashboardTemplate from "./components/DashboardTemplate";
import MemberManagement from "./pages/MemberManagement";
import AccountManagement from "./pages/AccountManagement";
import LogView from "./pages/LogView";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<DashboardTemplate />}>
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="log_view" element={<LogView />} />

          <Route path="member_vehicles" element={<MemberManagement />} />

          <Route path="account_management" element={<AccountManagement />} />

          <Route path="zone/:zoneId" element={<ZoneDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
