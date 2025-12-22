import { Card, CardContent, CardFooter, CardHeader } from "@comp/ui/card";
import Image from "next/image";

import { Project } from "../../types/type";

export interface ProjectCardProps {
  project: Project;
  footer?: React.ReactNode; // This is component composition using slot-based props.
}

const ProjectCard = ({ project, footer }: ProjectCardProps) => {
  return (
    <div>
      <Card className="sm:p-4 md:p-6 border-2 border-[#222222] rounded-md flex flex-col gap-2 md:gap-6 w-full h-full sm:min-h-40 md:min-h-70">
        <CardHeader className="flex items-center justify-center w-full p-2 mb-4">
          <Image
            src={project.image}
            height={144}
            width={144}
            alt="project Image"
            className="w-14 h-14 max-w-20 max-h-20"
          />
        </CardHeader>
        <CardContent>
          <h3 className="line-clamp-2">{project.name}</h3>
          <p>Language: {project.language}</p>
        </CardContent>
        {footer && <CardFooter className="mt-auto">{footer}</CardFooter>}
      </Card>
    </div>
  );
};

export default ProjectCard;
