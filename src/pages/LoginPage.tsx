import React from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/components/auth/AuthContext";

const LoginPage = () => {
  const { login, isAuthenticated, isLoading, error } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-950 p-4">
      <div className="w-full max-w-md">
        <LoginForm onLogin={login} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};

export default LoginPage;
