import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const userCount = await prisma.user.count();
  if (userCount > 0) {
    console.log("Database already seeded, skipping.");
    return;
  }

  const hashedPassword = await bcrypt.hash("Ntrvietanh@1991", 10);

  await prisma.user.create({
    data: {
      email: "anhntv91@gmail.com",
      password: hashedPassword,
      name: "Admin",
    },
  });

  await prisma.about.create({
    data: {
      name: "Michael NGUYEN",
      title: "MD @ VTI APAC",
      bio: "As Managing Director of VTI APAC, with over a decade of experience in software outsourcing and cloud services, the focus is on steering strategic growth in the APAC region and beyond. The role involves developing and executing global sales and presales strategies while fostering innovative, client-centric solutions. Collaborating with teams, the mission is to position VTI as a trusted partner for businesses seeking to achieve operational and technological transformation.",
      email: "anhntv91@gmail.com",
      linkedin: "https://www.linkedin.com/in/anhntv",
      skills: JSON.stringify([
        "Strategic Human Resource Planning",
        "Multiple Project Coordination",
        "Software Outsourcing",
        "Cloud Services",
        "Low-code Platforms (OutSystems, Microsoft 365)",
        "Project Management",
        "Solutions Architecture",
        "Business Development",
      ]),
    },
  });

  await prisma.experience.createMany({
    data: [
      { company: "VTI", role: "Managing Director - VTI APAC (Singapore) Branch", startDate: "2023-04", current: true, description: "Build new business market region for Group. Develop and execute the global sales and presales strategy for the APAC region, with a focus on Singapore and expanding to Global markets.", order: 1 },
      { company: "VTI", role: "Division Director", startDate: "2022-04", endDate: "2025-03", current: false, description: "Manage around 50 employees dedicated to serving English-speaking clients, as well as oversee another Outsourcing Division comprising over 120 employees who cater to Japanese-speaking clients.", order: 2 },
      { company: "VTI Cloud", role: "Acting Delivery Manager", startDate: "2022-04", endDate: "2023-10", current: false, description: "Ensure that projects and services are delivered on time, within budget, and meet quality standards. Ensure customer satisfaction with services, and promptly address any issues that arise.", order: 3 },
      { company: "VTI Cloud", role: "Senior Solutions Architect", startDate: "2021-09", endDate: "2022-04", current: false, description: "Designed and architected cloud-based solutions for enterprise clients, providing technical leadership and guidance on cloud adoption strategies.", order: 4 },
      { company: "VTI", role: "Senior Project Manager", startDate: "2020-06", endDate: "2022-04", current: false, description: "Led multiple complex software projects from initiation to delivery, coordinating cross-functional teams and ensuring alignment with business objectives.", order: 5 },
      { company: "FPT Software", role: "Project Manager", startDate: "2017-02", endDate: "2020-06", current: false, description: "Low-code Platform Leader (OutSystems, Microsoft 365). In charge of managing teams in migration project (Migrate IBM Lotus Notes applications to other platforms).", order: 6 },
      { company: "FPT Software", role: "Technical Lead", startDate: "2014-01", endDate: "2020-06", current: false, description: "Led technical teams in designing and implementing enterprise solutions, providing mentorship and technical direction to development staff.", order: 7 },
      { company: "FPT Software", role: "Lotus Notes Developer", startDate: "2013-01", endDate: "2017-02", current: false, description: "Developed and maintained IBM Lotus Notes/Domino applications for enterprise clients, specializing in workflow automation and business process digitalization.", order: 8 },
    ],
  });

  await prisma.certification.createMany({
    data: [
      { name: "Microsoft Certified Professional", issuer: "Microsoft", order: 1 },
      { name: "OutSystems Associate Web Developer", issuer: "OutSystems", order: 2 },
      { name: "IBM Certified Application Developer - Lotus Notes and Domino 8.5", issuer: "IBM", order: 3 },
      { name: "Microsoft Certified Solutions Associate: Office 365", issuer: "Microsoft", order: 4 },
      { name: "Professional Traditional Web Developer", issuer: "APTECH Computer Education", order: 5 },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
