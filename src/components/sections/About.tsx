"use client";

import Section from "@/components/ui/Section";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
    return (
        <Section id="about" className="!pb-2">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">About Me</h2>
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

                {/* Optional Visual Element for About - could be another image or code snippet */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative h-80 w-full rounded-2xl overflow-hidden glass-card flex items-center justify-center p-1"
                >
                    <div className="relative w-full h-full bg-gray-800/50 rounded-xl overflow-hidden flex items-center justify-center">
                        <div className="text-center p-6">
                            <div className="text-6xl mb-4">💻</div>
                            <p className="text-sm text-gray-400">Coding with passion since 20XX</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}
