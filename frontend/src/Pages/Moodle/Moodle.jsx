import React from "react";
import { useAuth } from "../../context/AuthContext";
import MoodleAdmin from "./MoodleAdmin";
import MoodleTutor from "./MoodleTutor";
import MoodleStudent from "./MoodleStudent";

const Moodle = () => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center font-black uppercase text-gray-300 animate-pulse">
        Checking Permissions...
      </div>
    );

  switch (user?.role) {
    case "admin":
      return <MoodleAdmin />;
    case "tutor":
      return <MoodleTutor />;
    case "student":
      return <MoodleStudent />;
    default:
      return (
        <div className="p-20 text-center font-bold text-red-500 uppercase">
          Access Denied: Invalid User Role
        </div>
      );
  }
};

export default Moodle;
