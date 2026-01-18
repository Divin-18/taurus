import { Spinner } from "@/components/ui/spinner";
import { useProjectsPartial } from "../hooks/use-project";
import { ArrowRight, GlobeIcon, CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import type { Doc } from "../../../../convex/_generated/dataModel";

interface ProjectsListProps {
  onViewAll: () => void;
}

interface ProjectItemProps {
  data: Doc<"projects">;
}

const ProjectItem = ({ data }: ProjectItemProps) => {
  const getStatusIcon = () => {
    switch (data.importStatus) {
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
    <li className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
      <Link
        href={`/project/${data._id}`} // Convex uses `_id`, not `id`
        className="flex items-center gap-3 flex-1 text-gray-800 hover:text-blue-600"
      >
        {getStatusIcon()}
        <span className="font-medium truncate">{data.name}</span>
      </Link>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">
          {data.updatedAt && `${formatDistanceToNow(new Date(data.updatedAt), { addSuffix: true })}`}
        </span>
        <ArrowRight className="h-4 w-4 text-gray-400" />
      </div>
    </li>
  );
};

export const ProjectsList = ({ onViewAll }: ProjectsListProps) => {
  const projects = useProjectsPartial(6);

  if (projects === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Spinner className="size-4 text-ring" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Recent Projects</h2>
          <button
            onClick={onViewAll}
            className="mt-2 sm:mt-0 text-sm text-blue-600 hover:underline"
          >
            View all
          </button>
        </div>

        {projects.length > 0 ? (
          <ul className="space-y-3">
            {projects.map((project) => (
              <ProjectItem key={project._id} data={project} />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-6">No projects found.</p>
        )}
      </div>
    </div>
  );
};