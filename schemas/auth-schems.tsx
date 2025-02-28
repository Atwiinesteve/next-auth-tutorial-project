import * as z from "zod";

export const loginSchema = z.object({
	email: z
		.string({ message: "Invalide email address." })
		.min(1, { message: "Email is Required" })
		.email({ message: "Invalid email address" }),
	password: z.string().min(6, { message: "Please provide a password." }),
});

export const registerSchema = z
	.object({
		name: z.string().min(6, { message: "Please provide a name." }),
		email: z
			.string({ message: "Invalide email address." })
			.min(1, { message: "Email is Required" })
			.email({ message: "Invalid email address" }),
		password: z.string().min(6, { message: "Please provide a password." }),
		confirm_password: z
			.string()
			.min(6, { message: "Please confirm you password." }),
	})
	.refine((data) => data.password === data.confirm_password, {
		message: "Passwords do not match.",
		path: ["confirm_password"],
	});