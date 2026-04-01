"use client";

interface About {
  name: string;
  title: string;
  bio: string;
  email: string;
  github?: string | null;
  linkedin?: string | null;
}

export default function HeroSection({ about }: { about: About | null }) {
  if (!about) return null;

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-orange-50 via-white to-orange-50 pt-20">
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <div className="fade-in-up">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
            Available for work
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
            Hi, I&apos;m{" "}
            <span className="gradient-text">{about.name}</span>
          </h1>
          <p className="text-xl text-orange-600 font-medium mb-6">{about.title}</p>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">{about.bio}</p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-orange-200"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="border-2 border-orange-200 hover:border-orange-400 text-orange-600 px-6 py-3 rounded-xl font-medium transition-all hover:bg-orange-50"
            >
              Contact Me
            </a>
          </div>

          <div className="flex items-center gap-4 mt-10">
            {about.github && (
              <a
                href={about.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            )}
            {about.linkedin && (
              <a
                href={about.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}
            <a
              href={`mailto:${about.email}`}
              className="text-gray-400 hover:text-orange-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Avatar placeholder */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-72 h-72 rounded-3xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-2xl shadow-orange-200">
              <svg className="w-32 h-32 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white">
              <span className="text-3xl">💻</span>
            </div>
            <div className="absolute -top-3 -left-3 w-16 h-16 bg-orange-50 rounded-xl flex items-center justify-center shadow-lg border-4 border-white">
              <span className="text-2xl">🚀</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
