import React from "react";
import { DocumentProvider } from "../components/DocumentProvider";
import { Sidebar } from "../components/Sidebar";
import { DocumentPreview } from "../components/DocumentPreview";

export default function Home() {
  return (
    <DocumentProvider>
      <main className="flex w-full h-screen overflow-hidden bg-gray-50 text-gray-900 font-sans">
        <Sidebar />
        <DocumentPreview />
      </main>
    </DocumentProvider>
  );
}
