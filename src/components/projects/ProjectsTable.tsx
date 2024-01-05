import React from "react";

type Props = { projects: any[] };

function ProjectsTable({ projects }: Props) {
  return (
    <div>
      <pre>{JSON.stringify(projects, null, 2)}</pre>
    </div>
  );
}

export default ProjectsTable;
