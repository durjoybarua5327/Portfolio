"use client";

import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { Project } from "@/types";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface ProjectsProps {
    projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
    return (
        <Section id="projects">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Featured Projects</h2>

            {projects.length === 0 ? (
                <p className="text-muted-foreground">Loading projects...</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id || index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-card rounded-xl overflow-hidden border border-white/10 flex flex-col hover:border-primary/50 transition-colors shadow-lg"
                        >
                            <div className="h-48 bg-gray-800 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                                <div className="absolute inset-0 flex items-center justify-center text-gray-600 z-0">
                                    {/* Image would go here */}
                                    [Project Preview]
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col relative z-20">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                                <p className="text-muted-foreground text-sm mb-6 flex-1 line-clamp-3">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md border border-primary/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-3 mt-auto">
                                    {project.repo_url && (
                                        <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="flex-1">
                                            <Button variant="outline" size="sm" className="w-full gap-2">
                                                <Github size={16} /> Code
                                            </Button>
                                        </a>
                                    )}
                                    {project.demo_url && (
                                        <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="flex-1">
                                            <Button size="sm" className="w-full gap-2">
                                                <ExternalLink size={16} /> Live
                                            </Button>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </Section>
    );
}
