import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CandyCrushGame } from "@/components/CandyCrushGame";
import { TaskList } from "@/components/earn/TaskList";

const Earn = () => {
  const navigate = useNavigate();

  const handleTaskComplete = (coins: number) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.id) {
      user.coins = (user.coins || 0) + coins;
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Play & Earn</h3>
            <CandyCrushGame />
          </div>

          <TaskList onTaskComplete={handleTaskComplete} />
        </div>
      </div>
    </div>
  );
};

export default Earn;