import z from "zod";
import { makeValidator } from "utils/validation";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string().min(6, "Repeat password must be at least 6 characters long"),
}).superRefine(({ password, confirmPassword }, context) => {
	if (password !== confirmPassword) {
		context.addIssue({
			code: "custom",
			path: ["confirmPassword"],
			message: "Password confirmation must match the password",
		});
	}
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

export const validateLogin = makeValidator(loginSchema, {
  body: true,
});

export const validateRegister = makeValidator(registerSchema, {
  body: true,
});
