"use server";

import { profileSchema } from "@/lib/validations/profileFormValidation";

type updateProfile = {
  role: string;
  department: string;
};

/* consider it as sample db variable - for learning purpose */
const db = 'db';

export default async function updateProfile(data: updateProfile) {
  const parsed = profileSchema.safeParse(data);

  if (!parsed.data) return { error: parsed.error };

//   const user = await getUser();

  /* Updating Profile Data */

//   await db.user.update({
//     where: { role: data.role },
//     data: parsed.data,
//   });

  return { success: true };
}
