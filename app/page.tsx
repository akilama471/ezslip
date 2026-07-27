import React from "react";
import Link from "next/link";
import { FileText, FileBadge, FileTerminal, Sparkles, ArrowRight, ScrollText, CheckSquare, ShieldCheck, Code2 } from "lucide-react";

export default function LandingPage() {
  const documentTypes = [
    {
      id: "invoice",
      title: "Invoice",
      description: "Create professional invoices to bill your clients seamlessly.",
      icon: <FileText size={32} className="text-blue-500 mb-4" />,
      color: "from-blue-500 to-cyan-400",
      bgHover: "hover:bg-blue-50"
    },
    {
      id: "quotation",
      title: "Quotation",
      description: "Generate detailed estimates and quotes for new projects.",
      icon: <FileBadge size={32} className="text-emerald-500 mb-4" />,
      color: "from-emerald-500 to-teal-400",
      bgHover: "hover:bg-emerald-50"
    },
    {
      id: "agreement",
      title: "Developer Agreement",
      description: "Draft comprehensive, multi-page software development contracts.",
      icon: <FileTerminal size={32} className="text-purple-500 mb-4" />,
      color: "from-purple-500 to-indigo-400",
      bgHover: "hover:bg-purple-50"
    },
    {
      id: "sla",
      title: "Software License Agreement",
      description: "Define usage rights, restrictions, and terms for your software.",
      icon: <ScrollText size={32} className="text-amber-500 mb-4" />,
      color: "from-amber-500 to-orange-400",
      bgHover: "hover:bg-amber-50"
    },
    {
      id: "delivery_acceptance",
      title: "Delivery & Acceptance",
      description: "Formalize the handover and client approval of project deliverables.",
      icon: <CheckSquare size={32} className="text-rose-500 mb-4" />,
      color: "from-rose-500 to-pink-400",
      bgHover: "hover:bg-rose-50"
    },
    {
      id: "maintenance_agreement",
      title: "Maintenance / Support",
      description: "Set expectations for ongoing system support and bug fixes.",
      icon: <ShieldCheck size={32} className="text-cyan-500 mb-4" />,
      color: "from-cyan-500 to-teal-400",
      bgHover: "hover:bg-cyan-50"
    },
    {
      id: "source_code_handover",
      title: "Source Code Handover",
      description: "Official letter transferring IP rights and source code ownership.",
      icon: <Code2 size={32} className="text-fuchsia-500 mb-4" />,
      color: "from-fuchsia-500 to-pink-400",
      bgHover: "hover:bg-fuchsia-50"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center relative overflow-hidden font-sans p-6">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/20 blur-[120px]" />

      <main className="z-10 max-w-5xl w-full flex flex-col items-center">
        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold tracking-wide uppercase">
          <Sparkles size={14} />
          NextGen EZSlip
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 text-center tracking-tight mb-6">
          Documents made <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">beautiful.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 text-center max-w-2xl mb-16 leading-relaxed">
          Select a document type below to get started. Our premium templates will help you look professional in seconds.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {documentTypes.map((doc) => (
            <Link 
              key={doc.id} 
              href={`/templates/${doc.id}`}
              className={`group relative bg-white/70 backdrop-blur-md border border-white/40 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] ${doc.bgHover}`}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
              
              {doc.icon}
              <h2 className="text-2xl font-bold text-slate-800 mb-3">{doc.title}</h2>
              <p className="text-slate-500 leading-relaxed mb-8">
                {doc.description}
              </p>
              
              <div className="flex items-center text-sm font-semibold text-slate-400 group-hover:text-slate-800 transition-colors">
                Select Template <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
