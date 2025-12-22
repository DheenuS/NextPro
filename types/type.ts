export interface Technology {
  name: string;
  icon: string;
  description: string;
  website: `https://${string}`;
  creator: string;
  initialRelease: `${number}`;
  category: string;
  language: string;
  features: Feature[];
}

export interface Feature {
  title: string;
  description: string;
}

export interface Project {
  id: number;
  name: string;
  language: string;
  image: string;
}

export interface ProjectButtonProps {
  projectId: number;
  loadingId: number | null;
}

export interface FilterInput {
  placeholder: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export type User = {
  id: string;
  name: string;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
};

export type Courses = {
  userId: number;
  id: number;
  title: string;
  body: string;
  link: string;
  comment_count: 8;
};
