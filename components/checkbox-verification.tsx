"use client";

import { sendEmailVerificationNotification } from "@/actions/checkbox-email-verification";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";

interface EmailVerificationCheckboxProps {
  userId: string;
  isVerified: boolean;
}

export function EmailVerificationCheckbox({
  userId,
  isVerified,
}: EmailVerificationCheckboxProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(isVerified);

  const handleCheckboxChange = async () => {
    setIsLoading(true);
    const response = await sendEmailVerificationNotification(userId);
    if (response.success) {
      setIsChecked(true); // Mark the checkbox as checked
      toast.success(response.message); // Show success message
    } else {
      toast.error(response.message); // Show error message
    }
    setIsLoading(false);
  };

  return (
    <Input
      type="checkbox"
      className="border-2 border-slate-900 bg-white rounded-full peer relative w-4 h-4"
      checked={isChecked}
      onChange={handleCheckboxChange}
      disabled={isLoading || isChecked} // Disable if loading or already checked
    />
  );
}
