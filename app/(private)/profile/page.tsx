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
import { FormInput } from "@/app/components/Forms/FormInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import updateProfile from "@/app/actions/profile.actions";

export default function ProfilePage() {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      role: "",
      department: "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    const result = await updateProfile(data);
    console.log(data);
    console.log(data.department);
    reset();
  };

  return (
    <div className="flex flex-col flex-wrap sm:flex-row text-center min-h-screen -mt-10 items-center justify-center font-sans py-4 gap-6 px-4 sm:px-6 md:px-8">
      <ProfileForm />

      <Card>
        <CardHeader className="text-center">
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Verification</CardDescription>
        </CardHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-left space-y-4 max-w-md"
        >
          <CardContent className="grid gap-6 text-left">
            <div className="font-sans text-md space-y-1">
              <FormSelect
                label="Role"
                name="role"
                control={control}
                errors={errors.role}
                options={roles}
              />
            </div>
            <FormInput
              type="text"
              label="Department"
              placeholder="Enter Department"
              registration={register("department")}
              errors={errors.department}
            />
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => console.log("hello")}
              type="submit"
              className="w-full"
            >
              Save
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
