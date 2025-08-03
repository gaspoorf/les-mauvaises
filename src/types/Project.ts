export interface Project {
  title: string;
  years: string;
  description: string;
  lastWord: string;
  url: string;
  police_connection: {
    nodes: {
      title: string;
      policeName: string;
    }[];
  };
  colors_connection: {
    nodes: {
      title: string;
      hex: string;
    }[];
  };
  tags: {
    tag: string;
  }[];
  modelUrl?: string | null;
}
