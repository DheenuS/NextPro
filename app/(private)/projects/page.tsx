"use client";

import projects from "../../api/projects.json";
import ProjectCard from "../../components/Card";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProjectButton from "../../components/Button";
import InputTag from "../../components/Input";
import { Project } from "@/types/type";

const page = () => {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [projectData, setProjectData] = useState<Project[]>(projects);
  const [search, setSearch] = useState<string>("");

  const handleProjectFilter = () => {
    const filterProject =
      search.trim() === ""
        ? projects
        : projectData.filter((data) =>
            data.name.toLowerCase().includes(search.toLowerCase())
          );
    setProjectData(filterProject);
  };

  useEffect(() => {
    handleProjectFilter();
  }, [search]);

  return (
    <div className="flex flex-col items-center justify-center font-sans">
      <section className="space-y-4 py-4">
        <div className="flex items-center justify-between px-4 sm:px-4 md:px-10 space-x-4">
          <Link href="/" className="">
            Go Home
          </Link>
          <InputTag placeholder={"Filter projects here"} setValue={setSearch} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 sm:px-4 md:px-6 lg:px-10">
          {projectData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              footer={
                <Link
                  href={`/projects/${project.id}`}
                  onClick={() => setLoadingId(project.id)}
                  className="mt-auto w-fit"
                >
                  <ProjectButton projectId={project.id} loadingId={loadingId} />
                </Link>
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default page;
