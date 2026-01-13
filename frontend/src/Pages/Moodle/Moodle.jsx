import React from "react";
import { useAuth } from "../../context/AuthContext";
import MoodleAdmin from "./MoodleAdmin";
import MoodleTutor from "./MoodleTutor";
import MoodleStudent from "./MoodleStudent";

const Moodle = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-10 text-center">Loading Access...</div>;

  // Route to the specific component based on role
  switch (user?.role) {
    case "admin":
      return <MoodleAdmin />;
    case "tutor":
      return <MoodleTutor />;
    case "student":
      return <MoodleStudent />;
    default:
      return (
        <div className="p-10 text-center text-red-500">
          Access Denied: Invalid Role
        </div>
      );
  }
};

export default Moodle;
