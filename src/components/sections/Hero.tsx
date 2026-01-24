"use client";

import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Twitter } from "lucide-react";
import Spline from '@splinetool/react-spline';

import { HeroData, ContactSettings } from "@/types";

export default function Hero({ hero, contact }: { hero?: HeroData, contact?: ContactSettings }) {
    if (!hero) return null;

    return (
        <Section id="home" className="pt-4 pb-6 md:pt-20 md:pb-16 overflow-hidden">
            {/* Background Particles/Glow */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-20 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] opacity-20" />
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-20 items-center w-full">

                {/* Left Column: Text */}
                <div className="flex flex-col items-start text-left order-2 md:order-1">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
                    >
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs sm:text-sm font-medium text-primary-foreground/80 text-white">
                            {hero.role_text || "Software Developer • Web & Mobile Specialist"}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-4 leading-tight"
                    >
                        {hero.headline_prefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{hero.headline_highlight}</span> {hero.headline_suffix}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed"
                    >
                        {hero.description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto"
                    >
                        <Button size="lg" className="w-full sm:w-auto h-11" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                            Contact Me <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>

                        {/* Resume Download Button */}
                        {hero.resume_url && (
                            <a
                                href={hero.resume_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto"
                            >
                                <Button variant="ghost" size="lg" className="w-full h-11 gap-2 group">
                                    <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" /> Download CV
                                </Button>
                            </a>
                        )}
                    </motion.div>

                    {/* Socials */}
                    {contact && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 flex gap-6"
                        >
                            {contact.github_url && (
                                <a href={contact.github_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
                                    <Github size={20} />
                                </a>
                            )}
                            {contact.linkedin_url && (
                                <a href={contact.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
                                    <Linkedin size={20} />
                                </a>
                            )}
                            {contact.twitter_url && (
                                <a href={contact.twitter_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
                                    <Twitter size={20} />
                                </a>
                            )}
                        </motion.div>
                    )}
                </div>

                {/* Right Column: Image Card */}
                {/* On mobile, we might want this on top (order-1) or bottom (order-2)? 
                    Usually Hero images are good on top or bottom. 
                    If "keep it in the right side like present exist" means layout order -> Standard is Text then Image.
                    So Left Col = order-1, Right Col = order-2.
                    I added 'order-2 md:order-1' to text above, which puts text BELOW image on mobile?
                    Wait, if I want Text FIRST on mobile, Text should be order-1 (default).
                    If I want Image FIRST on mobile, Image should be order-1.
                    Usually Image First is nice for visual.
                    BUT text is important.
                    Let's stick to Text First (Stacking: Text then Image) which matches "Left Column" logic.
                    User said "keep it in the right side like present exist". on desktop that means proper order.
                */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative mx-auto md:ml-auto w-full max-w-lg h-[300px] sm:h-[400px] md:h-[450px] lg:h-[600px] order-1 md:order-2"
                >
                    {/* Glowing Card Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl -z-10 transfom translate-y-4" />

                    <div className="relative h-full w-full rounded-3xl overflow-hidden bg-transparent group">
                        {/* 3D Character Container */}
                        <div className="absolute inset-0 w-full h-full">
                            <iframe
                                src='https://my.spline.design/genkubgreetingrobot-iK04YtppWNdQZkB3OJUGbYO6/'
                                frameBorder='0'
                                width='100%'
                                height='100%'
                                className="w-full h-full pointer-events-auto"
                                title="3D Robot"
                            ></iframe>
                        </div>
                    </div>
                </motion.div>
            </div>

        </Section>
    );
}
