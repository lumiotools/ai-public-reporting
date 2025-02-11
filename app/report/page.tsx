import { ChatInterface } from "@/components/chat-interface";
import React from "react";

const Report = () => {
  return (
    <div className="max-w-4xl mx-auto mt-16">
      <h1 className="text-2xl sm:text-4xl font-bold text-[#362864] dark:text-white mb-6 text-center">
        Report a Community Issue
      </h1>
      <p className="text-xs sm:text-xl text-[#1E1E1E80] dark:text-gray-300 mb-8 text-center">
        Use our AI-powered chat interface to report local issues. Our system
        will guide you through the process and ensure your report is sent to the
        right department.
      </p>
      <ChatInterface />
    </div>
  );
};

export default Report;
