"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
    id: string;
    children: ReactNode;
    className?: string;
}

export default function Section({ id, children, className }: SectionProps) {
    return (
        <section
            id={id}
            className={cn(
                "min-h-screen flex flex-col justify-center items-center py-20 px-4 md:px-8 w-full max-w-7xl mx-auto",
                className
            )}
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full"
            >
                {children}
            </motion.div>
        </section>
    );
}
