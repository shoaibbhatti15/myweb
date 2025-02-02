import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Withdrawal {
  userId: string;
  amount: number;
  method: string;
  accountNumber: string;
  status: string;
}

interface WithdrawalTableProps {
  withdrawals: Withdrawal[];
  onApprove: (index: number) => void;
}

export const WithdrawalTable = ({ withdrawals, onApprove }: WithdrawalTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Account</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {withdrawals.map((withdrawal, index) => (
            <TableRow key={index}>
              <TableCell>{withdrawal.userId}</TableCell>
              <TableCell>{withdrawal.amount}</TableCell>
              <TableCell>{withdrawal.method}</TableCell>
              <TableCell>{withdrawal.accountNumber}</TableCell>
              <TableCell>{withdrawal.status}</TableCell>
              <TableCell>
                {withdrawal.status === "pending" && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onApprove(index)}
                  >
                    Approve
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