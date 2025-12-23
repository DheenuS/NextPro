import { Skeleton } from "@/components/ui/skeleton";

export default function CourseLoadingSkeleton() {
  return (
    <div className="w-full max-w-full rounded-xl border-2 border-[#222222] py-4 px-4 sm:px-6 space-y-4">
      
      <div className="flex justify-between pt-4 pb-10">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-16" />
      </div>

      <Skeleton className="h-6 w-3/4 mb-6" />

      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      <Skeleton className="h-4 w-40 mt-10" />
    </div>
  );
}
