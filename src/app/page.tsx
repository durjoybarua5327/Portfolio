import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import { supabase } from "@/lib/supabase";
import { Project, Skill, Experience as ExperienceType, About as AboutType, HeroData, ContactSettings } from "@/types";

export const revalidate = 0; // Disable cache to ensure realtime updates

async function getData() {
  // Check if Supabase is configured. If not, return mock data immediately to prevent build hangs.
  const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co' &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

  if (!isConfigured) {
    console.log("Supabase not configured (using mock data).");
    throw new Error("MockDataFallback");
  }

  try {
    // Add a timeout to prevent hanging indefinitely during build
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), 5000)
    );

    const dataPromise = Promise.all([
      supabase.from('projects').select('*').order('created_at', { ascending: false }),
      supabase.from('skills').select('*').order('name'),
      supabase.from('experience').select('*').order('start_date', { ascending: false }),
      supabase.from('about').select('*').maybeSingle(),
      supabase.from('hero').select('*').maybeSingle(),
      supabase.from('contact_settings').select('*').maybeSingle()
    ]);

    // Race against the timeout
    const results = await Promise.race([dataPromise, timeoutPromise]) as any;

    // Destructure results safely
    const [projectsRes, skillsRes, experienceRes, aboutRes, heroRes, contactRes] = results;

    // Check for specific errors in essential tables
    if (projectsRes.error && projectsRes.error.code !== 'PGRST116') {
      console.error("Projects Error:", projectsRes.error);
      throw projectsRes.error;
    }
    if (heroRes.error && heroRes.error.code !== 'PGRST116') {
      console.error("Hero Error:", heroRes.error);
      // We don't throw here to allow partial data, but logging is crucial
    }

    // Default About if missing from DB
    const defaultAbout: AboutType = {
      id: '1',
      profile_image_url: '/profile-placeholder.png',
      bio_paragraph_1: 'I am a passionate Full Stack Developer. Please configure this section in the Admin Dashboard.',
      bio_paragraph_2: 'Your bio goes here.',
      years_of_experience: '1+'
    };

    const defaultHero: HeroData = {
      id: '1',
      greeting: 'Hello, I am',
      name: 'Durjoy Barua',
      role_text: 'Software Developer',
      headline_prefix: 'Turning ideas into',
      headline_highlight: 'high-quality digital products',
      headline_suffix: '',
      description: 'Hi, I am a Software Developer specializing in React, React Native, and Flutter.',
    };

    const defaultContact: ContactSettings = {
      id: '1',
      email: 'durjoy@example.com',
      github_url: 'https://github.com',
      linkedin_url: 'https://linkedin.com'
    };

    return {
      projects: (projectsRes.data || []) as Project[],
      skills: (skillsRes.data || []) as Skill[],
      experience: (experienceRes.data || []) as ExperienceType[],
      about: (aboutRes.data || defaultAbout) as AboutType,
      hero: (heroRes.data || defaultHero) as HeroData,
      contact: (contactRes.data || defaultContact) as ContactSettings,
    };
  } catch (error) {
    console.warn("Supabase fetch failed or not configured, using mock data.", error);

    // Fallback Mock Data
    return {
      about: {
        id: '1',
        profile_image_url: '/profile-placeholder.png',
        bio_paragraph_1: 'I am a passionate Full Stack Developer with a strong focus on building scalable web applications. My journey began with a curiosity for how things work on the internet, which quickly turned into a career crafting beautiful digital experiences.',
        bio_paragraph_2: 'I specialize in Next.js, React, and Node.js ecosystems. I love solving complex problems and turning ideas into reality through clean and efficient code.',
        years_of_experience: '3+'
      } as AboutType,
      hero: {
        id: '1',
        greeting: 'Hello (USING MOCK DATA - CHECK DB)', // Visual Error Indicator
        name: 'Durjoy Barua',
        role_text: 'Software Developer',
        headline_prefix: 'Crafting',
        headline_highlight: 'digital',
        headline_suffix: 'experiences with precision.',
        description: 'If you see this, the app failed to connect to Supabase.'
      } as HeroData,
      contact: {
        id: '1', email: 'mock@example.com'
      } as ContactSettings,
      projects: [
        {
          id: '1', title: 'E-Commerce Dashboard', description: 'A comprehensive dashboard for managing online stores with real-time analytics and inventory management.',
          image_url: '', technologies: ['Next.js', 'Tailwind', 'Supabase'], repo_url: 'https://github.com', demo_url: 'https://vercel.com'
        },
        {
          id: '2', title: 'AI Chat Application', description: 'Real-time chat interface powered by OpenAI API with streaming responses and history persistence.',
          image_url: '', technologies: ['React', 'Node.js', 'Socket.io'], repo_url: 'https://github.com', demo_url: 'https://vercel.com'
        },
      ] as Project[],
      skills: [
        { id: '1', name: 'React', category: 'frontend' },
        { id: '2', name: 'Next.js', category: 'frontend' },
        { id: '3', name: 'TailwindCSS', category: 'frontend' },
        { id: '4', name: 'Node.js', category: 'backend' },
        { id: '5', name: 'Supabase', category: 'backend' },
        { id: '6', name: 'PostgreSQL', category: 'backend' },
        { id: '7', name: 'TypeScript', category: 'other' },
        { id: '8', name: 'Git', category: 'tools' },
      ] as Skill[],
      experience: [
        {
          id: '1', role: 'Full Stack Developer', company: 'Tech Inc', start_date: '2022', end_date: null,
          description: 'Developing scalable web applications.'
        }
      ] as ExperienceType[]
    };
  }
}

export default async function Home() {
  const { about, projects, skills, experience, hero, contact } = await getData();

  return (
    <>
      <Hero hero={hero} contact={contact} />
      <About about={about} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Experience experience={experience} />
      <Contact contact={contact} />
    </>
  );
}
