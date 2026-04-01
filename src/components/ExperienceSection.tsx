interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string | null;
  current: boolean;
  description: string;
}

export default function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl font-bold section-title">Experience</h2>
          <p className="text-gray-500 mt-6 max-w-xl">Hành trình công nghệ của tôi.</p>
        </div>

        {experiences.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>No experience added yet.</p>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-orange-100 hidden md:block"></div>

            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id} className="md:pl-16 relative">
                  {/* Timeline dot */}
                  <div className="absolute left-4 top-6 w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow-md hidden md:block"></div>

                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 card-hover">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{exp.role}</h3>
                        <p className="text-orange-600 font-medium">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                        </span>
                        {exp.current && (
                          <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
