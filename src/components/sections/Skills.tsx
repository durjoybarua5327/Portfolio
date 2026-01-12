
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
        'Languages & Tools': skills.filter(s => s.category === 'tools' || s.category === 'other'),
    };

    // Category colors for visual distinction
    const categoryColors = {
        'Frontend': 'from-cyan-500 to-blue-500',
        'Backend': 'from-emerald-500 to-teal-500',
        'Languages & Tools': 'from-purple-500 to-pink-500',
    };

    const categoryIcons = {
        'Frontend': '🎨',
        'Backend': '⚙️',
        'Languages & Tools': '🛠️',
    };

    return (
        <Section id="skills" className="!pt-12">


            <div className="px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                        Technical Skills
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                        A comprehensive toolkit of modern technologies and frameworks
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
                    {Object.entries(categories).map(([category, categorySkills], idx) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15, duration: 0.5 }}
                            className="group relative"
                        >
                            {/* Gradient border effect */}
                            <div className={`absolute -inset-0.5 bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500`} />

                            {/* Main card */}
                            <div className="relative glass-card p-5 md:p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                                {/* Category header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${categoryColors[category as keyof typeof categoryColors]} flex items-center justify-center text-xl md:text-2xl shadow-lg flex-shrink-0`}>
                                        {categoryIcons[category as keyof typeof categoryIcons]}
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-foreground">{category}</h3>
                                </div>

                                {/* Skills grid */}
                                <div className="grid grid-cols-2 gap-3 flex-1">
                                    {categorySkills.map((skill, skillIdx) => (
                                        <motion.div
                                            key={skill.id}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.15 + skillIdx * 0.05 }}
                                            className="group/skill relative"
                                        >
                                            {/* Skill card */}
                                            <div className="relative bg-white/5 hover:bg-white/10 rounded-xl p-3 border border-white/5 hover:border-primary/30 transition-all duration-300 cursor-pointer overflow-hidden">
                                                {/* Hover gradient effect */}
                                                <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[category as keyof typeof categoryColors]} opacity-0 group-hover/skill:opacity-10 transition-opacity duration-300`} />

                                                <div className="relative flex flex-col items-center gap-2">
                                                    {/* Icon container */}
                                                    <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 rounded-lg group-hover/skill:scale-110 transition-transform duration-300 shadow-lg">
                                                        <img
                                                            src={`https://cdn.simpleicons.org/${skill.name.toLowerCase().replace(/\./g, 'dot').replace(/\s/g, '').replace(/\+/g, 'plus')}`}
                                                            alt={skill.name}
                                                            className="w-7 h-7 opacity-80 group-hover/skill:opacity-100 transition-opacity filter invert dark:invert-0"
                                                            onError={(e) => {
                                                                const target = e.target as HTMLImageElement;
                                                                target.style.display = 'none';
                                                                // Show first letter as fallback
                                                                const fallback = document.createElement('div');
                                                                fallback.className = 'text-xl font-bold text-primary';
                                                                fallback.textContent = skill.name.charAt(0);
                                                                target.parentElement?.appendChild(fallback);
                                                            }}
                                                        />
                                                    </div>

                                                    {/* Skill name */}
                                                    <span className="text-xs font-semibold text-center text-foreground/90 group-hover/skill:text-foreground transition-colors leading-tight">
                                                        {skill.name}
                                                    </span>

                                                    {/* Proficiency indicator (if level exists) */}
                                                    {skill.level && (
                                                        <div className="w-full mt-1">
                                                            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                                                <motion.div
                                                                    initial={{ width: 0 }}
                                                                    whileInView={{ width: `${skill.level}%` }}
                                                                    viewport={{ once: true }}
                                                                    transition={{ delay: idx * 0.15 + skillIdx * 0.05 + 0.3, duration: 0.8 }}
                                                                    className={`h-full bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} rounded-full`}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
