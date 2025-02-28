"use client";

import { deleteUser } from "@/actions/delete-user";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

export function DeleteUserButton({ userId }: { userId: string }) {
  const [isDeleting, setIsDeleting] = useState(false); // State for loading
  const [isOpen, setIsOpen] = useState(false); // State for dialog visibility
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true); // Set loading state to true

    try {
      const result = await deleteUser(userId);

      if (result.success) {
        toast.success(result.message);
        router.push("/dashboard/admin/users"); // Use router.push instead of redirect
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("An error occurred while deleting the user.");
    } finally {
      setIsDeleting(false); // Reset loading state
      setIsOpen(false); // Close the dialog
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="rounded-none text-red-500 hover:bg-red-500 hover:text-white"
          variant={"outline"}
        >
          {isDeleting ? (
            <>
              <Loader2 className=" text-red-500 animate-spin mr-2" size={"icon"} />{" "}
              Deleting...
            </>
          ) : (
            <Trash2 />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user
            and remove their data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600"
          >
            {isDeleting ? (
              <>
                <Loader2
                  className="animate-spin"
                  size={"icon"}
                />{" "}
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
