"use client";

import { editUser } from "@/actions/edit-user";
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
import { updateUserSchema } from "@/schemas/auth-schems";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { Loader2 } from "lucide-react";
// import { User } from "next-auth";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useSession } from "next-auth/react";

type iEditUserFormProps = {
	user: User;
};

export function EditUserForm({ user }: iEditUserFormProps) {
	const { data: session, update } = useSession();

	const form = useForm<z.infer<typeof updateUserSchema>>({
		resolver: zodResolver(updateUserSchema),
		defaultValues: {
			id: user.id,
			role: user.role,
			email: user.email,
			name: user.name,
		},
	});

	const onSubmit = async (values: z.infer<typeof updateUserSchema>) => {
		const result = await editUser(values.id, values);
		if (result?.success) {
			if (session?.user) {
				await update({
					...session,
					user: {
						...session?.user,
					},
				});
			}
			toast.success("User updated successfully");
			redirect("/dashboard/admin/users");
		} else {
			toast.error("An error occurred while updating the user.");
			redirect("/dashboard/admin/users");
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<input type="hidden" name="id" defaultValue={user.id} />
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="Enter your name" {...field} />
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
								<Input placeholder="Enter your email" {...field} />
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
				<Button type="submit" disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting ? (
						<>
							<Loader2 className="animate-spin mr-2" /> Updating...
						</>
					) : (
						"Update User"
					)}
				</Button>
			</form>
		</Form>
	);
}
