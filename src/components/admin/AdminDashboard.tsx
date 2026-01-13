"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { LogOut, User, Briefcase, Code, FolderGit2, Plus, Trash2, Save, X, Sparkles, Mail, Layout, Inbox } from 'lucide-react';
import { motion } from 'framer-motion';
import { About, Experience, Project, Skill, HeroData, ContactSettings, Message } from '@/types';
import FileUpload from './FileUpload';
import ImageUpload from './ImageUpload';

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'skills' | 'projects' | 'experience' | 'contact' | 'messages'>('hero');
    const [loading, setLoading] = useState(false);

    // Modal States
    const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);

    // Form States for New Items
    const [newSkill, setNewSkill] = useState<Partial<Skill>>({ category: 'frontend', level: 100 });
    const [newProject, setNewProject] = useState<Partial<Project>>({ technologies: [] });
    const [newExperience, setNewExperience] = useState<Partial<Experience>>({});

    // Data States
    const [hero, setHero] = useState<Partial<HeroData>>({});
    const [about, setAbout] = useState<Partial<About>>({});
    const [skills, setSkills] = useState<Skill[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [experience, setExperience] = useState<Experience[]>([]);
    const [contact, setContact] = useState<Partial<ContactSettings>>({});
    const [messages, setMessages] = useState<Message[]>([]);

    // Fetch Data
    useEffect(() => {
        fetchData();

        // Realtime Subscription
        const channel = supabase
            .channel('any')
            .on('postgres_changes', { event: '*', schema: 'public' }, (payload) => {
                // If the change is in 'messages', we can smartly update the state without full re-fetch
                if (payload.table === 'messages') {
                    if (payload.eventType === 'INSERT') {
                        setMessages((prev) => [payload.new as Message, ...prev]);
                    } else if (payload.eventType === 'DELETE') {
                        setMessages((prev) => prev.filter(msg => msg.id !== payload.old.id));
                    }
                } else {
                    // For other tables, just re-fetch to keep it synced (simplest approach)
                    fetchData();
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const results = await Promise.all([
            supabase.from('hero').select('*').limit(1).single(),
            supabase.from('about').select('*').limit(1).single(),
            supabase.from('skills').select('*').order('category'),
            supabase.from('projects').select('*').order('created_at', { ascending: false }),
            supabase.from('experience').select('*').order('start_date', { ascending: false }),
            supabase.from('contact_settings').select('*').limit(1).single(),
            supabase.from('messages').select('*').order('created_at', { ascending: false }),
        ]);

        if (results[0].data) setHero(results[0].data);
        if (results[1].data) setAbout(results[1].data);
        if (results[2].data) setSkills(results[2].data);
        if (results[3].data) setProjects(results[3].data);
        if (results[4].data) setExperience(results[4].data);
        if (results[5].data) setContact(results[5].data);
        if (results[6].data) setMessages(results[6].data);
        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    // --- Save Handlers ---

    const saveHero = async () => {
        if (!hero) return;
        setLoading(true);

        // Save Hero Data
        const { error: heroError } = await supabase.from('hero').upsert({ ...hero, id: hero.id || '10000000-0000-0000-0000-000000000000' });

        // Also save Social Links to Contact Settings as requested to be in Home
        const { error: contactError } = await supabase.from('contact_settings').upsert({ ...contact, id: contact.id || '10000000-0000-0000-0000-000000000000' });

        if (heroError || contactError) alert('Error saving: ' + (heroError?.message || contactError?.message));
        else alert('Saved successfully');
        setLoading(false);
    };

    const saveContact = async () => {
        if (!contact) return;
        setLoading(true);
        const { error } = await supabase.from('contact_settings').upsert({ ...contact, id: contact.id || '10000000-0000-0000-0000-000000000000' });
        if (error) alert('Error saving: ' + error.message);
        else alert('Saved successfully');
        setLoading(false);
    };

    const saveAbout = async () => {
        if (!about) return;
        setLoading(true);
        const { error } = await supabase.from('about').upsert({ ...about, id: about.id || '20000000-0000-0000-0000-000000000000' });
        if (error) alert('Error saving about: ' + error.message);
        else alert('Saved successfully');
        setLoading(false);
    };

    // --- Create Handlers ---

    const addSkill = async () => {
        if (!newSkill.name || !newSkill.category) return alert("All fields required");
        const { error } = await supabase.from('skills').insert([newSkill]);
        if (error) alert(error.message);
        else {
            setIsSkillModalOpen(false);
            setNewSkill({ category: 'frontend', level: 100 });
            fetchData();
        }
    };

    const addProject = async () => {
        if (!newProject.title || !newProject.description) return alert("Title and Description required");
        const { error } = await supabase.from('projects').insert([newProject]);
        if (error) alert(error.message);
        else {
            setIsProjectModalOpen(false);
            setNewProject({ technologies: [] });
            fetchData();
        }
    };

    const addExperience = async () => {
        if (!newExperience.role || !newExperience.company || !newExperience.start_date) return alert("Required fields missing");
        const { error } = await supabase.from('experience').insert([newExperience]);
        if (error) alert(error.message);
        else {
            setIsExperienceModalOpen(false);
            setNewExperience({});
            fetchData();
        }
    };

    const deleteItem = async (table: string, id: string) => {
        if (!confirm('Are you sure?')) return;
        const { error } = await supabase.from(table).delete().eq('id', id);
        if (error) alert(error.message);
        else fetchData();
    };

    const switchTab = (tab: typeof activeTab) => {
        setIsSkillModalOpen(false);
        setIsProjectModalOpen(false);
        setIsExperienceModalOpen(false);
        setActiveTab(tab);
    };

    return (
        <div className="w-full min-h-screen bg-background text-foreground flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-secondary/30 border-r border-white/5 p-6 flex flex-col">
                <div className="mb-10">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Admin Panel
                    </h1>
                </div>

                <nav className="space-y-2 flex-1">
                    <TabButton icon={Layout} label="Hero / Home" active={activeTab === 'hero'} onClick={() => switchTab('hero')} />
                    <TabButton icon={User} label="About Me" active={activeTab === 'about'} onClick={() => switchTab('about')} />
                    <TabButton icon={Code} label="Skills" active={activeTab === 'skills'} onClick={() => switchTab('skills')} />
                    <TabButton icon={FolderGit2} label="Projects" active={activeTab === 'projects'} onClick={() => switchTab('projects')} />
                    <TabButton icon={Briefcase} label="Experience" active={activeTab === 'experience'} onClick={() => switchTab('experience')} />
                    <TabButton icon={Inbox} label="Messages" active={activeTab === 'messages'} onClick={() => switchTab('messages')} />
                    <TabButton icon={Mail} label="Contact Info" active={activeTab === 'contact'} onClick={() => switchTab('contact')} />
                </nav>

                <div className="pt-6 border-t border-white/5">
                    <button onClick={handleLogout} className="flex items-center gap-3 text-muted-foreground hover:text-red-400 transition-colors w-full px-4 py-2">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 overflow-y-auto h-screen relative">
                <header className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold capitalize">{activeTab.replace('_', ' ')}</h2>
                    {/* Headers for Messages doesn't need 'Add New' */}

                    {activeTab === 'skills' && (
                        <Button size="sm" onClick={() => setIsSkillModalOpen(true)}>
                            <Plus size={16} className="mr-2" /> Add Skill
                        </Button>
                    )}
                    {activeTab === 'projects' && (
                        <Button size="sm" onClick={() => setIsProjectModalOpen(true)}>
                            <Plus size={16} className="mr-2" /> Add Project
                        </Button>
                    )}
                    {activeTab === 'experience' && (
                        <Button size="sm" onClick={() => setIsExperienceModalOpen(true)}>
                            <Plus size={16} className="mr-2" /> Add Experience
                        </Button>
                    )}
                </header>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === 'hero' && (
                            <div className="space-y-8 max-w-2xl">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-primary">Text Content</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormInput label="Greeting" value={hero.greeting || ''} onChange={v => setHero({ ...hero, greeting: v })} />
                                        <FormInput label="Name" value={hero.name || ''} onChange={v => setHero({ ...hero, name: v })} />
                                    </div>
                                    <FormInput label="Role Text" value={hero.role_text || ''} onChange={v => setHero({ ...hero, role_text: v })} />
                                    <div className="grid grid-cols-3 gap-4">
                                        <FormInput label="Headline Pre" value={hero.headline_prefix || ''} onChange={v => setHero({ ...hero, headline_prefix: v })} />
                                        <FormInput label="Highlight" value={hero.headline_highlight || ''} onChange={v => setHero({ ...hero, headline_highlight: v })} />
                                        <FormInput label="Suffix" value={hero.headline_suffix || ''} onChange={v => setHero({ ...hero, headline_suffix: v })} />
                                    </div>
                                    <FormTextarea label="Bio / Description" value={hero.description || ''} onChange={v => setHero({ ...hero, description: v })} />
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-primary">Downloads & Files</h3>
                                    <FileUpload
                                        label="Resume (PDF)"
                                        value={hero.resume_url}
                                        onChange={url => setHero({ ...hero, resume_url: url })}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-primary">Social Profiles</h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        <FormInput label="GitHub URL" value={contact.github_url || ''} onChange={v => setContact({ ...contact, github_url: v })} />
                                        <FormInput label="LinkedIn URL" value={contact.linkedin_url || ''} onChange={v => setContact({ ...contact, linkedin_url: v })} />
                                        <FormInput label="Twitter/X URL" value={contact.twitter_url || ''} onChange={v => setContact({ ...contact, twitter_url: v })} />
                                    </div>
                                </div>

                                <Button onClick={saveHero}><Save size={16} className="mr-2" /> Save All Changes</Button>
                            </div>
                        )}

                        {activeTab === 'about' && (
                            <div className="space-y-6 max-w-2xl">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Profile Image</label>
                                    <ImageUpload
                                        value={about.profile_image_url}
                                        onChange={url => setAbout({ ...about, profile_image_url: url })}
                                    />
                                </div>
                                <FormTextarea label="Bio (Part 1)" value={about.bio_paragraph_1 || ''} onChange={v => setAbout({ ...about, bio_paragraph_1: v })} />
                                <FormTextarea label="Bio (Part 2)" value={about.bio_paragraph_2 || ''} onChange={v => setAbout({ ...about, bio_paragraph_2: v })} />
                                <FormInput label="Years of Experience" value={about.years_of_experience || ''} onChange={v => setAbout({ ...about, years_of_experience: v })} />
                                <Button onClick={saveAbout}><Save size={16} className="mr-2" /> Save Changes</Button>
                            </div>
                        )}

                        {activeTab === 'skills' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {skills.map(skill => (
                                    <div key={skill.id} className="p-4 bg-white/5 border border-white/5 rounded-xl flex justify-between items-center group">
                                        <div>
                                            <p className="font-bold">{skill.name}</p>
                                            <p className="text-xs text-muted-foreground uppercase">{skill.category}</p>
                                        </div>
                                        <button onClick={() => deleteItem('skills', skill.id)} className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'projects' && (
                            <div className="space-y-4">
                                {projects.map(project => (
                                    <div key={project.id} className="p-4 bg-white/5 border border-white/5 rounded-xl flex gap-4 group items-center">
                                        <div className="w-16 h-16 bg-white/10 rounded-lg flex-shrink-0 overflow-hidden">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={project.image_url || '/placeholder.png'} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold">{project.title}</h3>
                                            <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                                            <div className="flex gap-2 mt-1">
                                                {project.demo_url && <span className="text-xs border px-1 rounded border-secondary text-secondary">Demo</span>}
                                                {project.repo_url && <span className="text-xs border px-1 rounded border-white/20">Repo</span>}
                                            </div>
                                        </div>
                                        <button onClick={() => deleteItem('projects', project.id)} className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'experience' && (
                            <div className="space-y-4">
                                {experience.map(exp => (
                                    <div key={exp.id} className="p-4 bg-white/5 border border-white/5 rounded-xl flex justify-between items-center group">
                                        <div>
                                            <h3 className="font-bold">{exp.role}</h3>
                                            <p className="text-sm text-primary">{exp.company}</p>
                                            <p className="text-xs text-muted-foreground">{exp.start_date} - {exp.end_date || 'Present'}</p>
                                            <p className="text-xs text-muted-foreground/50 mt-1 line-clamp-1">{exp.description}</p>
                                        </div>
                                        <button onClick={() => deleteItem('experience', exp.id)} className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'contact' && (
                            <div className="space-y-6 max-w-2xl">
                                <FormInput label="Email Address" value={contact.email || ''} onChange={v => setContact({ ...contact, email: v })} />
                                <FormInput label="Phone Number" value={contact.phone || ''} onChange={v => setContact({ ...contact, phone: v })} />
                                <FormTextarea label="Address / Location" value={contact.address || ''} onChange={v => setContact({ ...contact, address: v })} />
                                <h3 className="text-lg font-bold text-white pt-4">Social Links</h3>
                                <FormInput label="GitHub URL" value={contact.github_url || ''} onChange={v => setContact({ ...contact, github_url: v })} />
                                <FormInput label="LinkedIn URL" value={contact.linkedin_url || ''} onChange={v => setContact({ ...contact, linkedin_url: v })} />
                                <FormInput label="Twitter/X URL" value={contact.twitter_url || ''} onChange={v => setContact({ ...contact, twitter_url: v })} />
                                <Button onClick={saveContact}><Save size={16} className="mr-2" /> Save Changes</Button>
                            </div>
                        )}

                        {activeTab === 'messages' && (
                            <div className="space-y-4">
                                {messages.length === 0 ? (
                                    <p className="text-muted-foreground text-center py-10">No messages yet.</p>
                                ) : (
                                    messages.map(msg => (
                                        <div key={msg.id} className="bg-white/5 border border-white/5 p-6 rounded-xl space-y-3 relative group">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-bold text-lg">{msg.name}</h3>
                                                    <a href={`mailto:${msg.email}`} className="text-sm text-primary hover:underline">{msg.email}</a>
                                                </div>
                                                <span className="text-xs text-muted-foreground">
                                                    {new Date(msg.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-sm text-foreground/80 bg-black/20 p-4 rounded-lg">
                                                {msg.message}
                                            </p>
                                            <button
                                                onClick={() => deleteItem('messages', msg.id)}
                                                className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10 p-2 rounded-lg"
                                                title="Delete Message"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </motion.div>
                )}

                {/* --- Modals --- */}

                {/* Skill Modal */}
                {isSkillModalOpen && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <div className="bg-background border border-white/10 p-6 rounded-2xl w-full max-w-md space-y-4 shadow-2xl">
                            <h3 className="text-xl font-bold">Add New Skill</h3>
                            <FormInput label="Skill Name" value={newSkill.name || ''} onChange={v => setNewSkill({ ...newSkill, name: v })} />
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-muted-foreground">Category</label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary/50"
                                    value={newSkill.category || 'frontend'}
                                    onChange={e => setNewSkill({ ...newSkill, category: e.target.value as 'frontend' | 'backend' | 'tools' | 'languages' | 'other' })}
                                >
                                    <option className="bg-zinc-900 text-white" value="frontend">Frontend</option>
                                    <option className="bg-zinc-900 text-white" value="backend">Backend</option>
                                    <option className="bg-zinc-900 text-white" value="tools">Tools</option>
                                    <option className="bg-zinc-900 text-white" value="languages">Languages</option>
                                    <option className="bg-zinc-900 text-white" value="other">Other</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <Button variant="ghost" onClick={() => setIsSkillModalOpen(false)}>Cancel</Button>
                                <Button onClick={addSkill}>Add Skill</Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Project Modal */}
                {isProjectModalOpen && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <div className="bg-background border border-white/10 p-6 rounded-2xl w-full max-w-lg space-y-4 shadow-2xl h-[80vh] overflow-y-auto">
                            <h3 className="text-xl font-bold">Add New Project</h3>
                            <ImageUpload value={newProject.image_url} onChange={url => setNewProject({ ...newProject, image_url: url })} />
                            <FormInput label="Project Title" value={newProject.title || ''} onChange={v => setNewProject({ ...newProject, title: v })} />
                            <FormTextarea label="Description" value={newProject.description || ''} onChange={v => setNewProject({ ...newProject, description: v })} />
                            <FormInput label="Demo URL" value={newProject.demo_url || ''} onChange={v => setNewProject({ ...newProject, demo_url: v })} />
                            <FormInput label="Repo URL (Optional)" value={newProject.repo_url || ''} onChange={v => setNewProject({ ...newProject, repo_url: v })} />
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-muted-foreground">Technologies (comma separated)</label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary/50"
                                    placeholder="React, Node, etc."
                                    value={newProject.technologies?.join(', ') || ''}
                                    onChange={e => setNewProject({ ...newProject, technologies: e.target.value.split(',').map(s => s.trim()) })}
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <Button variant="ghost" onClick={() => setIsProjectModalOpen(false)}>Cancel</Button>
                                <Button onClick={addProject}>Add Project</Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Experience Modal */}
                {isExperienceModalOpen && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <div className="bg-background border border-white/10 p-6 rounded-2xl w-full max-w-lg space-y-4 shadow-2xl">
                            <h3 className="text-xl font-bold">Add Experience</h3>
                            <FormInput label="Role / Title" value={newExperience.role || ''} onChange={v => setNewExperience({ ...newExperience, role: v })} />
                            <FormInput label="Company / Organization" value={newExperience.company || ''} onChange={v => setNewExperience({ ...newExperience, company: v })} />
                            <div className="grid grid-cols-2 gap-4">
                                <FormInput label="Start Date/Year" value={newExperience.start_date || ''} onChange={v => setNewExperience({ ...newExperience, start_date: v })} />
                                <FormInput label="End Date/Year" value={newExperience.end_date || ''} onChange={v => setNewExperience({ ...newExperience, end_date: v })} />
                            </div>
                            <FormTextarea label="Description" value={newExperience.description || ''} onChange={v => setNewExperience({ ...newExperience, description: v })} />
                            <div className="flex justify-end gap-2 pt-2">
                                <Button variant="ghost" onClick={() => setIsExperienceModalOpen(false)}>Cancel</Button>
                                <Button onClick={addExperience}>Add Experience</Button>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}

function TabButton({ icon: Icon, label, active, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                }`}
        >
            <Icon size={18} />
            <span className="font-medium text-left">{label}</span>
        </button>
    );
}

function FormInput({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) {
    return (
        <div className="space-y-1.5">
            <label className="text-sm font-medium text-muted-foreground">{label}</label>
            <input
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary/50 transition-all text-sm"
            />
        </div>
    );
}

function FormTextarea({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) {
    return (
        <div className="space-y-1.5">
            <label className="text-sm font-medium text-muted-foreground">{label}</label>
            <textarea
                value={value}
                onChange={e => onChange(e.target.value)}
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary/50 transition-all resize-none text-sm"
            />
        </div>
    );
}
