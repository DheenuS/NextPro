import ProjectCard from "@/app/components/Card";
import projects from "../../../api/projects.json";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectDetails({ params }: Props) {
  const { id } = await params;

  const projectId = Number(id);

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return <h1>Project not found</h1>;
  }

  return (
    <div className="flex flex-col items-center justify-center py-4 w-full">
      <ProjectCard project={project} />
      <Link href="/projects">
        <Button className="w-full mt-10 cursor-pointer">
          Back to Projects
        </Button>
      </Link>
    </div>
  );
}
