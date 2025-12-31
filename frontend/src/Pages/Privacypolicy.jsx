import React from "react";
import Navbar from "../components/homecomponents/Navbar";
import Footer from "../components/homecomponents/Footer";

const Privacypolicy = () => {
  return (
    <div>
      <Navbar />

      <div className="container mx-auto px-4 py-10 text-[#333] leading-8">
        {/* MAIN TITLE */}
        <h1 className="text-4xl font-bold mb-10 text-[#111]">Privacy Policy</h1>

        {/* Section Template */}
        {[
          {
            title: "1. Introduction",
            content: (
              <>
                The University of Studingham (“the University”, “we”, “us”) is
                committed to protecting the privacy and security of all users
                who access the University Portal (“the Portal”). This Privacy
                Policy explains how personal data is collected, used, stored,
                and safeguarded. By accessing or using the Portal, users agree
                to the practices described in this policy.
              </>
            ),
          },

          {
            title: "2. Data Controller",
            content: (
              <>
                The University of Studingham acts as the Data Controller,
                responsible for determining the purposes and methods of
                processing personal data through the Portal.
              </>
            ),
          },

          {
            title: "3. Purpose of the Portal",
            content: (
              <ul className="list-disc ml-6">
                <li>Academic resources</li>
                <li>Learning materials</li>
                <li>Library facilities</li>
                <li>Timetables and course details</li>
                <li>File submissions and downloads</li>
                <li>University announcements and communication</li>
                <li>Administrative and academic services</li>
              </ul>
            ),
          },

          {
            title: "4. Types of Users",
            content: (
              <ul className="list-disc ml-6">
                <li>Students</li>
                <li>Tutors</li>
                <li>Administrative staff</li>
              </ul>
            ),
          },
        ].map((sec, i) => (
          <section key={i} className="mb-10">
            <h2 className="text-2xl font-bold mb-3 text-[#222]">{sec.title}</h2>
            <div className="text-lg">{sec.content}</div>
          </section>
        ))}

        {/* SPECIAL SECTIONS BELOW WITH SUBHEADINGS */}

        {/* 5. Information We Collect */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3 text-[#222]">
            5. Information We Collect
          </h2>

          <h3 className="text-xl font-bold mt-4 mb-2">
            5.1 Personal Identification Information
          </h3>
          <ul className="list-disc ml-6 text-lg">
            <li>Full name</li>
            <li>University email</li>
            <li>Student/Staff ID</li>
            <li>Login credentials (encrypted)</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-2">
            5.2 Academic and Activity Information
          </h3>
          <ul className="list-disc ml-6 text-lg">
            <li>Course enrolments</li>
            <li>Grades, transcripts</li>
            <li>Attendance records</li>
            <li>Schedules and timetables</li>
            <li>Finance details</li>
            <li>Library bookings</li>
            <li>Submission records</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-2">
            5.3 How Data Is Collected
          </h3>
          <ul className="list-disc ml-6 text-lg">
            <li>Registration forms</li>
            <li>Automatic system logs</li>
          </ul>
        </section>

        {/* Rest of sections */}
        {[
          {
            title: "6. Purpose of Data Processing",
            content:
              "We process personal data to authenticate users, provide access to course materials, ensure security, and maintain academic records.",
          },
          {
            title: "7. Legal Basis for Processing",
            content: (
              <>
                <h3 className="text-xl font-bold mt-4 mb-2">
                  7.1 Contractual Requirement
                </h3>
                <p>Required to provide academic services and communication.</p>

                <h3 className="text-xl font-bold mt-4 mb-2">
                  7.2 Legal Obligations
                </h3>
                <p>Some records must be kept to comply with regulations.</p>

                <h3 className="text-xl font-bold mt-4 mb-2">7.3 Public Task</h3>
                <p>Supports the University’s educational mission.</p>
              </>
            ),
          },
          {
            title: "8. Data Sharing",
            content:
              "We do not share personal data with external parties. Future changes will be updated.",
          },
          {
            title: "9. Security Measures",
            content:
              "Encrypted passwords, secure authentication, monitoring, and audits are used to protect data.",
          },
          {
            title: "10. Automated Decision-Making",
            content:
              "No automated decisions. Only basic progress calculations are automated.",
          },
          {
            title: "11. Children / Under-16 Use",
            content: "The Portal is not intended for users under 16.",
          },
          {
            title: "12. Data Storage and Retention",
            content: (
              <>
                <h3 className="text-xl font-bold mt-4 mb-2">12.1 Storage</h3>
                <p>Data is stored securely in protected systems.</p>

                <h3 className="text-xl font-bold mt-4 mb-2">12.2 Retention</h3>
                <p>
                  Data is kept during studies/employment and deleted or
                  anonymised later.
                </p>
              </>
            ),
          },
          {
            title: "13. Data Breach Protocol",
            content:
              "In case of a breach, users and authorities will be notified as required.",
          },
          {
            title: "14. User Rights",
            content: (
              <ul className="list-disc ml-6 text-lg">
                <li>Access data</li>
                <li>Request correction</li>
                <li>Request deletion</li>
                <li>Object to misuse</li>
                <li>File complaints</li>
              </ul>
            ),
          },
          {
            title: "15. Cookies and Tracking",
            content: "The Portal does not use cookies.",
          },
          {
            title: "16. Policy Updates",
            content:
              "Updates may occur and continued use means agreement with updated terms.",
          },
          {
            title: "17. Contact Information",
            content:
              "Users may contact the University through official channels in the Portal.",
          },
        ].map((sec, i) => (
          <section key={i} className="mb-10">
            <h2 className="text-2xl font-bold mb-3 text-[#222]">{sec.title}</h2>
            <div className="text-lg">{sec.content}</div>
          </section>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Privacypolicy;
