import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import ZoneDetails from "./pages/ZoneDetails";
import DashboardTemplate from "./components/DashboardTemplate";
import MemberManagement from "./pages/MemberManagement";
import AccountManagement from "./pages/AccountManagement";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardTemplate />}>
          <Route index element={<Navigate replace to="/dashboard" />} />

          <Route path="dashboard" element={<Dashboard />} />

          <Route path="member_vehicles" element={<MemberManagement />} />

          <Route path="account_management" element={<AccountManagement />} />

          <Route path="zone/:zoneId" element={<ZoneDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
