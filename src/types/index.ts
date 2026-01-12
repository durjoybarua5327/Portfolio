export interface Project {
    id: string;
    title: string;
    description: string;
    image_url: string; /* snake_case for supabase match likely */
    technologies: string[];
    demo_url?: string;
    repo_url?: string;
}

export interface Experience {
    id: string;
    role: string;
    company: string;
    start_date: string;
    end_date: string | null; /* null for present */
    description: string;
}

export interface Skill {
    id: string;
    name: string;
    category: "frontend" | "backend" | "tools" | "other";
    level?: number; // Optional proficiency level (0-100)
}
