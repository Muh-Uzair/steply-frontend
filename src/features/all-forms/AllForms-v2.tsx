"use client";

import LoadingSpinnerScreen from "@/components/LoadingSpinnerScreen";
import { useGetAllFormsQuery } from "@/store/api-slices/new-form-api-slice";
import { IFormDataWithId, IResumeData } from "@/types/new-form-types";
import React from "react";

const AllForms: React.FC = () => {
  // VARS
  const {
    data,
    isLoading: isLoadingForms,
    isError: isErrorForms,
  } = useGetAllFormsQuery();

  const allForms: IFormDataWithId[] | undefined = data?.data;

  console.log("All forms data:", allForms);

  // FUNCTIONS
  const handleResumeDownload = (resume: IResumeData) => {
    try {
      console.log("Resume data for download:", {
        originalname: resume.originalname,
        mimetype: resume.mimetype,
        base64Length: resume.base64?.length,
        base64Preview: resume.base64?.substring(0, 50),
      });

      // Clean base64 data (remove any whitespace/newlines)
      const cleanBase64 = resume.base64.replace(/\s/g, "");

      // Convert base64 to blob
      const byteCharacters = atob(cleanBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      // Ensure we use the correct MIME type for PDFs
      const mimeType = resume.mimetype || "application/pdf";
      const blob = new Blob([byteArray], { type: mimeType });

      console.log("Blob created:", {
        size: blob.size,
        type: blob.type,
      });

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // Ensure filename has proper extension
      const filename = resume.originalname || "resume.pdf";
      const finalFilename = filename.endsWith(".pdf")
        ? filename
        : `${filename}.pdf`;
      link.download = finalFilename;

      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading resume:", error);
      alert("Error downloading file. Please check the console for details.");
    }
  };

  const handleResumeViewBlob = (resume: IResumeData) => {
    try {
      // Clean base64 data
      const cleanBase64 = resume.base64.replace(/\s/g, "");

      // Convert base64 to blob (same as download but for viewing)
      const byteCharacters = atob(cleanBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      const mimeType = resume.mimetype || "application/pdf";
      const blob = new Blob([byteArray], { type: mimeType });

      // Create object URL and open in new tab
      const url = URL.createObjectURL(blob);
      const newWindow = window.open(url, "_blank");

      if (newWindow) {
        // Clean up the URL after a delay to prevent memory leaks
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 60000); // 1 minute delay
      } else {
        alert("Popup blocked! Please allow popups for this site.");
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error viewing resume (blob method):", error);
      alert("Error viewing file with blob method.");
    }
  };

  // JSX
  if (isErrorForms) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-red-500">
          An error occurred while fetching forms
        </div>
      </div>
    );
  }

  if (isLoadingForms) {
    return <LoadingSpinnerScreen />;
  }

  if (!allForms || allForms.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-gray-500">No forms found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">All Forms</h1>
      <div className="space-y-4">
        {allForms.map((form) => (
          <div key={form._id} className="rounded-lg border p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">{form.fullName}</h2>
              <p className="text-gray-600">
                {form.currentJobTitle || "No job title"}
              </p>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <strong>Phone:</strong> {form.phoneNum}
              </div>
              <div>
                <strong>Employment Status:</strong> {form.employmentStatus}
              </div>
              <div>
                <strong>Experience:</strong> {form.yearsOfExperience} years
              </div>
              <div>
                <strong>Monthly Income:</strong> ${form.monthlyIncome}
              </div>
            </div>

            {form.resume && (
              <div className="mt-4 rounded-lg bg-gray-50 p-4">
                <h3 className="mb-2 font-semibold">Resume:</h3>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    {form.resume.originalname} (
                    {Math.round(form.resume.size / 1024)} KB)
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleResumeViewBlob(form.resume!)}
                      className="rounded bg-purple-500 px-3 py-1 text-sm text-white hover:bg-purple-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleResumeDownload(form.resume!)}
                      className="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 text-sm text-gray-500">
              Created: {new Date(form.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllForms;
