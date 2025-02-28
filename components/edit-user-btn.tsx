"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FilePenLine } from "lucide-react";
import { useState } from "react";

interface EditUserButtonProps {
  userId: string;
}

export function EditUserButton({ userId }: EditUserButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ id: string; name: string; email: string; role: string } | null>(
    null
  );

  const fetchUserDetails = async () => {
    try {
      const user = await getUserById(userId);
      if (user) {
        setUser(user);
        setIsOpen(true); // Open the dialog after fetching user details
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={fetchUserDetails}
          className="rounded-none bg-blue-500 hover:bg-blue-600 text-white hover:text-white"
          variant={"outline"}
        >
          <FilePenLine className="text-white mr-2" size={"icon"} /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        {/* {user && <EditUserForm userId={user.id} defaultValues={user} />} */}
      </DialogContent>
    </Dialog>
  );
}