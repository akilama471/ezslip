"use client";

import React from "react";
import { Sidebar } from "../../components/Sidebar";
import { DocumentPreview } from "../../components/DocumentPreview";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EditorPage() {
  return (
    <main className="flex w-full h-screen overflow-hidden bg-gray-50 text-gray-900 font-sans relative">
      {/* Back button overlay */}
      <Link 
        href="/"
        className="absolute top-4 left-4 z-50 bg-white/80 backdrop-blur border border-gray-200 shadow-sm p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all"
        title="Back to Home"
      >
        <ArrowLeft size={18} />
      </Link>
      
      <Sidebar />
      <DocumentPreview />
    </main>
  );
}
