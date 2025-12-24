import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  proSchema,
  ProFormValues,
} from "@/lib/validations/profileFormValidation";
import { PersonalSection } from "./PersonalSection";
import { useState } from "react";

const ProfileForm = () => {
  // Forcing to clear the DOM reference of the image
  const [formKey, setFormKey] = useState(0);

  const methods = useForm<ProFormValues>({
    resolver: zodResolver(proSchema),
    mode: "onSubmit", // preventing the early validation and it will not make Field Error
  });

  // FormData

  const buildProfileFormData = (data: ProFormValues) => {
    const formData = new FormData();
    if (data.proImage?.[0]) {
      formData.append("proImage", data.proImage[0]);
    }
    formData.append("profileId", data.profileId);
    formData.append("designation", data.designation);
    return formData;
  };

  const onSubmit = async (data: ProFormValues) => {
    const formData = buildProfileFormData(data);

    try {
      const res = await fetch("http:localhost:3000/api/profile", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit form...");
    } catch (err) {
      console.log(err);
    }

    methods.reset({
      proImage: undefined,
      profileId: "",
      designation: "",
    });
    setFormKey((k) => k + 1);
  };

  return (
    /* Form Provider */
    <FormProvider key={formKey} {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <PersonalSection />
      </form>
    </FormProvider>
  );
};

export default ProfileForm;
