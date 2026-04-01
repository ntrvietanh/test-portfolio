interface About {
  name: string;
  title: string;
  bio: string;
  email: string;
  skills: string;
}

export default function AboutSection({ about }: { about: About | null }) {
  if (!about) return null;

  let skills: string[] = [];
  try {
    skills = JSON.parse(about.skills);
  } catch {
    skills = [];
  }

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl font-bold section-title">About Me</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">{about.bio}</p>
            <p className="text-gray-600 leading-relaxed">
              Tôi luôn đam mê tìm hiểu công nghệ mới và áp dụng vào các dự án thực tế.
              Khi không làm việc, tôi thích đọc sách kỹ thuật và đóng góp cho open source.
            </p>

            <div className="mt-8 flex gap-3">
              <a
                href={`mailto:${about.email}`}
                className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Get In Touch
              </a>
              <a
                href="#projects"
                className="border border-gray-200 hover:border-orange-300 text-gray-600 hover:text-orange-600 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                See My Work
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Skills & Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-orange-50 text-orange-700 border border-orange-200 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { value: "3+", label: "Years Experience" },
                { value: "20+", label: "Projects Done" },
                { value: "10+", label: "Happy Clients" },
              ].map((stat) => (
                <div key={stat.label} className="bg-orange-50 rounded-2xl p-4 text-center border border-orange-100">
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
