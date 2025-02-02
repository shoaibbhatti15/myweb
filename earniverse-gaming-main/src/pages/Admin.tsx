import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AdminAuth } from "@/components/admin/AdminAuth";
import { UserTable } from "@/components/admin/UserTable";
import { WithdrawalTable } from "@/components/admin/WithdrawalTable";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const storedWithdrawals = JSON.parse(localStorage.getItem("withdrawals") || "[]");
    setUsers(storedUsers);
    setWithdrawals(storedWithdrawals);
  }, []);

  const handleDeleteUser = (userId: string) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    
    toast({
      title: "Success",
      description: "User deleted successfully!",
    });
  };

  const handleApprove = (index: number) => {
    const updatedWithdrawals = [...withdrawals];
    updatedWithdrawals[index].status = "approved";
    localStorage.setItem("withdrawals", JSON.stringify(updatedWithdrawals));
    setWithdrawals(updatedWithdrawals);
    
    toast({
      title: "Success",
      description: "Withdrawal request approved!",
    });
  };

  if (!isAuthenticated) {
    return (
      <AdminAuth
        onAuthenticate={(authenticated) => {
          setIsAuthenticated(authenticated);
          if (!authenticated) {
            toast({
              title: "Error",
              description: "Invalid password!",
              variant: "destructive",
            });
          }
        }}
      />
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <UserTable users={users} onDeleteUser={handleDeleteUser} />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Withdrawal Requests</h2>
          <WithdrawalTable
            withdrawals={withdrawals}
            onApprove={handleApprove}
          />
        </section>
      </div>
    </div>
  );
};

export default Admin;