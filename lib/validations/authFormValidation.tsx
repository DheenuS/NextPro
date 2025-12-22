import { z } from "zod";

export const loginSchema = z.object({
  username: z.email().min(3, "Username must be atleast 3 characters."),
  password: z.string().min(3, "Password must be atleast 3 characters."),
});

export const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be atleast 3 characters."),
    email: z
      .email()
      .min(3, "Username must be atleast 3 characters.")
      .max(20, "Please use short email eg: dheen@gmail.com"),
    username: z
      .string()
      .min(3, "Username must be atleast 3 characters.")
      .max(20, "Username must not exceeds 20 characters."),
    password: z
      .string()
      .min(3, "password must be atleast 3 characters.")
      .max(20, "Password is too long. Please use short"),
    confirmpassword: z
      .string()
      .min(3, "password must be atleast 3 characters.")
      .max(20, "Password is too long. Please use short"),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });


export type LoginFormValue = z.infer<typeof loginSchema>;
export type RegisterFormValue = z.infer<typeof registerSchema>;