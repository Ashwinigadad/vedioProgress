"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart, BookOpen, Presentation } from "lucide-react";

export function FeatureSection() {
  const features = [
    {
      icon: <Presentation className="h-8 w-8 text-primary" />,
      title: "Unique Viewing Tracking",
      description: "Only count video segments that haven't been seen before, ensuring accurate learning progress."
    },
    {
      icon: <BarChart className="h-8 w-8 text-primary" />,
      title: "Detailed Analytics",
      description: "View your learning patterns and progress with comprehensive analytics and reports."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "Resume Anywhere",
      description: "Seamlessly continue where you left off with automatic position saving."
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Intelligent Video Learning
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform goes beyond simple video completion to track real learning engagement
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  {feature.icon}
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}