import React, { useState, useEffect } from "react";

const sections = [
  { id: "overview", label: "Overview & Motivation" },
  { id: "objectives", label: "Core Objectives" },
  { id: "features", label: "Features by Role" },
  { id: "architecture", label: "Architecture & Technologies" },
  { id: "modules", label: "Key System Modules" },
  { id: "database", label: "Database Tables" },
  { id: "ui", label: "Implementation & UI" },
  { id: "outcomes", label: "Achievements & Outcomes" },
  { id: "future", label: "Limitations & Future Scope" },
  { id: "summary", label: "Final Summary" },
];

const Section = ({ id, title, children, isActive }: { id: string; title: string; children: React.ReactNode; isActive: boolean }) => (
  <section id={id} className={`scroll-mt-24 mb-12 transition-all duration-300 ${isActive ? 'block' : 'hidden'}`}>
    <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b pb-2">{title}</h2>
    <div className="text-gray-700 leading-relaxed">{children}</div>
  </section>
);

const GLADocumentation = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "GLA Portal Documentation";
  }, []);

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="md:hidden bg-white shadow p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-blue-900">📘 GLA Docs</h2>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-64 p-6 bg-white border-r shadow md:fixed h-full overflow-y-auto z-10`}>
        <h2 className="text-xl font-bold mb-6 text-blue-900 hidden md:block">📘 GLA Docs</h2>
        <nav className="space-y-3 text-sm">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSectionClick(s.id)}
              className={`block w-full text-left p-2 rounded transition-colors ${activeSection === s.id ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 p-6 md:p-10 w-full max-w-5xl">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900">GLA Portal Documentation</h1>
          <p className="text-gray-600 mt-2">by Rachit Verma and Team | Guided by Dr. Neeraj Gupta</p>
          <p className="text-sm text-gray-500">GLA University, B.Tech(H) CSE, April 2025</p>
        </header>

        <Section id="overview" title="1. Overview & Motivation" isActive={activeSection === "overview"}>
          <p>
            GLA Portal is a centralized university service system that digitizes workflows for students, faculty,
            and administration. It improves transparency, reduces errors, and offers a role-specific experience
            to all users through secure and scalable architecture.
          </p>
        </Section>

        <Section id="objectives" title="2. Core Objectives" isActive={activeSection === "objectives"}>
          <ul className="list-disc ml-6 space-y-1">
            <li>Role-based login and access control</li>
            <li>Online course enrollment with real-time validation</li>
            <li>Ticket-based complaint system</li>
            <li>ID card reissue and approval workflow</li>
            <li>Secure data processing with AES-256 encryption</li>
          </ul>
        </Section>

        <Section id="features" title="3. Features by Role" isActive={activeSection === "features"}>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800">🎓 Students</h4>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Register and enroll in courses</li>
                <li>Submit complaints and ID card requests</li>
                <li>Track request status in real-time</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800">👨‍🏫 Faculty</h4>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Manage attendance and apply for leave</li>
                <li>View enrolled students by subject</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800">🛠️ Admin</h4>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Approve/reject ID requests</li>
                <li>Assign subjects and manage faculty</li>
                <li>Resolve complaints through dashboard</li>
              </ul>
            </div>
          </div>
        </Section>

        <Section id="architecture" title="4. Architecture & Technologies" isActive={activeSection === "architecture"}>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Frontend:</strong> React.js with Tailwind CSS</li>
              <li><strong>Backend:</strong> Flask (Python) with REST APIs</li>
              <li><strong>Database:</strong> PostgreSQL + Redis (caching)</li>
              <li><strong>Security:</strong> JWT, AES-256, GDPR-ready</li>
            </ul>
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <h5 className="font-medium text-gray-700 mb-2">System Diagram</h5>
              <div className="text-center text-gray-500 py-8 border border-dashed rounded">
                [Architecture diagram placeholder]
              </div>
            </div>
          </div>
        </Section>

        <Section id="modules" title="5. Key System Modules" isActive={activeSection === "modules"}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h4 className="font-semibold text-blue-700 mb-2">📚 Course Enrollment</h4>
              <p className="text-sm text-gray-600">Real-time validation and conflict detection for course selection</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h4 className="font-semibold text-blue-700 mb-2">📝 Complaint System</h4>
              <p className="text-sm text-gray-600">Ticket-based tracking with status notifications</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h4 className="font-semibold text-blue-700 mb-2">📅 Faculty Leave</h4>
              <p className="text-sm text-gray-600">Approval workflow with calendar integration</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h4 className="font-semibold text-blue-700 mb-2">🔐 Authentication</h4>
              <p className="text-sm text-gray-600">Role-based access control with JWT</p>
            </div>
          </div>
        </Section>

        <Section id="database" title="6. Database Tables" isActive={activeSection === "database"}>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Table</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Key Fields</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 text-sm font-medium text-gray-900">Admins</td>
                  <td className="px-4 py-2 text-sm text-gray-500">ID, name, email, password</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm font-medium text-gray-900">Faculties</td>
                  <td className="px-4 py-2 text-sm text-gray-500">ID, name, department, email</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm font-medium text-gray-900">Students</td>
                  <td className="px-4 py-2 text-sm text-gray-500">ID, department, photo, courses</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm font-medium text-gray-900">Leaves</td>
                  <td className="px-4 py-2 text-sm text-gray-500">start_date, end_date, reason, status</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm font-medium text-gray-900">Complaints</td>
                  <td className="px-4 py-2 text-sm text-gray-500">ticket_id, status, category</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="ui" title="7. Implementation & UI" isActive={activeSection === "ui"}>
          <div className="space-y-4">
            <ul className="list-disc ml-6 space-y-2">
              <li>Interactive dashboards for all roles</li>
              <li>Real-time status indicators</li>
              <li>Validated forms with alerts and confirmations</li>
            </ul>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h5 className="font-medium mb-2">Performance Metrics</h5>
                <div className="space-y-2">
                  <p className="text-sm"><span className="font-medium">Avg. load time:</span> 1.3s</p>
                  <p className="text-sm"><span className="font-medium">Stress tested:</span> 500+ users</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h5 className="font-medium mb-2">UI Screenshot</h5>
                <div className="text-center text-gray-500 py-8 border border-dashed rounded">
                  [Dashboard screenshot placeholder]
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="outcomes" title="8. Achievements & Outcomes" isActive={activeSection === "outcomes"}>
          <div className="bg-green-50 p-6 rounded-lg">
            <ul className="list-disc ml-6 space-y-3">
              <li><strong>80% reduction</strong> in paperwork</li>
              <li><strong>24/7 access</strong> to academic services</li>
              <li>Faculty saved <strong>~10 hours/month</strong></li>
              <li><strong>99.8% uptime</strong> with zero data loss</li>
            </ul>
          </div>
        </Section>

        <Section id="future" title="9. Limitations & Future Scope" isActive={activeSection === "future"}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-red-700 mb-3">📌 Current Limitations</h4>
              <ul className="list-disc ml-6 space-y-1 text-gray-700">
                <li>Desktop-first interface</li>
                <li>No finance system integration</li>
                <li>Limited reporting features</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-blue-700 mb-3">🚀 Future Enhancements</h4>
              <ul className="list-disc ml-6 space-y-1 text-gray-700">
                <li>iOS/Android apps</li>
                <li>AI-powered help chat</li>
                <li>Predictive analytics dashboards</li>
                <li>NFC smart ID card integration</li>
                <li>Financial management module</li>
              </ul>
            </div>
          </div>
        </Section>

        <Section id="summary" title="10. Final Summary" isActive={activeSection === "summary"}>
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-gray-800 leading-relaxed">
              GLA Portal represents a landmark shift in institutional management—unifying students, faculty, and admins on
              one robust, secure platform. Its modular design ensures long-term maintainability and adaptability.
            </p>
            <div className="mt-4 p-4 bg-white rounded border border-blue-100">
              <h5 className="font-medium text-blue-800 mb-2">Key Takeaways</h5>
              <ul className="list-disc ml-6 space-y-1 text-blue-900">
                <li>Centralized platform for all university stakeholders</li>
                <li>Significant efficiency improvements</li>
                <li>Scalable architecture for future growth</li>
                <li>Enhanced transparency and user experience</li>
              </ul>
            </div>
          </div>
        </Section>

        <footer className="text-sm text-center text-gray-500 mt-16 border-t pt-4">
          &copy; 2025 GLA University | Rachit Verma & Team
        </footer>
      </main>
    </div>
  );
};

export default GLADocumentation;