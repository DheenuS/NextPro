import { Card, CardContent, CardFooter, CardHeader } from "@comp/ui/card";

import { Courses } from "../../../../../types/type";

export interface CoursesCardProps {
  courses: Courses;
  footer?: React.ReactNode; // This is component composition using slot-based props.
}

const CourseCard = ({ courses }: CoursesCardProps) => {
  return (
    <div>
      <Card className="p-2 sm:p-4 md:p-4 border-2 border-[#222222] rounded-md md:gap-6 max-w-full h-full sm:min-h-fit md:min-h-fit">
        <CardHeader className="flex items-center justify-between w-full p-2">
          <p>Course ID: {courses.userId}</p>
          <p>ID: {courses.userId}</p>
        </CardHeader>
        <CardContent className="p-2">
          <h3 className="line-clamp-2 text-xl font-semibold">
            {courses.title}
          </h3>
          <p className="line-clamp-2 mt-4 text-[#848383]">Link: {courses.body}</p>
        </CardContent>
        <CardFooter className="mt-auto p-2">
          <p className="line-clamp-2">
            Enrolled Peoples: {courses.comment_count}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CourseCard;
