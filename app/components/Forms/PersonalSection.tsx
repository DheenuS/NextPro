import { Button } from "@/components/ui/button";
import { FormInput } from "./FormInput";
import { useFormContext } from "react-hook-form";
import { ProFormValues } from "@/lib/validations/profileFormValidation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

export const PersonalSection = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ProFormValues>();

  const proImage = watch("proImage");

  // Image Preview
  useEffect(() => {
    if (!proImage || proImage.length === 0) {
      setPreview(null);
      return;
    }

    const file = proImage[0];

    const objectURL = URL.createObjectURL(file);
    setPreview(objectURL);

    return () => URL.revokeObjectURL(objectURL); // cleanup function
  }, [proImage]);

  return (
    <div>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your profile Information</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 text-left">
          <FormInput
            label="Upload Image"
            type="file"
            registration={register("proImage")}
            errors={errors.proImage}
          />
          {preview && (
            <>
              <img
                src={preview}
                alt="Preview"
                className="h-32 w-32 rounded-md object-cover border"
              />
            </>
          )}
          <FormInput
            label="ID"
            placeholder="Enter Profile Id"
            registration={register("profileId")}
            errors={errors.profileId}
          />

          <FormInput
            label="Designation"
            placeholder="Enter Designation"
            registration={register("designation")}
            errors={errors.designation}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" className="mt-6 w-full">
            Add
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
