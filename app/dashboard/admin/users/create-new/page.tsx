"use client";

import { createUserAction } from "@/actions/create-user";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUserSchema } from "@/schemas/auth-schems";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export default function CreateUserForm() {
  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
    },
  });

  const { formState } = form;

  async function onSubmit(values: z.infer<typeof createUserSchema>) {
    const response = await createUserAction(values)
    if(response.success) {
        toast.success(`User created successfully.`)
        redirect(`/dashboard/admin/users`)
    } else {
        toast.error(`User not created.`)
        redirect(`/dasboard/admin/users/create-new`)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Names</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="" {...field} />
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
                <Input placeholder="shadcn" type="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="admin">ADMIN</SelectItem>
                  <SelectItem value="user">USER</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
              type="submit"
              className="w-full"
              disabled={formState.isSubmitting}
            >
              {formState.isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Creating...
                </>
              ) : (
                `Create User`
              )}
            </Button>
      </form>
    </Form>
  );
}
