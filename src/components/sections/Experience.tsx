"use client";

import Section from "@/components/ui/Section";
import { Experience as ExperienceType } from "@/types";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

interface ExperienceProps {
    experience: ExperienceType[];
}

export default function Experience({ experience }: ExperienceProps) {
    return (
        <Section id="experience" className="!pt-1 !min-h-fit !justify-start">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Work Experience
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                    My professional journey and career milestones
                </p>
            </motion.div>

            <div className="max-w-5xl w-full relative mx-auto px-4">
                {/* Vertical line - Elegant Gradient Line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent -translate-x-1/2 md:translate-x-0 hidden md:block" />
                {/* Mobile Line */}
                <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent md:hidden" />

                <div className="space-y-12">
                    {experience.length === 0 ? (
                        <p className="text-center text-muted-foreground w-full">Loading experience...</p>
                    ) : (
                        experience.map((exp, index) => (
                            <motion.div
                                key={exp.id || index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className={`relative flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Card Content */}
                                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-6">
                                    <div className="group relative">
                                        {/* Animated circulating gradient border */}
                                        <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition duration-500 overflow-hidden">
                                            <div
                                                className="absolute inset-0 animate-spin-slow"
                                                style={{
                                                    background: `conic-gradient(from 0deg, transparent 0%, var(--color-primary) 25%, var(--color-accent) 50%, var(--color-primary) 75%, transparent 100%)`,
                                                    animationDuration: '4s'
                                                }}
                                            />
                                        </div>

                                        {/* Masking layer */}
                                        <div className="absolute inset-[1px] bg-background rounded-2xl" />

                                        {/* Main Card Body */}
                                        <div className={`relative glass-card p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 bg-background/50 backdrop-blur-xl z-10 ${index % 2 === 0 ? "md:text-right" : "md:text-left"
                                            }`}>
                                            <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text mb-2">
                                                {exp.role}
                                            </h3>
                                            <h4 className="text-lg font-medium text-primary mb-4 flex items-center gap-2 md:inline-flex">
                                                {/* On mobile, icon is always left. On desktop, depends on text align? Actually flex row handles it nicely if we just let it flow. */}
                                                <span className={`inline-flex items-center gap-2 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                                                    <Briefcase size={16} className="text-accent" />
                                                    {exp.company}
                                                </span>
                                            </h4>

                                            <div className={`flex flex-col gap-1 text-sm text-muted-foreground mb-4 font-mono ${index % 2 === 0 ? "md:items-end" : "md:items-start"}`}>
                                                <span className="flex items-center gap-2">
                                                    <Calendar size={14} />
                                                    {exp.start_date} - {exp.end_date || "Present"}
                                                </span>
                                                {/* If location exists, could add here */}
                                            </div>

                                            <p className="text-muted-foreground/80 leading-relaxed text-sm md:text-base">
                                                {exp.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline Dot - Center Marker */}
                                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-background border-4 border-primary/20 group-hover:border-primary shadow-[0_0_20px_rgba(18,218,195,0.3)] z-20 flex items-center justify-center transition-colors duration-300">
                                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse" />
                                </div>

                                {/* Spacer for the other side on desktop */}
                                <div className="w-full md:w-1/2 hidden md:block" />
                            </motion.div>
                        )))}
                </div>
            </div>
        </Section>
    );
}
