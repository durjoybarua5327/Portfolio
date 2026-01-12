"use client";

import Section from "@/components/ui/Section";
import { Experience as ExperienceType } from "@/types";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

interface ExperienceProps {
    experience: ExperienceType[];
}

export default function Experience({ experience }: ExperienceProps) {
    return (
        <Section id="experience" className="bg-secondary/20">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Work Experience</h2>

            <div className="max-w-3xl w-full relative">
                {/* Vertical line */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-[0.5px] hidden md:block" />

                <div className="space-y-12">
                    {experience.length === 0 ? (
                        <p className="text-center text-muted-foreground w-full">Loading experience...</p>
                    ) : (
                        experience.map((exp, index) => (
                            <motion.div
                                key={exp.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                <div className="flex-1">
                                    <div className={`p-6 bg-card border border-white/10 rounded-xl hover:border-primary/30 transition-colors ${index % 2 === 0 ? "md:text-right" : ""
                                        }`}>
                                        <h3 className="text-xl font-bold text-primary mb-1">{exp.role}</h3>
                                        <h4 className="text-lg font-medium mb-4">{exp.company}</h4>
                                        <p className="text-sm text-muted-foreground mb-4 font-mono">
                                            {exp.start_date} - {exp.end_date || "Present"}
                                        </p>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Timeline Dot */}
                                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-4 border-primary shadow-lg shadow-primary/20 hidden md:flex items-center justify-center z-10">
                                    <Briefcase size={14} className="text-primary" />
                                </div>
                            </motion.div>
                        )))}
                </div>
            </div>
        </Section>
    );
}
