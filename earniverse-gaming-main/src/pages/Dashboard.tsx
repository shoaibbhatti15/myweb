import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/");
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleMessageSubmit = () => {
    if (message.trim()) {
      const messages = JSON.parse(localStorage.getItem("adminMessages") || "[]");
      messages.push({
        userId: user.id,
        userName: user.name,
        message,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem("adminMessages", JSON.stringify(messages));
      setMessage("");
      toast({
        title: "Success",
        description: "Message sent to admin successfully!",
      });
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-primary">Welcome, {user.name}!</h1>
          <p className="text-gray-600">ID: {user.id}</p>
          <p className="text-xl font-bold text-secondary mt-2">Coins: {user.coins || 0}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Button
            className="h-32 text-xl"
            onClick={() => navigate("/earn")}
          >
            Earn Coins
          </Button>
          <Button
            className="h-32 text-xl"
            variant="secondary"
            onClick={() => navigate("/withdraw")}
          >
            Withdraw Earnings
          </Button>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Website Creation Services</h2>
          <p className="text-gray-600 mb-4">
            Get your professional website created at affordable prices. Contact admin for details.
          </p>
          <div className="space-y-4">
            <Textarea
              placeholder="Message admin about website creation or advertising..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={handleMessageSubmit}>Send Message</Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Advertisement Space</h2>
          <div className="h-[200px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Advertisement Space Available</p>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Contact admin to advertise here at competitive rates
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;