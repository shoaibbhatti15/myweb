import { useState } from "react";
import { AuthForm } from "@/components/AuthForm";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const Index = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md space-y-6">
        <Header />
        
        <div className="flex gap-4">
          <Button
            variant={mode === "login" ? "default" : "outline"}
            onClick={() => setMode("login")}
            className="flex-1"
          >
            Login
          </Button>
          <Button
            variant={mode === "signup" ? "default" : "outline"}
            onClick={() => setMode("signup")}
            className="flex-1"
          >
            Sign Up
          </Button>
        </div>

        <AuthForm mode={mode} />
      </div>
    </div>
  );
};

export default Index;