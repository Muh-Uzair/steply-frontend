"use client";

import ErrorScreen from "@/components/ErrorScreen";
import LoadingSpinnerScreen from "@/components/LoadingSpinnerScreen";
import { useGetAllFormsQuery } from "@/store/api-slices/new-form-api-slice";
import { IResumeData, IFormDataWithId } from "@/types/new-form-types";
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

  const handleResumeView = (resume: IResumeData) => {
    try {
      console.log("Resume data for viewing:", {
        originalname: resume.originalname,
        mimetype: resume.mimetype,
        base64Length: resume.base64?.length,
        base64Preview: resume.base64?.substring(0, 50),
      });

      // Clean base64 data
      const cleanBase64 = resume.base64.replace(/\s/g, "");

      // Validate base64 format
      if (!cleanBase64 || cleanBase64.length < 100) {
        throw new Error("Invalid or empty base64 data");
      }

      // Create data URL for viewing with proper MIME type
      const mimeType = resume.mimetype || "application/pdf";
      const dataUrl = `data:${mimeType};base64,${cleanBase64}`;

      console.log("Data URL created:", {
        mimeType,
        dataUrlLength: dataUrl.length,
        dataUrlPrefix: dataUrl.substring(0, 100),
      });

      // Open in new window
      const newWindow = window.open();
      if (newWindow) {
        newWindow.location.href = dataUrl;
      } else {
        // Fallback if popup is blocked
        window.location.href = dataUrl;
      }
    } catch (error) {
      console.error("Error viewing resume:", error);
      alert("Error viewing file. Please check the console for details.");
    }
  };

  // JSX
  if (isErrorForms) {
    return <ErrorScreen />;
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
                      onClick={() => handleResumeView(form.resume!)}
                      className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
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
