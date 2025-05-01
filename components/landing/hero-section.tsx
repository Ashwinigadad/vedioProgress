"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlayCircle } from "lucide-react";

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <motion.div 
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Track Real Learning Progress
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Our intelligent video tracking system measures true engagement by only counting unique segments watched.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/courses">
                <Button size="lg" className="px-8">
                  Get Started
                </Button>
              </Link>
              <Link href="/features">
                <Button size="lg" variant="outline" className="px-8">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div 
            className="flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-video overflow-hidden rounded-xl border bg-card p-2 w-full max-w-[600px] shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <PlayCircle className="h-16 w-16 text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1.5 w-full bg-muted overflow-hidden">
                <div className="h-full w-[65%] bg-primary rounded-full">
                  <div className="relative h-full">
                    <div className="absolute inset-0 flex flex-nowrap overflow-hidden">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} 
                          className="h-full w-2 bg-primary-foreground/20 mx-1 rounded-full"
                          style={{ marginLeft: `${i * 10}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}