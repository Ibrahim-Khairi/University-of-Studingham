import React from "react";
import Navbar from "../components/homecomponents/Navbar";
import Footer from "../components/homecomponents/Footer";
const Accessibility = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="px-6 py-10 max-w-4xl mx-auto leading-relaxed text-gray-800">
        <h1 className="text-4xl font-extrabold mb-6 text-black">
          Accessibility Statement
        </h1>

        <p className="mb-6">
          The University of Studingham is committed to ensuring that all users—
          including students, tutors, and administrative staff—can access and
          use the Portal with ease, regardless of disability or individual
          needs. We aim to provide an inclusive, barrier-free digital
          environment that supports accessibility, usability, and equal
          participation.
        </p>

        {/* Section 1 */}
        <h2 className="text-2xl font-bold mb-3">1. Keyboard Navigation</h2>
        <p className="mb-4">
          The Portal is fully operable using a keyboard alone. Users can
          navigate through all pages and interactive elements using:
        </p>

        <ul className="list-disc pl-6 mb-6">
          <li>Tab – move forward through elements</li>
          <li>Shift + Tab – move backward</li>
          <li>Enter / Space – select or activate items</li>
          <li>Arrow keys – navigate menus and dropdowns</li>
        </ul>

        {/* Section 2 */}
        <h2 className="text-2xl font-bold mb-3">
          2. Visual Accessibility & Colour Contrast
        </h2>
        <p className="mb-6">
          We strive to make all visual content accessible for individuals with
          visual impairments, including colour blindness. All Portal colours
          meet WCAG 2.1 AA contrast guidelines. Designs are tested with
          colour-blindness simulators to ensure clarity. The interface avoids
          relying solely on colour to convey meaning.
        </p>

        {/* Section 3 */}
        <h2 className="text-2xl font-bold mb-3">
          3. Screen Reader & Assistive Technology Compatibility
        </h2>
        <p className="mb-4">
          The Portal is structured to work with major assistive technologies
          such as:
        </p>

        <ul className="list-disc pl-6 mb-6">
          <li>NVDA</li>
          <li>JAWS</li>
          <li>VoiceOver</li>
          <li>Browser-based accessibility tools</li>
        </ul>

        <p className="mb-6">
          We use semantic HTML, ARIA labels, proper heading hierarchy, and
          descriptive alt text to ensure content is understandable when read
          aloud.
        </p>

        {/* Section 4 */}
        <h2 className="text-2xl font-bold mb-3">4. Cognitive Accessibility</h2>
        <p className="mb-6">
          The Portal uses simple, clear, and consistent layouts to support users
          with cognitive disabilities. Features include predictable navigation,
          easy-to-understand language, clear instructions, and reduced
          complexity across all interactions.
        </p>

        {/* Section 5 */}
        <h2 className="text-2xl font-bold mb-3">
          5. Regular Testing & Continuous Improvement
        </h2>
        <p className="mb-6">
          Accessibility is reviewed regularly using internal audits, simulators,
          contrast tools, and user feedback. Improvements are made continuously
          to comply with WCAG standards.
        </p>

        {/* Section 6 */}
        <h2 className="text-2xl font-bold mb-3">6. Feedback & Support</h2>
        <p className="mb-6">
          We welcome feedback on the accessibility of the University of
          Studingham Portal. If you have difficulty accessing any content or
          would like to request an alternative format, please contact the
          University’s accessibility support team through the official support
          channels. We aim to respond promptly to all accessibility-related
          concerns.
        </p>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Accessibility;
