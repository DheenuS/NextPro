"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  proSchema,
  ProFormValues,
} from "@/lib/validations/profileFormValidation";
import { PersonalSection } from "./PersonalSection";

const ProfileForm = () => {
  const methods = useForm<ProFormValues>({
    resolver: zodResolver(proSchema),
  });

  const onSubmit = (data: ProFormValues) => {
    console.log(data);
  };

  return (
    /* Form Provider */
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <PersonalSection />
      </form>
    </FormProvider>
  );
};

export default ProfileForm;
