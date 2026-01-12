
"use client";

import Section from "@/components/ui/Section";
import { Skill } from "@/types";
import { motion } from "framer-motion";

interface SkillsProps {
    skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
    // Group skills by category
    const categories = {
        Frontend: skills.filter(s => s.category === 'frontend'),
        Backend: skills.filter(s => s.category === 'backend'),
        Languages: skills.filter(s => s.category === 'tools' || s.category === 'other'), // Map tools/other to Languages/Tools for now
    };

    return (
        <Section id="skills" className="bg-secondary/5">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Technical Skills</h2>

            <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
                {Object.entries(categories).map(([category, categorySkills], idx) => (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col items-center"
                    >
                        <h3 className="text-xl font-bold mb-8 text-primary">{category}</h3>

                        <div className="flex flex-wrap justify-center gap-6">
                            {categorySkills.map((skill) => (
                                <div key={skill.id} className="flex flex-col items-center gap-2 group">
                                    <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl p-2 group-hover:bg-primary/20 transition-colors">
                                        {/* Use Simple Icons CDN for logos based on skill name. Lowercase and replace spaces/dots. */}
                                        <img
                                            src={`https://cdn.simpleicons.org/${skill.name.toLowerCase().replace('.', 'dot').replace(' ', '')}`}
                                            alt={skill.name}
                                            className="w-8 h-8 opacity-70 group-hover:opacity-100 transition-opacity filter invert dark:invert-0"
                                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                        />
                                        {/* Fallback if image fails (hidden via onError) could be handled better but keeping simple */}
                                    </div>
                                    <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
}
