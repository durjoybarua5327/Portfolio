"use client";

import Section from "@/components/ui/Section";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
    return (
        <Section id="about">
            <h2 className="text-3xl md:text-5xl font-bold mb-12">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="prose prose-lg dark:prose-invert"
                >
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        I am a passionate Full Stack Developer with a strong focus on building scalable web applications.
                        My journey began with a curiosity for how things work on the internet, which quickly turned into a career crafting beautiful digital experiences.
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed mt-4">
                        I specialize in Next.js, React, and Node.js ecosystems. I love solving complex problems and turning ideas into reality through clean and efficient code.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative h-80 w-full rounded-2xl overflow-hidden glass-card flex items-center justify-center p-1"
                >
                    <div className="relative w-full h-full bg-gray-800/50 rounded-xl overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                            {/* Replace with <Image /> when available */}
                            <span>[Profile Image]</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}
