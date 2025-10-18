import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import Login from "@/views/Login";
import Dashboard from "@/views/Dashboard";
import type { JSX } from "react";

function RootRedirect() {
  const isLoggedIn = useAppSelector((s) => s.auth.isLoggedIn);
  return <Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />;
}

function AuthRoute({ children }: { children: JSX.Element }) {
  const isLoggedIn = useAppSelector((s) => s.auth.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function GuestRoute({ children }: { children: JSX.Element }) {
  const isLoggedIn = useAppSelector((s) => s.auth.isLoggedIn);
  return isLoggedIn ? <Navigate to="/dashboard" replace /> : children;
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
