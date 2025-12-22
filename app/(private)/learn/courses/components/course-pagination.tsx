import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

type PageProp = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
} 

export default function CoursePagination({page , setPage, totalPages}:PageProp) {
  return (
    <div className="flex items-center justify-center gap-4 mt-4 p-2">
      <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
        Previous
      </Button>

      <span>
        Page {page} of {totalPages}
      </span>

      <Button
        disabled={page === totalPages}
        onClick={() => setPage((p) => p + 1)}
      >
        Next
      </Button>
    </div>
  );
}
