import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type FormInputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  registration: UseFormRegisterReturn;
  errors?: FieldError;
}

export function FormInput({
  label,
  type = "text",
  placeholder,
  registration,
  errors,
}: FormInputProps) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Input type={type} placeholder={placeholder} {...registration} />
      {errors && <p className="text-sm text-red-500">{errors.message}</p>}
    </div>
  );
}
