"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({ projects: 0, experiences: 0 });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      Promise.all([
        fetch("/api/projects").then((r) => r.json()),
        fetch("/api/experiences").then((r) => r.json()),
      ]).then(([projects, experiences]) => {
        setStats({
          projects: Array.isArray(projects) ? projects.length : 0,
          experiences: Array.isArray(experiences) ? experiences.length : 0,
        });
      });
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) return null;

  const cards = [
    {
      label: "Projects",
      value: stats.projects,
      icon: "🖥️",
      href: "/admin/projects",
      color: "bg-orange-50 border-orange-100",
      textColor: "text-orange-600",
    },
    {
      label: "Experiences",
      value: stats.experiences,
      icon: "💼",
      href: "/admin/experience",
      color: "bg-blue-50 border-blue-100",
      textColor: "text-blue-600",
    },
    {
      label: "About Section",
      value: "1",
      icon: "👤",
      href: "/admin/about",
      color: "bg-green-50 border-green-100",
      textColor: "text-green-600",
    },
  ];

  const quickActions = [
    { href: "/admin/projects", label: "Add New Project", icon: "+" },
    { href: "/admin/about", label: "Edit About", icon: "✎" },
    { href: "/admin/experience", label: "Add Experience", icon: "+" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {session.user?.name} 👋
          </h1>
          <p className="text-gray-500 mt-1">Manage your portfolio content</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {cards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className={`${card.color} border rounded-2xl p-6 card-hover block`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{card.icon}</span>
                <svg className={`w-5 h-5 ${card.textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className={`text-3xl font-bold ${card.textColor}`}>{card.value}</div>
              <div className="text-gray-600 text-sm mt-1 font-medium">{card.label}</div>
            </Link>
          ))}
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 px-4 py-3 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-xl text-sm font-medium transition-colors border border-orange-100"
              >
                <span className="w-6 h-6 bg-orange-600 text-white rounded-lg flex items-center justify-center text-xs font-bold">
                  {action.icon}
                </span>
                {action.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mt-5 bg-orange-50 border border-orange-100 rounded-2xl p-5 flex gap-3">
          <div className="text-orange-500 mt-0.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-orange-800">Pro tip</p>
            <p className="text-sm text-orange-600 mt-0.5">
              Changes you make here will be reflected immediately on your portfolio site.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
