"use client";

import React, { useState } from "react";
import { MdDocumentScanner } from "react-icons/md";
import { LinkPreview } from "@/components/ui/link-preview";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";

import ATSResult from "./helper/ATSResult";
import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";
import { LoaderThree } from "@/components/ui/loader";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [jobName, setJobName] = useState("");
  const [jobDesignation, setJobDesignation] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [atsResult, setAtsResult] = useState<ATSResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (resume && resume.type !== "application/pdf") {
      toast.dark("Please upload a PDF file");
      return;
    }

    try {
      setLoading(true);
      setAtsResult(null); // reset old result

      const formData = new FormData();
      formData.append("jobName", jobName);
      formData.append("jobDesignation", jobDesignation);
      if (resume) {
        formData.append("resume", resume);
      }

      const response = await fetch("/api/v1/ats", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Something went wrong!");
        setLoading(false);
        return;
      }

      toast.success("ATS Scanning Completed");
      setAtsResult(result.data);
    } catch (error) {
      toast.error("Network or server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-gradient-to-br from-[#e9ffe0] to-[#edfffa]">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-sm border-b-2 border-gray-300">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          <a href="#" className="flex items-center gap-3">
            <MdDocumentScanner className="text-5xl text-[#7CB342]" />
            <div className="flex flex-col leading-tight">
              <p className="text-2xl font-extrabold text-[#4A148C]">AI ATS</p>
              <p className="text-xs font-medium tracking-wide text-gray-600">
                Smart Resume Screening
              </p>
            </div>
          </a>
        </div>
      </nav>

      {/* Main */}
      <main className="w-full max-w-7xl mx-auto flex-grow p-6">
        {/* Upload form */}
        <div className="bg-white p-3 box rounded-sm my-4">
          <form
            className="lg:p-5 space-y-4 bg-white mt-2"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
              <div>
                <Input
                  id="jobName"
                  type="text"
                  placeholder="Enter Job Name e.g. Software Engineer"
                  className="w-full border border-gray-400"
                  required
                  value={jobName}
                  onChange={(e) => setJobName(e.target.value)}
                />
              </div>

              <div>
                <Input
                  id="jobDesignation"
                  type="text"
                  placeholder="Enter Job Designation e.g. Fresher"
                  className="w-full border border-gray-400"
                  required
                  value={jobDesignation}
                  onChange={(e) => setJobDesignation(e.target.value)}
                />
              </div>

              <div>
                <Input
                  id="resume"
                  type="file"
                  className="w-full border border-gray-400"
                  required
                  onChange={(e) => setResume(e.target.files?.[0] || null)}
                />
              </div>

              <div>
                <Button
                  type="submit"
                  className="bg-[#689F38] hover:bg-[#689F38] text-white w-full shadow mt-4 lg:mt-0"
                >
                  Scan Resume
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* Loader */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <LoaderThree />
          </div>
        )}

        {/* Results */}
        {!loading && atsResult && atsResult.isResume && (
          <div className="rounded-sm mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* User Info */}
              <div className="box bg-white p-4 rounded-sm text-pretty font-semibold text-green-700">
                User Information
                <div className="user-infor py-4">
                  <p className="text-sm text-gray-500 py-1">
                    Name : <span>{atsResult?.fullName}</span>
                  </p>
                  <p className="text-sm text-gray-500 py-1">
                    Email : <span>{atsResult?.email}</span>
                  </p>
                  <p className="text-sm text-gray-500 py-1">
                    Phone : <span>{atsResult?.phoneNumber}</span>
                  </p>
                  <p className="text-sm text-gray-500 py-1">
                    LinkedIn : <span>{atsResult?.linkedin}</span>
                  </p>
                  <p className="text-sm text-gray-500 py-1">
                    GitHub : <span>{atsResult?.github}</span>
                  </p>
                </div>
              </div>

              {/* Scores */}
              <div className="box bg-white p-4 rounded-sm text-pretty font-semibold text-blue-700 lg:col-span-2">
                ATS Score
                <div className="user-infor py-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Resume Score */}
                    <div className="flex flex-col items-center">
                      <AnimatedCircularProgressBar
                        value={atsResult?.atsScore || 0}
                        gaugePrimaryColor={
                          (atsResult?.atsScore || 0) > 70
                            ? "rgb(34 197 94)" // green
                            : (atsResult?.atsScore || 0) > 40
                            ? "rgb(234 179 8)" // yellow
                            : "rgb(239 68 68)" // red
                        }
                        gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
                      />
                      <p className="text-sm text-gray-600 mt-2 font-medium">
                        Resume Score:{" "}
                        <span className="font-bold text-gray-800">
                          {atsResult?.atsScore}%
                        </span>
                      </p>
                    </div>

                    {/* Job Match Score */}
                    <div className="flex flex-col items-center">
                      <AnimatedCircularProgressBar
                        value={atsResult?.matchScore || 0}
                        gaugePrimaryColor={
                          (atsResult?.matchScore || 0) > 70
                            ? "rgb(34 197 94)"
                            : (atsResult?.matchScore || 0) > 40
                            ? "rgb(234 179 8)"
                            : "rgb(239 68 68)"
                        }
                        gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
                      />
                      <p className="text-sm text-gray-600 mt-2 font-medium">
                        Job Match:{" "}
                        <span className="font-bold text-gray-800">
                          {atsResult?.matchScore}%
                        </span>
                      </p>
                    </div>

                    {/* Experienced */}
                    <div className="flex flex-col items-center">
                      <AnimatedCircularProgressBar
                        value={atsResult?.isExperienced ? 100 : 0}
                        gaugePrimaryColor={
                          atsResult?.isExperienced
                            ? "rgb(34 197 94)"
                            : "rgb(239 68 68)"
                        }
                        gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
                      />
                      <p className="text-sm text-gray-600 mt-2 font-medium">
                        Experienced:{" "}
                        <span className="font-bold text-gray-800">
                          {atsResult?.isExperienced ? "Yes" : "No"}
                        </span>
                      </p>
                    </div>

                    {/* Needs Improvement */}
                  </div>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-white box mt-5 p-4 rounded-sm text-pretty font-semibold text-yellow-700">
              Improvement Suggestions
              <div className="user-infor py-4">
                {atsResult?.improvementSuggestions.length === 0 && (
                  <p className="text-sm text-gray-500 py-1">
                    No Suggestions Available
                  </p>
                )}
                {atsResult?.improvementSuggestions.map((suggestion, index) => (
                  <li key={index} className="text-sm text-gray-500 py-1">
                    {suggestion}
                  </li>
                ))}
              </div>
            </div>
          </div>
        )}

        {!loading && atsResult && atsResult.isResume === false && (
          <div className="flex flex-col justify-center items-center lg:py-20">
            <p className="text-pretty text-7xl">🤬</p>
            <p className="text text-pretty my-2 font-semibold text-red-600">
               The uploaded file is not a resume. Please upload a valid resume
              PDF.
            </p>
          </div>
        )}

        {/* Welcome */}
        {!loading && !atsResult && (
          <div className="flex justify-center items-center py-20">
            <p className="text-xl font-semibold text-gray-600">
              👋 Welcome! Upload your resume and click "Scan Resume" to see your
              ATS results.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t-2 border-gray-300 py-4 mt-auto">
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center px-6 text-sm text-gray-500 py-1">
          <LinkPreview url="https://eswarb.vercel.app">
            <span className="font-semibold text-[#7CB342]">🎨 Design</span> &{" "}
            <span className="font-semibold text-[#7CB342]">💻 Developed</span>{" "}
            by <span className="font-semibold text-[#7CB342]">Eswar</span>
          </LinkPreview>
        </div>
      </footer>

      <ToastContainer />
    </div>
  );
}
