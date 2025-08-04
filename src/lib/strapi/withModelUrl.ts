import { Project } from "@/types/Project";
import { modelsMap } from "./modelsMap";

export const attachModelUrl = (projects: Project[]): Project[] => {
  return projects.map((project) => {
    const fileName = modelsMap[project.title];
    return {
      ...project,
      modelUrl: fileName ? `/models/${fileName}` : null,
    };
  });
};
