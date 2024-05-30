import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";

import TasksPage from "./pages/TasksPage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import IndexPage from "./pages/IndexPage";
import DashboardPage from "./pages/DashboardPage";
import OneTimePass from "./components/generic/OneTimePass";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Layout />}>
          <Route path="dashboard" element={<TasksPage />} />
          <Route path="register" element={<RegistrationPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="user/*" element={<ProfilePage />} />
          <Route path="taskdashboard" element={<DashboardPage />} />
          <Route path="otptest" element={<OneTimePass />} />
          <Route index element={<IndexPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
