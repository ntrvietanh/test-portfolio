import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function seedDatabase() {
  const userCount = await prisma.user.count();
  if (userCount > 0) return;

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      email: "admin@portfolio.dev",
      password: hashedPassword,
      name: "Admin",
    },
  });

  await prisma.about.create({
    data: {
      name: "Nguyen Van A",
      title: "Full Stack Developer",
      bio: "Tôi là một lập trình viên đam mê xây dựng các sản phẩm web đẹp và hiệu quả. Với hơn 3 năm kinh nghiệm, tôi chuyên về React, Next.js và Node.js.",
      email: "contact@example.com",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      skills: JSON.stringify([
        "React", "Next.js", "TypeScript", "Node.js",
        "Tailwind CSS", "Prisma", "PostgreSQL", "Docker",
      ]),
    },
  });

  await prisma.project.createMany({
    data: [
      {
        title: "E-Commerce Platform",
        description: "Nền tảng mua sắm trực tuyến với đầy đủ tính năng giỏ hàng, thanh toán.",
        longDesc: "Xây dựng một nền tảng e-commerce hoàn chỉnh với React và Node.js.",
        tags: JSON.stringify(["React", "Node.js", "PostgreSQL", "Stripe"]),
        github: "https://github.com",
        demo: "https://example.com",
        featured: true,
        order: 1,
      },
      {
        title: "Task Management App",
        description: "Ứng dụng quản lý công việc với real-time collaboration.",
        longDesc: "App quản lý task với drag-and-drop, real-time updates qua WebSocket.",
        tags: JSON.stringify(["Next.js", "Socket.io", "MongoDB", "Tailwind"]),
        github: "https://github.com",
        featured: true,
        order: 2,
      },
      {
        title: "AI Chat Interface",
        description: "Giao diện chat tích hợp AI với nhiều model khác nhau.",
        longDesc: "Ứng dụng chat AI hỗ trợ multiple models, lưu lịch sử trò chuyện.",
        tags: JSON.stringify(["React", "TypeScript", "OpenAI API", "Prisma"]),
        demo: "https://example.com",
        featured: false,
        order: 3,
      },
    ],
  });

  await prisma.experience.createMany({
    data: [
      {
        company: "Tech Company A",
        role: "Senior Frontend Developer",
        startDate: "2022-01",
        current: true,
        description: "Phát triển và maintain các ứng dụng React scale lớn.",
        order: 1,
      },
      {
        company: "Startup B",
        role: "Full Stack Developer",
        startDate: "2020-06",
        endDate: "2021-12",
        current: false,
        description: "Xây dựng các MVP cho startup từ backend API đến frontend.",
        order: 2,
      },
    ],
  });

  console.log("Database seeded!");
}
