import { signIn } from "@/auth";
import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";

export default function GoogleSignUpButton() {
  return (
    <>
      <form
        action={async () => {
          
          await signIn("google");
        }}
      >
        <Button
          type="submit"
          variant="outline"
          className="w-full"
        >
          <FcGoogle className="mr-2 h-4 w-4" />
        </Button>
      </form>
    </>
  );
}
