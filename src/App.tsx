import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./components/auth/AuthContext";

// Import tempo routes safely
let routes = [];
try {
  routes = require("tempo-routes").default;
} catch (error) {
  console.log("Tempo routes not available, using empty routes");
}

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex h-screen w-full items-center justify-center bg-gray-950">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        }
      >
        <>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            {/* Add more protected routes as needed */}
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" element={<div />} />
            )}
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" &&
            routes.length > 0 &&
            useRoutes(routes)}
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
