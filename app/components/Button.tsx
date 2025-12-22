import React from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ProjectButtonProps } from "@/types/type";

const ProjectButton = ({projectId, loadingId}: ProjectButtonProps) => {

  return (
    <div>
      <Button size="lg" className="cursor-pointer">
        {loadingId === projectId ? <Spinner /> : "View"}
      </Button>
    </div>
  );
};

export default ProjectButton;
