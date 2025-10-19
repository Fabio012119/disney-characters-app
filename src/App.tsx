import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "@/views/Login";
import Dashboard from "@/views/Dashboard";
import { RootRedirect, AuthRoute, GuestRoute } from "@/utils/routing";

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
