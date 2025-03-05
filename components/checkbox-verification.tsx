"use client";

import { sendEmailVerificationNotification } from "@/actions/checkbox-email-verification";
import { unverifyUserEmail } from "@/actions/unverify-user-email"; // Import the new action
import { useState } from "react";
import { toast } from "sonner";

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
    try {
      if (isChecked) {
        // Unverify the email
        const response = await unverifyUserEmail(userId);
        if (response.success) {
          setIsChecked(false); // Uncheck the checkbox
          toast.info(response.message); // Show success message
        } else {
          toast.error(response.message); // Show error message
        }
      } else {
        // Verify the email
        const response = await sendEmailVerificationNotification(
          userId,
          !isChecked
        );
        if (response.success) {
          setIsChecked(true); // Check the checkbox
          toast.success(response.message); // Show success message
        } else {
          toast.error(response.message); // Show error message
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className={`form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out rounded ${
          isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        checked={isChecked}
        onChange={handleCheckboxChange}
        disabled={isLoading} // Disable if loading
      />
    </div>
  );
}
