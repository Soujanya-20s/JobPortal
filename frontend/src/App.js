
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AppliedJobs from "./pages/ApplicationList";
import HomePage from "./pages/HomePage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  return (
    <Router>
      <AppRoutes
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        userId={userId}
        setUserId={setUserId}
      />
    </Router>
  );
}

function AppRoutes({ isAuthenticated, setIsAuthenticated, userId, setUserId }) {
  const navigate = useNavigate();

  const handleLogin = (id) => {
    setIsAuthenticated(true);
    setUserId(id);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    navigate("/"); 
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">Job Portal</div>

        <div className="navbar-right">
          {!isAuthenticated && (
            <>
              <Link to="/register" className="nav-link register">Register</Link>
              <Link to="/login" className="nav-link login">Login</Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/applied-jobs" className="nav-link">Applied Jobs</Link>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard userId={userId} /> : <Navigate to="/login" />}
        />
        <Route
          path="/applied-jobs"
          element={isAuthenticated ? <AppliedJobs userId={userId} /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
