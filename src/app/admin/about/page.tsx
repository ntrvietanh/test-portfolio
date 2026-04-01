"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

interface AboutForm {
  name: string;
  title: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  skills: string[];
}

export default function AdminAboutPage() {
  const { status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState<AboutForm>({
    name: "",
    title: "",
    bio: "",
    email: "",
    github: "",
    linkedin: "",
    twitter: "",
    skills: [],
  });
  const [skillInput, setSkillInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/about")
        .then((r) => r.json())
        .then((data) => {
          if (data) {
            setForm({
              name: data.name || "",
              title: data.title || "",
              bio: data.bio || "",
              email: data.email || "",
              github: data.github || "",
              linkedin: data.linkedin || "",
              twitter: data.twitter || "",
              skills: (() => {
                try { return JSON.parse(data.skills); } catch { return []; }
              })(),
            });
          }
          setLoading(false);
        });
    }
  }, [status]);

  async function handleSave() {
    setSaving(true);
    const res = await fetch("/api/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  }

  function addSkill() {
    const s = skillInput.trim();
    if (s && !form.skills.includes(s)) {
      setForm((f) => ({ ...f, skills: [...f.skills, s] }));
      setSkillInput("");
    }
  }

  function removeSkill(skill: string) {
    setForm((f) => ({ ...f, skills: f.skills.filter((s) => s !== skill) }));
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">About Section</h1>
            <p className="text-gray-500 mt-1">Edit your personal information</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving...
              </>
            ) : saved ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Saved!
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-semibold text-gray-800 mb-5">Basic Information</h2>
            <div className="space-y-4">
              {[
                { key: "name", label: "Full Name", placeholder: "Nguyen Van A" },
                { key: "title", label: "Job Title", placeholder: "Full Stack Developer" },
                { key: "email", label: "Email", placeholder: "contact@example.com" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                  <input
                    type="text"
                    value={form[key as keyof AboutForm] as string}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                  rows={4}
                  placeholder="Mô tả bản thân..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-semibold text-gray-800 mb-5">Social Links</h2>
            <div className="space-y-4">
              {[
                { key: "github", label: "GitHub URL", placeholder: "https://github.com/username" },
                { key: "linkedin", label: "LinkedIn URL", placeholder: "https://linkedin.com/in/username" },
                { key: "twitter", label: "Twitter URL", placeholder: "https://twitter.com/username" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                  <input
                    type="url"
                    value={form[key as keyof AboutForm] as string}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm lg:col-span-2">
            <h2 className="font-semibold text-gray-800 mb-5">Skills & Technologies</h2>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill()}
                placeholder="Add a skill (press Enter)"
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm"
              />
              <button
                onClick={addSkill}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {form.skills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1.5 bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1.5 rounded-lg text-sm"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="text-orange-400 hover:text-orange-700 ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
              {form.skills.length === 0 && (
                <p className="text-gray-400 text-sm">No skills added yet.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
