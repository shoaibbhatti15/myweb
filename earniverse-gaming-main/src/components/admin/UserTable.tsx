import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  coins: number;
  ip: string;
}

interface UserTableProps {
  users: User[];
  onDeleteUser: (userId: string) => void;
}

export const UserTable = ({ users, onDeleteUser }: UserTableProps) => {
  const [deletePassword, setDeletePassword] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDeleteAttempt = (userId: string) => {
    setSelectedUserId(userId);
  };

  const confirmDelete = () => {
    if (deletePassword === "@qwerty&786" && selectedUserId) {
      onDeleteUser(selectedUserId);
      setSelectedUserId(null);
      setDeletePassword("");
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid admin password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Coins</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-mono text-sm">{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.coins}</TableCell>
              <TableCell className="font-mono text-sm">{user.ip}</TableCell>
              <TableCell>
                {selectedUserId === user.id ? (
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      placeholder="Admin password"
                      value={deletePassword}
                      onChange={(e) => setDeletePassword(e.target.value)}
                      className="w-32"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={confirmDelete}
                    >
                      Confirm
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteAttempt(user.id)}
                  >
                    Delete
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};