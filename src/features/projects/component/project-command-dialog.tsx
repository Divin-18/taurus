"use client";

import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2, GlobeIcon } from "lucide-react";
import type { Doc } from "../../../../convex/_generated/dataModel";

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useProjects } from "../hooks/use-project";

interface ProjectCommandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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

export const ProjectCommandDialog = ({ open, onOpenChange }: ProjectCommandDialogProps) => {
  const router = useRouter();
  const projects = useProjects();

  const handleSelect = (projectId: string) => {
    router.push(`/project/${projectId}`);
    onOpenChange(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search project" />
      <CommandList>
        <CommandEmpty>No project found</CommandEmpty>
        <CommandGroup>
          {projects?.map((project) => (
            <CommandItem
              key={project._id}
              value={`${project.name}-${project._id}`}
              onSelect={() => handleSelect(project._id)}
            >
              {getStatusIcon(project.importStatus)}
              <span>{project.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
