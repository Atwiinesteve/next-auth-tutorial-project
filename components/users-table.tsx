import prisma from "@/lib/prisma.db";
import { SearchInputWithData } from "./search-input";

// Mock data for demonstration

export async function UsersTable() {
  const users = await prisma.user.findMany()
  return (
    <>
      <SearchInputWithData users={users} />
    </>
  );
}
