"use client";

import { ProjectsList } from "./project-list";
import { useCreateProject, useProjectsPartial } from "../hooks/use-project";
import Link from "next/link";
import { ArrowRight, CheckCircle, XCircle, Loader2, GlobeIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns"; // Removed unused `set` import
import { useState, useEffect } from "react";
import { ProjectCommandDialog } from "./project-command-dialog";

// Helper to generate unique name without external packages
function generateUniqueProjectName(): string {
  return `Project_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

export const ProjectsView = () => {
  const createProject = useCreateProject();
  const projects = useProjectsPartial(1);
  const [project, ...rest] = projects ?? [];

  const [CommandDialog, setCommandDialog] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setCommandDialog((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleCreateNew = () => {
    const projectName = generateUniqueProjectName();
    createProject({ name: projectName });
  };

  const getStatusIcon = (importStatus?: string) => {
    switch (importStatus) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "importing":
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      default:
        return <GlobeIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <>
      <ProjectCommandDialog open={CommandDialog} onOpenChange={setCommandDialog} />
      <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 p-4 gap-8">
        {/* Continue Card */}
        {projects && projects.length > 0 && project && (
          <div className="w-full max-w-2xl">
            <Link
              href={`/project/${project._id}`}
              className="block border border-gray-300 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {getStatusIcon(project.importStatus)}
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm text-gray-500 mb-1">Continue</span>
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {project.name}
                    </h3>
                    {project.updatedAt && (
                      <span className="text-xs text-gray-500 mt-1">
                        {formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true })}
                      </span>
                    )}
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 shrink-0" />
              </div>
            </Link>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          {/* Import Box */}
          <div className="flex-1 border border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer text-center">
            <h2 className="text-lg font-semibold text-gray-800">Import</h2>
          </div>

          {/* New Box - triggers auto-named project creation */}
          <div
            className="flex-1 border border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer text-center"
            onClick={handleCreateNew}
          >
            <h2 className="text-lg font-semibold text-gray-800">New</h2>
          </div>
        </div>

        <div className="w-full max-w-2xl">
          <ProjectsList onViewAll={() => setCommandDialog(true)} />
        </div>
      </div>
    </>
  );
};