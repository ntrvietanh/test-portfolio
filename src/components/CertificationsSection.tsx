interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate?: string | null;
  expiryDate?: string | null;
  credentialId?: string | null;
  credentialUrl?: string | null;
}

export default function CertificationsSection({
  certifications,
}: {
  certifications: Certification[];
}) {
  return (
    <section id="certifications" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl font-bold section-title">Certifications</h2>
          <p className="text-gray-500 mt-6 max-w-xl">
            Chứng chỉ và bằng cấp chuyên môn.
          </p>
        </div>

        {certifications.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>No certifications added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 card-hover flex flex-col gap-4"
              >
                {/* Badge icon */}
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 leading-snug">{cert.name}</h3>
                  <p className="text-orange-600 font-medium text-sm mt-1">{cert.issuer}</p>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                    {cert.issueDate && (
                      <span className="text-gray-400 text-xs">
                        Issued: {cert.issueDate}
                      </span>
                    )}
                    {cert.expiryDate && (
                      <span className="text-gray-400 text-xs">
                        Expires: {cert.expiryDate}
                      </span>
                    )}
                  </div>

                  {cert.credentialId && (
                    <p className="text-gray-400 text-xs mt-1">
                      ID: {cert.credentialId}
                    </p>
                  )}
                </div>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
                  >
                    View Credential
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
