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

export const PersonalSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProFormValues>();

  return (
    <div>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your profile Information</CardDescription>
        </CardHeader>
          <CardContent className="grid gap-6">
            <FormInput
              label="Profile ID"
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
              Save
            </Button>
          </CardFooter>
      </Card>
    </div>
  );
};
