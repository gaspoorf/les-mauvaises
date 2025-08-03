import { getProjects } from "@/lib/strapi/getProjects";
import { attachModelUrl } from "@/lib/strapi/withModelUrl";
import HomepageClient from "@/components/HomepageClient";

export default async function Homepage() {
  const projects = attachModelUrl(await getProjects());
  return <HomepageClient projects={projects} />;
}

