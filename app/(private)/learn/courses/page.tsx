"use client";

import { Courses } from "@/types/type";
import { useEffect, useMemo, useState } from "react";
import CourseCard from "./components/course-card";
import CourseLoadingSkeleton from "./loading";
import InputTag from "@/app/components/Input";
import { FormSelect } from "@/app/components/Forms/FormSelect";
import { useForm } from "react-hook-form";
import {
  filterCourseSchema,
  FilterFormValues,
} from "@/lib/validations/profileFormValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import CoursePagination from "./components/course-pagination";

export default function CoursesAPI() {
  const [courses, setCourses] = useState<Courses[]>([]);

  /* Pagination - data state, page state, page size */
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredCourses, setFilteredCourses] = useState<Courses[]>([]);

  const fetchCourses = async () => {
    try {
      const response = await fetch(
        "https://json-placeholder.mock.beeceptor.com/posts"
      );
      const data: Courses[] = await response.json();
      setCourses(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FilterFormValues>({
    resolver: zodResolver(filterCourseSchema),
    defaultValues: {
      sort: "",
    },
  });

  const onSubmit = (data: FilterFormValues) => {
    console.log(data);
  };

  const sortValue = watch("sort");

  useEffect(() => {
    let result = [...courses];

    if (search) {
      result = result.filter((course) =>
        course.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortValue === "a-z") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortValue === "z-a") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }
    setFilteredCourses(result);
  }, [search, sortValue, courses]);

  const sortTypes = [
    { label: "Ascending", value: "a-z" },
    { label: "Descending", value: "z-a" },
  ];

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const paginatedCourses = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredCourses.slice(start, start + PAGE_SIZE);
  }, [filteredCourses, page]);

  const totalPages = Math.ceil(filteredCourses.length / PAGE_SIZE);

  return (
    <section className="flex flex-col w-full min-h-screen font-sans px-2 sm:px-4 md:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-4 w-full items-center gap-4 pb-4 sm:pb-0">
        <p className="col-span-1 sm:col-span-2 text-4xl font-semibold sm:py-4">
          Courses
        </p>

        <div className="col-span-1 sm:col-span-2 flex flex-wrap sm:flex-nowrap justify-between sm:flex-row sm:justify-end gap-2">
          <InputTag placeholder="Filter courses here" setValue={setSearch} />
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
            <FormSelect
              name="sort"
              control={control}
              errors={errors.sort}
              options={sortTypes}
            />
          </form>
        </div>
      </div>

      <div className="grid min-h-[calc(50vh-200px)] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading &&
          Array.from({ length: 6 }).map((_, idx) => (
            <CourseLoadingSkeleton key={idx} />
          ))}

        {!loading &&
          paginatedCourses.map((course) => (
            <CourseCard key={course.id} courses={course} />
          ))}

        {!loading && paginatedCourses.length === 0 && (
          <div className="col-span-full flex justify-center items-center">
            <p className="text-muted-foreground">No courses found</p>
          </div>
        )}
      </div>

      <div className="mt-auto">
        {totalPages > 1 && (
          <CoursePagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </section>
  );
}
