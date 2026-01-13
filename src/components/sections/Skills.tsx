
"use client";

import Section from "@/components/ui/Section";
import { Skill } from "@/types";
import { motion } from "framer-motion";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

    // Category colors for visual distinction - matching home page vibe
    const categoryColors = {
        'Frontend': 'from-primary to-accent',
        'Backend': 'from-accent to-primary',
        'Languages & Tools': 'from-primary via-accent to-primary',
    };

    const categoryIcons = {
        'Frontend': '🎨',
        'Backend': '⚙️',
        'Languages & Tools': '🛠️',
    };

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const itemWidth = container.children[0]?.clientWidth || 0;
        const gap = 24; // 1.5rem
        const scrollAmount = itemWidth + gap;
        const currentScroll = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (direction === 'left') {
            if (currentScroll <= 10) {
                container.scrollTo({ left: maxScroll, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        } else {
            if (currentScroll >= maxScroll - 10) {
                container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <Section id="skills" className="!pt-15 !pb-20 !min-h-fit !justify-start">

            <div className="px-5">
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

                <div className="relative w-full max-w-6xl mx-auto group/carousel">
                    {/* Navigation Arrows */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 w-10 h-10 rounded-full bg-background/80 border border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 disabled:opacity-50"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 w-10 h-10 rounded-full bg-background/80 border border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 disabled:opacity-50"
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={24} />
                    </button>

                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory [scrollbar-width:none] -mx-4 px-4 scroll-smooth"
                    >
                        {Object.entries(categories).map(([category, categorySkills], idx) => (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15, duration: 0.5 }}
                                className="relative min-w-[100%] md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] snap-start group"
                            >
                                {/* Animated circulating gradient border effect */}
                                <div className="absolute -inset-[2px] rounded-2xl opacity-75 group-hover:opacity-100 blur-sm transition duration-500 overflow-hidden">
                                    <div
                                        className={`absolute inset-0 bg-gradient-conic ${categoryColors[category as keyof typeof categoryColors]} animate-spin-slow`}
                                        style={{
                                            background: `conic-gradient(from 0deg, transparent 0%, var(--color-primary) 25%, var(--color-accent) 50%, var(--color-primary) 75%, transparent 100%)`,
                                            animationDuration: '4s'
                                        }}
                                    />
                                </div>

                                {/* Main card */}
                                <div className="relative glass-card p-4 md:p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                                    {/* Category header */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br ${categoryColors[category as keyof typeof categoryColors]} flex items-center justify-center text-lg md:text-xl shadow-lg flex-shrink-0`}>
                                            {categoryIcons[category as keyof typeof categoryIcons]}
                                        </div>
                                        <h3 className="text-base md:text-lg font-bold text-foreground">{category}</h3>
                                    </div>

                                    {/* Skills grid */}
                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 flex-1">
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
                                                <div className="relative bg-white/5 hover:bg-white/10 rounded-xl p-2 border border-white/5 hover:border-primary/30 transition-all duration-300 cursor-pointer overflow-hidden">
                                                    {/* Hover gradient effect */}
                                                    <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[category as keyof typeof categoryColors]} opacity-0 group-hover/skill:opacity-10 transition-opacity duration-300`} />

                                                    <div className="relative flex flex-col items-center gap-2">
                                                        {/* Icon container */}
                                                        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 rounded-lg group-hover/skill:scale-110 transition-transform duration-300 shadow-lg">
                                                            <img
                                                                src={`https://cdn.simpleicons.org/${skill.name.toLowerCase().replace(/\./g, 'dot').replace(/\s/g, '').replace(/\+/g, 'plus')}`}
                                                                alt={skill.name}
                                                                className="w-5 h-5 opacity-80 group-hover/skill:opacity-100 transition-opacity filter invert dark:invert-0"
                                                                onError={(e) => {
                                                                    const target = e.target as HTMLImageElement;
                                                                    target.style.display = 'none';
                                                                    // Show first letter as fallback
                                                                    const fallback = document.createElement('div');
                                                                    fallback.className = 'text-lg font-bold text-primary';
                                                                    fallback.textContent = skill.name.charAt(0);
                                                                    target.parentElement?.appendChild(fallback);
                                                                }}
                                                            />
                                                        </div>

                                                        {/* Skill name */}
                                                        <span className="text-[10px] md:text-xs font-semibold text-center text-foreground/90 group-hover/skill:text-foreground transition-colors leading-tight">
                                                            {skill.name}
                                                        </span>
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
            </div>
        </Section>
    );
}
