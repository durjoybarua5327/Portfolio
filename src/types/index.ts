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
    category: "frontend" | "backend" | "tools" | "languages" | "other";
    level?: number; // Optional proficiency level (0-100)
}

export interface About {
    id: string;
    profile_image_url: string;
    bio_paragraph_1: string;
    bio_paragraph_2: string;
    years_of_experience?: string;
}

export interface HeroData {
    id: string;
    greeting: string;
    name: string;
    role_text: string;
    headline_prefix: string;
    headline_highlight: string;
    headline_suffix: string;
    description: string;
    resume_url?: string;
}

export interface ContactSettings {
    id: string;
    email: string;
    phone?: string;
    address?: string;
    github_url?: string;
    linkedin_url?: string;
    twitter_url?: string;
}

export interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    created_at: string;
}
