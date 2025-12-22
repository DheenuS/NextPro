"use client";

import {
  profileSchema,
  ProfileFormValues,
} from "@/lib/validations/profileFormValidation";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSelect } from "@/app/components/Forms/FormSelect";
import roles from "../../api/roles.json";
import { useState } from "react";
import ProfileForm from "@/app/components/Forms/ProfileForm";

export default function ProfilePage() {
  const [adminType, setAdminType] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      role: "",
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log(data);
    setAdminType(data.role);
  };

  return (
    <div className="flex flex-col text-center min-h-screen -mt-20 items-center justify-center font-sans py-4 gap-6 px-4 sm:px-6 md:px-8">
      <ProfileForm />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <div className="space-y-1">
          <FormSelect
            name="role"
            control={control}
            errors={errors.role}
            options={roles}
          />
        </div>

        <Button type="submit">Save</Button>
        <p>{adminType}</p>
      </form>
    </div>
  );
}
