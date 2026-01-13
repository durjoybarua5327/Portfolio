"use client";

import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { Project } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface ProjectsProps {
    projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const itemWidth = container.children[0]?.clientWidth || 0;
        const gap = 24; // 1.5rem (gap-6)
        const scrollAmount = itemWidth + gap;
        const currentScroll = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (direction === 'left') {
            if (currentScroll <= 10) {
                // Circular: Go to end
                container.scrollTo({ left: maxScroll, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        } else {
            if (currentScroll >= maxScroll - 10) {
                // Circular: Go to start
                container.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    if (projects.length === 0) {
        return (
            <Section id="projects">
                <p className="text-muted-foreground">Loading projects...</p>
            </Section>
        );
    }

    return (
        <Section id="projects" className="!pt-1 !pb-6 !min-h-fit !justify-start">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Featured Projects
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                    A showcase of my recent work and creative solutions
                </p>
            </motion.div>

            <div className="relative w-full max-w-5xl mx-auto px-4 group/carousel">
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
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id || index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="relative min-w-[85vw] sm:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] snap-center sm:snap-start group h-full"
                        >

                            {/* Animated circulating gradient border - Reverse Spin with Page Colors */}
                            <div className="absolute -inset-[1px] rounded-2xl opacity-50 group-hover:opacity-100 blur-sm transition duration-500 overflow-hidden">
                                <div
                                    className="absolute inset-0 animate-spin-slow"
                                    style={{
                                        background: `conic-gradient(from 0deg, transparent 0%, var(--color-primary) 25%, var(--color-accent) 50%, var(--color-primary) 75%, transparent 100%)`,
                                        animationDuration: '4s',
                                        animationDirection: 'reverse'
                                    }}
                                />
                            </div>

                            {/* Masking layer to hide spinner behind the card body */}
                            <div className="absolute inset-[1px] bg-background rounded-2xl" />

                            {/* Card Content */}
                            <div className="relative h-full glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col bg-background/50 backdrop-blur-xl z-10">

                                {/* Image / Preview Area */}
                                <div className="relative h-32 sm:h-40 w-full bg-black/5 overflow-hidden group-hover:from-primary/20 group-hover:to-accent/20 transition-colors duration-500">
                                    {project.image_url ? (
                                        <Image
                                            src={project.image_url}
                                            alt={project.title}
                                            fill
                                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground z-0">
                                            <div className="text-center p-4">
                                                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">🚀</div>
                                                <p className="text-[10px] opacity-60 font-medium tracking-wider uppercase">Project Preview</p>
                                            </div>
                                        </div>
                                    )}
                                    {/* Subtle Overlay only on hover */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                </div>

                                {/* Content Body */}
                                <div className="flex flex-col flex-1 p-4">
                                    <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-muted-foreground text-xs leading-relaxed mb-4 flex-1 line-clamp-3">
                                        {project.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-1.5 mb-5">
                                        {project.technologies.slice(0, 4).map((tech) => (
                                            <span
                                                key={tech}
                                                className="text-[10px] px-2 py-0.5 bg-primary/5 text-primary/90 rounded-full border border-primary/10"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 4 && (
                                            <span className="text-[10px] px-2 py-0.5 bg-white/5 text-muted-foreground rounded-full border border-white/10">
                                                +{project.technologies.length - 4}
                                            </span>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 mt-auto">
                                        {project.repo_url && (
                                            <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="flex-1">
                                                <Button variant="outline" size="sm" className="w-full gap-2 text-[10px] font-medium h-8 border-white/10 hover:border-primary/50 hover:bg-primary/5">
                                                    <Github size={12} />
                                                    Github Code
                                                </Button>
                                            </a>
                                        )}
                                        {project.demo_url && (
                                            <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="flex-1">
                                                <Button size="sm" className="w-full gap-2 text-[10px] font-medium h-8 bg-primary/90 hover:bg-primary shadow-lg shadow-primary/20">
                                                    <ExternalLink size={12} />
                                                    Live
                                                </Button>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
