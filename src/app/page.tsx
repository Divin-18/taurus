"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const Home = () => {
  const projects = useQuery(api.project.get);
  const createProject = useMutation(api.project.create);
  return (
    <div>
      <button onClick={() => createProject({ name: "Project 1" })}>Create Project</button>
      {projects?.map((project) => (
        <div key={project._id} className="flex flex-col gap-2">
          <h1>{project.name}</h1>
          <p>{project.importStatus ? "Completed" : "Not Completed"}</p>  
        </div>
      ))}
    </div>
  );
};

export default Home;