import { Input } from "@/components/ui/input";
import { FilterInput } from "@/types/type";

const InputTag = ({placeholder, setValue }:FilterInput) => {
  return (
    <div>
      <Input className="w-fit" placeholder={placeholder} onChange={(e) => setValue(e.target.value)}/>
    </div>
  );
};

export default InputTag;
