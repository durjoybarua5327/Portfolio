"use client";

import Section from "@/components/ui/Section";
import { motion } from "framer-motion";
import Image from "next/image";
import { About as AboutType } from "@/types";

interface AboutProps {
    about: AboutType;
}

export default function About({ about }: AboutProps) {
    return (
        <Section id="about" className="!min-h-fit !pt-10 !pb-[5vh] md:!pb-[8vh]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-6"
            >
                <h2 className="text-2xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    About Me
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                    Get to know more about my journey and passion
                </p>
            </motion.div>

            <div className="relative w-full max-w-5xl mx-auto px-4 md:px-0">
                {/* Main Card with Animated Border */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="group relative"
                >
                    {/* Animated circulating gradient border */}
                    <div className="absolute -inset-[2px] rounded-3xl opacity-60 group-hover:opacity-100 blur-sm transition duration-500 overflow-hidden">
                        <div
                            className="absolute inset-0 animate-spin-slow"
                            style={{
                                background: `conic-gradient(from 0deg, transparent 0%, var(--color-primary) 25%, var(--color-accent) 50%, var(--color-primary) 75%, transparent 100%)`,
                                animationDuration: '5s'
                            }}
                        />
                    </div>

                    {/* Main Card */}
                    <div className="relative glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300">
                        <div className="grid md:grid-cols-2 gap-0">
                            {/* Left: Profile Picture */}
                            <div className="relative h-[320px] md:h-auto md:min-h-[400px] bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden group/image">
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />

                                {/* Profile Image Container */}
                                <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8 z-0">
                                    <div className="relative w-[260px] h-[260px] md:w-[320px] md:h-[320px] flex-shrink-0">
                                        {/* Animated glow effect behind image */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-2xl opacity-50 group-hover/image:opacity-70 transition-opacity duration-500" />

                                        {/* Image with border */}
                                        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 group-hover/image:border-white/20 transition-all duration-300 shadow-2xl">
                                            <Image
                                                src={about.profile_image_url}
                                                alt="Profile Picture"
                                                fill
                                                className="object-cover group-hover/image:scale-105 transition-transform duration-500"
                                                priority
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Animated gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 z-5" />
                            </div>

                            {/* Right: Bio Content */}
                            <div className="p-5 md:p-6 flex flex-col justify-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {/* Years of Experience Badge */}
                                    {about.years_of_experience && about.years_of_experience !== '0' && (
                                        <div className="inline-flex items-center gap-2 mb-3">
                                            <div className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
                                                <span className="text-xs md:text-sm font-semibold text-primary">
                                                    {about.years_of_experience}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Bio Paragraph 1 */}
                                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-3">
                                        {about.bio_paragraph_1}
                                    </p>

                                    {/* Bio Paragraph 2 */}
                                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                                        {about.bio_paragraph_2}
                                    </p>

                                    {/* Decorative Element */}
                                    <div className="mt-4 flex gap-2">
                                        <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full" />
                                        <div className="h-1 w-8 bg-gradient-to-r from-accent to-primary rounded-full opacity-60" />
                                        <div className="h-1 w-4 bg-gradient-to-r from-primary to-accent rounded-full opacity-30" />
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}
