import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export const AuthForm = ({ mode }: { mode: "login" | "signup" }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    referralCode: "",
  });
  const [userIp, setUserIp] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Get referral code from URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    if (refCode) {
      setFormData(prev => ({ ...prev, referralCode: refCode }));
    }

    // Fetch user's IP address
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setUserIp(data.ip))
      .catch(error => console.error('Error fetching IP:', error));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup") {
      const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
      
      // Check if IP already exists
      const existingUser = allUsers.find((u: any) => u.ip === userIp);
      if (existingUser) {
        toast({
          title: "Error",
          description: "An account already exists from this device",
          variant: "destructive",
        });
        return;
      }

      // Check referral code and add bonus coins
      let initialCoins = 0;
      if (formData.referralCode) {
        const referrer = allUsers.find((u: any) => u.id === formData.referralCode);
        if (referrer) {
          initialCoins = 50; // Increased bonus coins for using referral
          referrer.coins += 50; // Bonus coins for referrer
          localStorage.setItem("users", JSON.stringify(allUsers));
          toast({
            title: "Referral Bonus!",
            description: "You and your referrer received 50 bonus coins!",
          });
        }
      }

      const newUser = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        coins: initialCoins,
        ip: userIp
      };
      
      const updatedUsers = [...allUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("user", JSON.stringify(newUser));
      window.location.href = "/dashboard";
    } else {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u: any) => 
        u.name === formData.name && 
        u.password === formData.password && 
        u.phone === formData.phone
      );
      
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        toast({
          title: "Success",
          description: "Logged in successfully!",
        });
        window.location.href = "/dashboard";
      } else {
        toast({
          title: "Error",
          description: "Invalid credentials",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <Input
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <Input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
      />
      {mode === "signup" && (
        <>
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            placeholder="Referral Code (Optional - Earn 50 coins!)"
            value={formData.referralCode}
            onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
          />
        </>
      )}
      <Input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <Button type="submit" className="w-full">
        {mode === "signup" ? "Sign Up" : "Login"}
      </Button>
    </form>
  );
};