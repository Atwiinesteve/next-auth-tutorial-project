"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FilePenLine, Search, UserPlus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { EmailVerificationCheckbox } from "./checkbox-verification";
import { DeleteUserButton } from "./delete-user-btn";

interface iUser {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  status: string | null;
  password: string | null;
  confirm_password: string | null;
  lastActive: Date;
  createdAt: Date;
  updatedAt: Date;
  role: string;
}

type iUsers = iUser[];

interface SearchInputWithDataProps {
  users: iUsers;
}

export function SearchInputWithData({ users }: SearchInputWithDataProps) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const renderStatusBadge = (status: string | null) => {
    if (!status) return <Badge>Unknown</Badge>;

    switch (status.toLowerCase()) {
      case "active":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>
        );
      case "inactive":
        return <Badge variant="secondary">{status}</Badge>;
      case "pending":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">{status}</Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const renderEmailVerificationStatus = (emailVerified: Date | null) => {
    return emailVerified ? (
      <Badge className="bg-green-500 hover:bg-green-600">Verified</Badge>
    ) : (
      <Badge variant="destructive">Unverified</Badge>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link
          href={"/dashboard/admin/users/create-new"}
          className={buttonVariants()}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Email Verified</TableHead>
              <TableHead align="center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.image ?? ""} alt={user.name} />
                        <AvatarFallback>
                          {user.name.charAt(0)}
                          {user.name.split(" ")[1]?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.role.toUpperCase()}</TableCell>
                  <TableCell>{renderStatusBadge(user.status)}</TableCell>
                  <TableCell>{formatDate(user.lastActive)}</TableCell>
                  <TableCell>
                    {renderEmailVerificationStatus(user.emailVerified)}
                  </TableCell>
                  <TableCell>
                    <EmailVerificationCheckbox
                      userId={user.id}
                      isVerified={!!user.emailVerified} // Pass whether the email is already verified
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      className="rounded-none bg-blue-500 hover:bg-blue-500"
                      variant={"outline"}
                    >
                      <Link href={`/dashboard/admin/users/edit/${user.id}`}>
                        <FilePenLine className="text-white" size={"icon"} />
                      </Link>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <DeleteUserButton userId={user.id} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="text-sm text-muted-foreground">
        Showing {filteredUsers.length} of {users.length} users
      </div>
    </div>
  );
}