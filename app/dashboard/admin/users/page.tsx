import { UsersTable } from "@/components/users-table";

export default function UsersPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Registered Users</h1>
      <UsersTable />
    </div>
  );
}