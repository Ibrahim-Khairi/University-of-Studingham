import React from "react";
import Navbar from "../components/homecomponents/Navbar";
import Footer from "../components/homecomponents/Footer";

const Termsconditions = () => {
  return (
    <div>
      <Navbar />

      <div className="container mx-auto px-4 py-10 text-[#333] leading-8">
        {/* MAIN TITLE */}
        <h1 className="text-4xl font-bold mb-10 text-[#111]">
          Terms & Conditions
        </h1>

        {/* Each Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3 text-[#222]">
            1. Introduction
          </h2>
          <p className="text-lg">
            These Terms & Conditions (“Terms”) govern access to and use of the
            University of Studingham Portal (“the Portal”). By using the Portal,
            users acknowledge that they have read, understood, and agree to be
            bound by these Terms. If you do not agree, you must discontinue use
            immediately.
            <br />
            <br />
            These Terms operate alongside the University of Studingham Privacy
            Policy, which explains how personal data is collected and processed.
          </p>
        </section>

        {/* 2. Definitions */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3 text-[#222]">
            2. Definitions
          </h2>
          <ul className="list-disc ml-6 text-lg">
            <li>
              <strong>“University”</strong> — the University of Studingham.
            </li>
            <li>
              <strong>“Portal”</strong> — the official online platform used for
              academic, administrative, and communication purposes.
            </li>
            <li>
              <strong>“User”</strong> — any student, tutor, or administrative
              staff member with authorised access.
            </li>
            <li>
              <strong>“University Account”</strong> — login credentials issued
              by the University.
            </li>
          </ul>
        </section>

        {/* 3. Eligibility */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">3. Eligibility</h2>
          <p className="text-lg mb-3">Access to the Portal is restricted to:</p>
          <ul className="list-disc ml-6 text-lg">
            <li>Enrolled students</li>
            <li>Approved tutors</li>
            <li>Administrative staff with authorised roles</li>
          </ul>

          <p className="text-lg mt-3">
            Users must maintain an active University Account. The Portal is not
            intended for users under the age of 16.
          </p>
        </section>

        {/* 4. User Responsibilities */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">4. User Responsibilities</h2>
          <p className="text-lg mb-3">Users agree to:</p>

          <ul className="list-disc ml-6 text-lg">
            <li>Provide accurate information</li>
            <li>Keep login credentials confidential</li>
            <li>Use the Portal only for university purposes</li>
            <li>Upload safe and virus-free files</li>
            <li>Check University communications regularly</li>
            <li>Report suspicious account activity immediately</li>
          </ul>
        </section>

        {/* 5. Acceptable Use */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">
            5. Acceptable Use & Code of Conduct
          </h2>
          <p className="text-lg mb-3">Users must NOT:</p>

          <ul className="list-disc ml-6 text-lg">
            <li>Share or let others use their login details</li>
            <li>Attempt to access another user’s data</li>
            <li>Disrupt or reverse-engineer the Portal</li>
            <li>Upload harmful or malicious files</li>
            <li>Share copyrighted material without permission</li>
            <li>Engage in harassment, impersonation, or discrimination</li>
            <li>Post inappropriate or illegal content</li>
          </ul>

          <p className="text-lg mt-3">
            Violations may result in account suspension or disciplinary action.
          </p>
        </section>

        {/* 6. Academic Integrity */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">6. Academic Integrity</h2>
          <p className="text-lg">
            Users must comply with academic integrity regulations. All
            submissions must be the user's own work unless group work is
            allowed. Plagiarism, cheating, and unauthorized collaboration are
            strictly prohibited.
          </p>
        </section>

        {/* 7. Intellectual Property */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">7. Intellectual Property</h2>
          <p className="text-lg">
            All materials on the Portal (notes, videos, assessments, etc.) are
            the intellectual property of the University or licensors.
          </p>

          <h3 className="text-xl font-bold mt-4 mb-2">Users MAY:</h3>
          <ul className="list-disc ml-6 text-lg">
            <li>View materials</li>
            <li>Download for academic use</li>
            <li>Use content for personal study</li>
          </ul>

          <h3 className="text-xl font-bold mt-4 mb-2">Users MAY NOT:</h3>
          <ul className="list-disc ml-6 text-lg">
            <li>Copy or redistribute materials</li>
            <li>Share materials outside the Portal</li>
            <li>Use content commercially</li>
          </ul>
        </section>

        {/* 8. Portal Availability */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">8. Portal Availability</h2>
          <p className="text-lg">
            The University aims to provide reliable service but cannot guarantee
            uninterrupted access. Downtime may occur due to maintenance,
            updates, technical issues, or security incidents.
          </p>
        </section>

        {/* 9. Security Measures */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">9. Security Measures</h2>
          <p className="text-lg">
            The Portal uses secure authentication, encrypted passwords, and
            protected databases. Users must follow all security guidelines and
            avoid logging in from unsafe devices.
          </p>
        </section>

        {/* 10. Monitoring */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">10. Monitoring & Logging</h2>
          <p className="text-lg">
            User activity may be monitored for security, compliance, and
            academic integrity. Logs may include file submissions, access
            history, and usage patterns.
          </p>
        </section>

        {/* 11. User-Submitted Content */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">
            11. User-Submitted Content
          </h2>
          <p className="text-lg">
            Users are responsible for the legality, accuracy, and safety of
            uploaded content. The University may remove harmful or inappropriate
            content.
          </p>
        </section>

        {/* 12. Termination */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">12. Termination of Access</h2>
          <p className="text-lg">
            Access may be suspended or terminated if Terms are violated or if a
            user's affiliation with the University ends.
          </p>
        </section>

        {/* 13. Limitation of Liability */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">
            13. Limitation of Liability
          </h2>
          <p className="text-lg">
            The University is not responsible for device failures, internet
            issues, user error, or damages from misuse of Portal content.
          </p>
        </section>

        {/* 14. Third-Party Links */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">
            14. Third-Party Links or Tools
          </h2>
          <p className="text-lg">
            If the Portal links to external sites, the University is not
            responsible for their content or privacy practices.
          </p>
        </section>

        {/* 15. Governing Law */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">15. Governing Law</h2>
          <p className="text-lg">
            These Terms are governed by applicable University regulations and
            regional laws.
          </p>
        </section>

        {/* 16. Changes */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">16. Changes to Terms</h2>
          <p className="text-lg">
            The University may update these Terms. Continued use of the Portal
            means acceptance of revised Terms.
          </p>
        </section>

        {/* 17. Contact */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3">17. Contact Information</h2>
          <p className="text-lg">
            For questions or support, users may contact the University through
            the official communication channels provided on the Portal.
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Termsconditions;
