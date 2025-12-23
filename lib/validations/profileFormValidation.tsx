import { z } from "zod";

export const profileSchema = z.object({
  role: z.string().min(1, "Role is required"),
});

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const proSchema = z.object({
  proImage: z
    .custom<FileList>()
    .refine(
      (files) => files instanceof FileList && files?.length === 1,
      "Image is required"
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files[0].type),
      "Only JPEG, JPG and PNG images are allowed"
    )
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "Image size must be less than 2 MB"
    ),
  profileId: z.string().min(2, "Profile ID must be at least 2 characters"),
  designation: z.string().min(3, "Designation must be at least 3 characters"),
});

export const filterCourseSchema = z.object({
  sort: z.string().min(1),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
export type ProFormValues = z.infer<typeof proSchema>;
export type FilterFormValues = z.infer<typeof filterCourseSchema>;
