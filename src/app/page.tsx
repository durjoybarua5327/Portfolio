import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import { supabase } from "@/lib/supabase";
import { Project, Skill, Experience as ExperienceType } from "@/types";

export const revalidate = 3600; // Revalidate every hour

async function getData() {
  // Supabase fetch block commented out to prevent "Supabase error" warnings
  // untill you configure your .env keys.
  /*
  try {
    const { data: projects, error: projectsError } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    const { data: skills, error: skillsError } = await supabase.from('skills').select('*');
    const { data: experience, error: expError } = await supabase.from('experience').select('*').order('start_date', { ascending: false });

    // If any error or no connection, throw to catch block
    if (projectsError || skillsError || expError) {
      throw new Error("Supabase error");
    }

    return {
      projects: (projects || []) as Project[],
      skills: (skills || []) as Skill[],
      experience: (experience || []) as ExperienceType[],
    };
  } catch (error) {
    console.warn("Supabase fetch failed or not configured, using mock data.", error);
    */
  return {
    projects: [
      {
        id: '1', title: 'E-Commerce Dashboard', description: 'A comprehensive dashboard for managing online stores with real-time analytics and inventory management.',
        image_url: '', technologies: ['Next.js', 'Tailwind', 'Supabase'], repo_url: 'https://github.com', demo_url: 'https://vercel.com'
      },
      {
        id: '2', title: 'AI Chat Application', description: 'Real-time chat interface powered by OpenAI API with streaming responses and history persistence.',
        image_url: '', technologies: ['React', 'Node.js', 'Socket.io'], repo_url: 'https://github.com', demo_url: 'https://vercel.com'
      },
      {
        id: '3', title: 'Task Management Tool', description: 'A collaborative Kanban-style task management app with real-time updates and team features.',
        image_url: '', technologies: ['Vue', 'Firebase', 'Pinia'], repo_url: 'https://github.com', demo_url: 'https://vercel.com'
      }
    ] as Project[],
    skills: [
      { id: '1', name: 'React', category: 'frontend' },
      { id: '2', name: 'Next.js', category: 'frontend' },
      { id: '3', name: 'TailwindCSS', category: 'frontend' },
      { id: '4', name: 'Framer Motion', category: 'frontend' },
      { id: '5', name: 'Node.js', category: 'backend' },
      { id: '6', name: 'Supabase', category: 'backend' },
      { id: '7', name: 'PostgreSQL', category: 'backend' },
      { id: '8', name: 'Express', category: 'backend' },
      { id: '9', name: 'TypeScript', category: 'other' },
      { id: '10', name: 'JavaScript', category: 'other' },
      { id: '11', name: 'Python', category: 'other' },
      { id: '12', name: 'Git', category: 'tools' },
    ] as Skill[],
    experience: [
      {
        id: '1', role: 'Senior Frontend Engineer', company: 'Tech Corp', start_date: '2023', end_date: null,
        description: 'Leading the frontend team in building scalable web applications. Implemented new design system lowering tech debt by 30%.'
      },
      {
        id: '2', role: 'Full Stack Developer', company: 'Startup Inc', start_date: '2021', end_date: '2023',
        description: 'Developed and maintained multiple client projects using MERN stack. Optimized database queries improving load times by 40%.'
      }
    ] as ExperienceType[]
  };
  // }
}

export default async function Home() {
  const { projects, skills, experience } = await getData();

  return (
    <>
      <Hero />
      <About />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Experience experience={experience} />
      <Contact />
    </>
  );
}
