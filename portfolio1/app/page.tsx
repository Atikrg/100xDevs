"use client";

import portfolioData from "./data/portfolio.json";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Github, Linkedin, Twitter, ExternalLink, MapPin, Calendar } from "lucide-react";
import { SiLeetcode, SiCodechef, SiMedium } from "react-icons/si";
import { ModeToggle } from "@/components/mode-toggle";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { TechIcon } from "@/components/tech-icon";
import { GitHubCalendarComponent } from "@/components/github-calendar";

export default function Home() {
  const { hero, about, experience, projects, blogs, education, contact } = portfolioData;

  const [titleIndex, setTitleIndex] = useState(0);
  const titles = hero.titles || [hero.title];

  useEffect(() => {
    if (titles.length > 1) {
      const interval = setInterval(() => {
        setTitleIndex((prev) => (prev + 1) % titles.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [titles]);

  return (
    <div className="min-h-screen bg-transparent font-sans relative">


      {/* Background with Dot Pattern */}
      <div className="fixed inset-0 z-[-1] bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]" />
      </div>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto min-h-screen bg-background/50 backdrop-blur-sm border-x border-border/40 shadow-2xl relative">
        <div className="absolute top-6 right-6 z-50">
          <ModeToggle />
        </div>

        {/* Profile Header */}
        <section className="pt-20 pb-12 px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200"></div>
              <Avatar className="relative h-32 w-32 border-4 border-background">
                <AvatarImage src={hero.image} alt={hero.name} className="object-cover" />
                <AvatarFallback className="text-4xl">{hero.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </motion.div>

            <div className="flex-1 space-y-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                  {hero.name}
                </h1>

                {/* Animated Title */}
                <div className="h-8 md:h-9 relative overflow-hidden mt-2">
                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={titleIndex}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-xl md:text-2xl text-muted-foreground font-light absolute top-0 left-0 right-0 md:left-auto md:right-auto w-full md:w-auto"
                    >
                      {titles[titleIndex]}
                    </motion.h2>
                  </AnimatePresence>
                </div>

                {hero.location && (
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-sm text-muted-foreground/80">
                    <MapPin className="h-4 w-4" />
                    <span>{hero.location}</span>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex gap-3 justify-center md:justify-start flex-wrap"
              >
                {hero.socials.map((social) => {
                  const Icon =
                    social.platform === "GitHub" ? Github :
                      social.platform === "LinkedIn" ? Linkedin :
                        social.platform === "Twitter" ? Twitter :
                          social.platform === "LeetCode" ? SiLeetcode :
                            social.platform === "CodeChef" ? SiCodechef :
                              social.platform === "Medium" ? SiMedium :
                                ExternalLink;

                  return (
                    <Button key={social.platform} variant="ghost" size="icon" asChild className="hover:bg-foreground/10 hover:scale-110 transition-all">
                      <a href={social.url} target="_blank" rel="noreferrer" title={social.platform}>
                        <Icon className="h-5 w-5" />
                        <span className="sr-only">{social.platform}</span>
                      </a>
                    </Button>
                  )
                })}
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 space-y-4"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent w-fit">
              {about.title}
            </h3>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {about.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-4">
              {hero.skills.map((skill, i) => (
                <Badge key={skill} variant="outline" className="px-3 py-1 text-sm bg-background/50 backdrop-blur-md border-primary/20 hover:border-primary/50 transition-colors">
                  {skill}
                </Badge>
              ))}
            </div>
          </motion.div>
        </section>

        <Separator className="my-6 mx-auto w-10/12 opacity-50" />

        {/* GitHub Contribution Heatmap */}
        {hero.githubUsername && (
          <section className="py-8 px-6 md:px-12">
            <h2 className="text-2xl font-bold mb-8">GitHub Activity</h2>
            <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/20 transition-colors">
              <GitHubCalendarComponent username={hero.githubUsername} />
            </div>
          </section>
        )}

        {/* Experience Section - Timeline Style */}
        <section className="py-8 px-6 md:px-12">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <span className="w-8 h-1 bg-primary rounded-full"></span>
            Experience
          </h2>
          <div className="relative border-l-2 border-primary/20 ml-3 space-y-12">
            {experience.map((exp, index) => (
              <div key={index} className="relative pl-8 md:pl-12">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-4 border-background bg-primary shadow-sm" />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <Badge variant="secondary" className="w-fit mt-1 sm:mt-0 opacity-80">{exp.period}</Badge>
                </div>
                <div className="text-lg text-primary font-medium mb-2">{exp.company}</div>
                <p className="text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-6 mx-auto w-10/12 opacity-50" />

        {/* Projects Section */}
        <section className="py-8 px-6 md:px-12">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <span className="w-8 h-1 bg-primary rounded-full"></span>
            Featured Projects
          </h2>
          <div className="grid gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:shadow-2xl transition-all duration-300"
              >
                <div className="grid md:grid-cols-2 gap-6 p-6">
                  <div className="order-2 md:order-1 space-y-4">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(tech => (
                        <span key={tech} className="text-xs font-mono font-medium text-primary/80 bg-primary/10 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="pt-4">
                      <Button variant="outline" size="sm" asChild className="group/btn">
                        <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                          View Project <ExternalLink className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div className="order-1 md:order-2 overflow-hidden rounded-xl bg-muted relative aspect-video md:aspect-auto">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-background/20 to-transparent pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Latest Articles */}
        <section className="py-8 px-6 md:px-12">
          <h2 className="text-2xl font-bold mb-8">Latest Writings</h2>
          <div className="grid gap-4">
            {blogs && blogs.map((blog, index) => (
              <a
                key={index}
                href={blog.link}
                className="block group p-6 rounded-xl border border-border/40 hover:bg-muted/30 transition-colors"
              >
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{blog.title}</h3>
                  <span className="text-xs text-muted-foreground font-mono">{blog.date}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{blog.description}</p>
              </a>
            ))}
          </div>
        </section>

        <Separator className="my-6 mx-auto w-10/12 opacity-50" />

        {/* Education Section */}
        <section className="py-8 px-6 md:px-12">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <span className="w-8 h-1 bg-primary rounded-full"></span>
            Education
          </h2>
          <div className="relative border-l-2 border-primary/20 ml-3 space-y-12">
            {education && education.map((edu, index) => (
              <div key={index} className="relative pl-8 md:pl-12">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-4 border-background bg-primary shadow-sm" />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <Badge variant="secondary" className="w-fit mt-1 sm:mt-0 opacity-80">{edu.period}</Badge>
                </div>
                <div className="text-lg text-primary font-medium mb-2">{edu.institution}</div>
                <p className="text-muted-foreground leading-relaxed">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="py-12 px-6 text-center bg-gradient-to-b from-transparent to-primary/5">
          <h2 className="text-3xl font-bold mb-4">Let's Build Something Together</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            I'm currently available for freelance work and open source collaborations.
          </p>
          <Button size="lg" className="rounded-full px-8 shadow-lg hover:shadow-primary/25 transition-all hover:-translate-y-1" asChild>
            <a href={contact.bookingUrl} target="_blank" rel="noopener noreferrer">
              <Calendar className="mr-2 h-4 w-4" /> {contact.cta}
            </a>
          </Button>
        </section>
      </div>
    </div>
  );
}
