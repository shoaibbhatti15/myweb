import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Withdraw = () => {
  const [user, setUser] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState("jazzcash");
  const [accountPhone, setAccountPhone] = useState("");
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

  const handleWithdraw = () => {
    if (!user.coins) {
      toast({
        title: "Error",
        description: "You don't have any coins to withdraw",
        variant: "destructive",
      });
      return;
    }

    if (!accountPhone) {
      toast({
        title: "Error",
        description: "Please enter your account phone number",
        variant: "destructive",
      });
      return;
    }

    const withdrawals = JSON.parse(localStorage.getItem("withdrawals") || "[]");
    withdrawals.push({
      userId: user.id,
      userName: user.name,
      amount: user.coins,
      paymentMethod,
      accountPhone,
      status: "pending",
      date: new Date().toISOString(),
    });
    localStorage.setItem("withdrawals", JSON.stringify(withdrawals));

    user.coins = 0;
    localStorage.setItem("user", JSON.stringify(user));
    setUser({ ...user });

    toast({
      title: "Success",
      description: "Withdrawal request submitted successfully!",
    });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="outline" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </Button>

        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Your Balance</h2>
          <p className="text-4xl font-bold text-secondary mb-6">{user.coins || 0} Coins</p>
          
          <div className="space-y-6 max-w-md mx-auto">
            <RadioGroup
              defaultValue="jazzcash"
              onValueChange={setPaymentMethod}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="jazzcash" id="jazzcash" className="peer sr-only" />
                <Label
                  htmlFor="jazzcash"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  JazzCash
                </Label>
              </div>
              <div>
                <RadioGroupItem value="easypaisa" id="easypaisa" className="peer sr-only" />
                <Label
                  htmlFor="easypaisa"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  EasyPaisa
                </Label>
              </div>
            </RadioGroup>

            <Input
              type="tel"
              placeholder="Enter account phone number"
              value={accountPhone}
              onChange={(e) => setAccountPhone(e.target.value)}
              className="text-center"
            />

            <Button
              className="w-full"
              onClick={handleWithdraw}
              disabled={!user.coins || !accountPhone}
            >
              Request Withdrawal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;