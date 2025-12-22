import { z } from "zod";

export const profileSchema = z.object({
  role: z.string().min(1, "Role is required"),
});

export const proSchema = z.object({
  profileId: z.string().min(3, "Profile ID must be at least 3 characters"),
  designation: z.string().min(3, "Designation must be at least 3 characters"),
});

export const filterCourseSchema = z.object({
  sort: z.string().min(1)
})


export type ProfileFormValues = z.infer<typeof profileSchema>;
export type ProFormValues = z.infer<typeof proSchema>;
export type FilterFormValues = z.infer<typeof filterCourseSchema>;
