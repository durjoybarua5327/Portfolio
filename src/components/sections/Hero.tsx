"use client";

import React from "react";

import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Twitter } from "lucide-react";

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

                    <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs sm:text-sm font-medium text-primary-foreground/80 text-white">
                            {hero.role_text || "Software Developer • Web & Mobile Specialist"}
                        </span>
                    </div>

                    <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl 3xl:text-7xl 4xl:text-8xl font-bold tracking-tight mb-4 leading-tight break-words animate-fade-in-up [animation-delay:100ms]">
                        {hero.headline_prefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{hero.headline_highlight}</span> {hero.headline_suffix}
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg 3xl:text-xl 4xl:text-2xl text-muted-foreground mb-8 max-w-xl 3xl:max-w-2xl 4xl:max-w-3xl leading-relaxed animate-fade-in-up [animation-delay:200ms]">
                        {hero.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto animate-fade-in-up [animation-delay:300ms]">
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
                    </div>

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
                    className="relative mx-auto md:ml-auto w-full max-w-lg 3xl:max-w-xl 4xl:max-w-2xl h-[300px] sm:h-[400px] md:h-[450px] lg:h-[600px] 3xl:h-[700px] 4xl:h-[800px] order-1 md:order-2"
                >
                    {/* Glowing Card Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl -z-10 transform translate-y-4" />

                    <div className="relative h-full w-full rounded-3xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 group">
                        {/* 3D Character Container - Deferred Loading */}
                        <DeferredSpline />
                    </div>
                </motion.div>
            </div>

        </Section>
    );
}

/**
 * Deferred loading of the Spline iframe to improve TBT and LCP.
 * Loads 1 second after component mount to ensure main thread is free.
 */
function DeferredSpline() {
    const [shouldLoad, setShouldLoad] = React.useState(false);

    React.useEffect(() => {
        // Delay heavy 3D loading by 1.5s to give the main thread time to breathe
        const timer = setTimeout(() => setShouldLoad(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (!shouldLoad) {
        return (
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                    <span className="text-white/50 text-sm font-medium">Initializing 3D Experience...</span>
                </div>
            </div>
        );
    }

    return (
        <iframe
            src='https://my.spline.design/genkubgreetingrobot-iK04YtppWNdQZkB3OJUGbYO6/'
            frameBorder='0'
            width='100%'
            height='100%'
            className="w-full h-full pointer-events-auto"
            title="3D Robot"
            loading="lazy"
        ></iframe>
    );
}
