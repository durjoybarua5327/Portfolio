"use client";

import Section from "@/components/ui/Section";
import { Skill } from "@/types";
import { motion } from "framer-motion";

interface SkillsProps {
    skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
    return (
        <Section id="skills" className="bg-secondary/20">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Technical Skills</h2>

            {skills.length === 0 ? (
                <p className="text-muted-foreground">Loading skills...</p>
            ) : (
                <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.1 }}
                            className="glass px-6 py-3 rounded-full text-sm md:text-base font-medium cursor-default hover:bg-primary/20 hover:border-primary/50 transition-colors"
                        >
                            {skill.name}
                        </motion.div>
                    ))}
                </div>
            )}
        </Section>
    );
}
