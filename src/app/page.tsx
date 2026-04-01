import { prisma } from "@/lib/prisma";
import { seedDatabase } from "@/lib/seed";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Auto-seed on first load
  await seedDatabase();

  const [about, projects, experiences] = await Promise.all([
    prisma.about.findFirst(),
    prisma.project.findMany({
      orderBy: [{ featured: "desc" }, { order: "asc" }],
    }),
    prisma.experience.findMany({
      orderBy: { order: "asc" },
    }),
  ]);

  return (
    <main>
      <Navbar />
      <HeroSection about={about} />
      <AboutSection about={about} />
      <ProjectsSection projects={projects} />
      <ExperienceSection experiences={experiences} />
      <ContactSection about={about} />
    </main>
  );
}
