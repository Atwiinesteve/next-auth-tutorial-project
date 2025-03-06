"use client";

import { oAuthSignInAction } from "@/actions/oauth.actions";
import { registerUserAction } from "@/actions/signup-user";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/schemas/auth-schems";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { z } from "zod";

export default function RegisterPage() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });
  const { formState } = form;

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    const response = await registerUserAction(values);

    if (response?.success) {
      toast.success(
        "Registration successful. Verification Token sent to your email."
      );
      redirect("/verify-user-token");
    } else {
      toast.error(response?.message);
      redirect("/auth/register");
    }
  }

  async function clickHandler(provider: "google" | "github") {
    await oAuthSignInAction(provider);
  }
  return (
    <>
      {/* Register Container */}
      <div className="w-full max-w-[450px] space-y-6 shadow-lg p-7">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Get started with AuthFlow today
          </p>
        </div>

        {/* Social Register */}
        <div className="flex items-center justify-center gap-3">
          <Button
            onClick={clickHandler.bind(null, "github")}
            type="submit"
            variant="outline"
            className="w-full"
          >
            <FaGithub className="mr-2 h-9 w-9" />
          </Button>

          <Button
            onClick={clickHandler.bind(null, "google")}
            type="submit"
            variant="outline"
            className="w-full"
          >
            <FcGoogle className="mr-2 h-4 w-4" />
          </Button>
        </div>
        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        {/* Register Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      // disabled={isPending}
                      placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      // disabled={isPending}
                      placeholder="name@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={formState.isSubmitting}
            >
              {formState.isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Please wait..
                </>
              ) : (
                `Create Account`
              )}
            </Button>
          </form>
        </Form>
        {/* Sign In Link */}
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-primary hover:text-primary/90 underline"
          >
            Login now.
          </Link>
        </div>
      </div>
    </>
  );
}
