import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AdminAuthProps {
  onAuthenticate: (isAuthenticated: boolean) => void;
}

export const AdminAuth = ({ onAuthenticate }: AdminAuthProps) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "@qwerty&786") {
      onAuthenticate(true);
    } else {
      onAuthenticate(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-8">
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter admin password"
      />
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
};