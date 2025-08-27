import z from "zod";

export const registerSchema = z.object({
  name: z
    .string("name is required")
    .min(3, "Name must be atleast of 3 characters"),
  email: z.string("email is required").email("Invalid email address"),
  password: z
    .string("password is required")
    .min(6, "Password must be atleast of 6 chars"),
});

export type registerInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string("email is required").email("Invalid email address"),
  password: z
    .string("password is required")
    .min(6, "Password must be atleast of 6 chars"),
});
export type loginInput = z.infer<typeof loginSchema>;