import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .email()
    .min(3, "Username must be atleast 3 characters.")
    .max(30, "Please use short email eg: dheen@gmail.com"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Must include a lowercase letter")
    .regex(/[A-Z]/, "Must include an uppercase letter")
    .regex(/\d/, "Must include a number")
    .regex(/[^A-Za-z0-9]/, "Must include a special character"),
});

export const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be atleast 3 characters."),
    email: z
      .email()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
      .min(3, "Username must be atleast 3 characters.")
      .max(30, "Please use short email eg: dheen@gmail.com"),
    username: z
      .string()
      .min(3, "Username must be atleast 3 characters.")
      .max(20, "Username must not exceeds 20 characters."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Must include a lowercase letter")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/\d/, "Must include a number")
      .regex(/[^A-Za-z0-9]/, "Must include a special character"),
    confirmpassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Must include a lowercase letter")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/\d/, "Must include a number")
      .regex(/[^A-Za-z0-9]/, "Must include a special character"),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

export type LoginFormValue = z.infer<typeof loginSchema>;
export type RegisterFormValue = z.infer<typeof registerSchema>;
