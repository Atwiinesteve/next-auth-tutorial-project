"use client";

import { sendEmailVerificationNotification } from "@/actions/checkbox-email-verification";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { toast } from "sonner";

export function EmailVerificationCheckbox({
  userId,
  isVerified,
}: {
  userId: string;
  isVerified: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleVerification = async () => {
    setIsLoading(true);
    try {
      const response = await sendEmailVerificationNotification(userId, !isVerified);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to update email verification status.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Checkbox
      checked={isVerified}
      onCheckedChange={handleToggleVerification}
      disabled={isLoading}
    />
  );
}