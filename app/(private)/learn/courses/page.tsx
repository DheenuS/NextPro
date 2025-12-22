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
    // setPage(1);
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
    <section className="w-full font-sans px-2 sm:px-4 md:px-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-4xl font-semibold px-0 py-4 sticky top-18">
          Courses
        </p>
        <div className="flex items-center justify-center gap-2 static right-5">
          <InputTag placeholder={"Filter courses here"} setValue={setSearch} />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 max-w-md"
          >
            <div className="space-y-1">
              <FormSelect
                name="sort"
                control={control}
                errors={errors.sort}
                options={sortTypes}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {!loading
          ? paginatedCourses.map((course) => <CourseCard courses={course} />)
          : Array.from({ length: 6 }).map((_, idx) => (
              <CourseLoadingSkeleton />
            ))}
      </div>
      {totalPages > 1 && (
        <CoursePagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      )}
      {!loading && paginatedCourses.length === 0 && (
        <div className="">
          <p className="text-center text-muted-foreground">No courses found</p>
        </div>
      )}
    </section>
  );
}
