import { FieldError, Control, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormSelectProps = {
  label?: string,
  name: string;
  control: Control<any>;
  errors?: FieldError;
  options: { label: string; value: string }[];
};

export function FormSelect({
  label,
  name,
  control,
  errors,
  options,
}: FormSelectProps) {
  return (
    <div className="grid ">
      <label htmlFor="">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="min-w-full">
              <SelectValue placeholder={`${name}`} />
            </SelectTrigger>
            <SelectContent className="w-40 h-auto">
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors && <p className="text-sm text-red-600">{errors.message}</p>}
    </div>
  );
}
