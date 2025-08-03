import { fetchGraphQL } from './fetchGraphql';
import { Project } from '@/types/Project';

interface ProjectsResponse {
  projets: Project[];
}

const PROJECTS_QUERY = /* GraphQL */ `
  query Projects {
    projets {
      title
      years
      description
      lastWord
      url
      police_connection {
        nodes {
          title
          policeName
        }
      }
      colors_connection {
        nodes {
          title
          hex
        }
      }
      tags {
        tag
      }
    }
  }
`;


export async function getProjects(): Promise<Project[]> {
  const data = await fetchGraphQL<ProjectsResponse>(PROJECTS_QUERY);

  return data?.projets ?? [];
}
