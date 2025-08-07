import AllFormId from "@/pages/all-form-id-page";
import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

// ✅ FIX: Await params before destructuring
const Page = async (props: PageProps) => {
  const params = await props.params;
  const id = params.id;

  return <AllFormId id={id} />;
};

export default Page;
