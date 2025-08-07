"use client";

import ErrorScreen from "@/components/ErrorScreen";
import LoadingSpinnerScreen from "@/components/LoadingSpinnerScreen";
import { AppDispatch } from "@/store";
import { useGetFormByIdQuery } from "@/store/api-slices/new-form-api-slice";
import { setStepAndFormData } from "@/store/slices/new-form-slice";
import { IFormDataWithId, IResumeData } from "@/types/new-form-types";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

interface Props {
  id: string;
}

const AllFormId: React.FC<Props> = ({ id }) => {
  // VARS
  const {
    data,
    isLoading: isLoadingForms,
    isError: isErrorForms,
  } = useGetFormByIdQuery(id);
  const formData: IFormDataWithId | undefined = data?.data;
  const dispatch = useDispatch<AppDispatch>();

  //FUNCTION
  useEffect(() => {
    const setFormData = () => {
      dispatch(
        setStepAndFormData({
          formData: {
            ...formData,
            resume: null,
            password: "",
            confirmPassword: "",
          },
        }),
      );
    };

    if (formData?.fullName) {
      setFormData();
    }
  }, [formData?.fullName, dispatch, formData]);

  // FUNCTION
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

  // FUNCTION
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
    return <ErrorScreen />;
  }

  if (isLoadingForms) {
    return <LoadingSpinnerScreen />;
  }

  if (formData) {
    return (
      <div>
        <div>Fullname : {formData?.fullName}</div>
        {formData.resume && (
          <div className="mt-4 rounded-lg bg-gray-50 p-4">
            <h3 className="mb-2 font-semibold">Resume:</h3>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {formData.resume.originalname} (
                {Math.round(formData.resume.size / 1024)} KB)
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleResumeViewBlob(formData.resume!)}
                  className="rounded bg-purple-500 px-3 py-1 text-sm text-white hover:bg-purple-600"
                >
                  View
                </button>
                <button
                  onClick={() => handleResumeDownload(formData.resume!)}
                  className="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default AllFormId;
