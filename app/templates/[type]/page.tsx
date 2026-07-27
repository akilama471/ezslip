"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useDocument } from "../../../components/DocumentProvider";
import { DocumentType } from "../../../lib/types";
import { ArrowLeft, LayoutTemplate } from "lucide-react";
import Link from "next/link";

export default function TemplateSelectionPage() {
  const params = useParams();
  const router = useRouter();
  const { updateData } = useDocument();

  // params.type could be a string or array, safely cast
  const typeParam = Array.isArray(params.type) ? params.type[0] : params.type;
  const docType = (typeParam as DocumentType) || "invoice";

  const getTitle = () => {
    switch (docType) {
      case "invoice": return "Invoice Templates";
      case "quotation": return "Quotation Templates";
      case "agreement": return "Developer Agreement Templates";
      case "sla": return "Software License Agreement Templates";
      case "delivery_acceptance": return "Delivery & Acceptance Templates";
      case "maintenance_agreement": return "Maintenance & Support Templates";
      case "source_code_handover": return "Source Code Handover Templates";
      default: return "Templates";
    }
  };

  const getDocDisplayName = () => {
    switch (docType) {
      case "sla": return "SLA";
      case "delivery_acceptance": return "Acceptance Cert";
      case "maintenance_agreement": return "Maintenance";
      case "source_code_handover": return "Handover Letter";
      default: return docType.charAt(0).toUpperCase() + docType.slice(1);
    }
  };

  const handleSelectTemplate = () => {
    // Determine boilerplate text if it's a long-form document
    let boilerplate = {};
    if (docType === "sla") {
      boilerplate = {
        agreementTitle: "Software License Agreement",
        agreementContent: "This Software License Agreement (the \"Agreement\") is made between the Licensor and the Licensee.\n\n1. Grant of License\nLicensor grants Licensee a non-exclusive, non-transferable license to use the Software for internal business purposes.\n\n2. Restrictions\nLicensee shall not modify, reverse engineer, decompile, or distribute the Software.\n\n3. Term and Termination\nThis Agreement is effective until terminated. Licensor may terminate if Licensee breaches any term."
      };
    } else if (docType === "delivery_acceptance") {
      boilerplate = {
        agreementTitle: "Delivery & Acceptance Certificate",
        agreementContent: "This Certificate confirms that the deliverables specified in the Statement of Work have been delivered by the Provider and tested by the Client.\n\n1. Delivery Status\nAll modules and source code have been successfully deployed to the production environment.\n\n2. Acceptance\nThe Client acknowledges that the deliverables meet the agreed specifications and accepts them without reservation.\n\n3. Warranty Period\nThe 30-day warranty and support period commences from the date of this certificate."
      };
    } else if (docType === "maintenance_agreement") {
      boilerplate = {
        agreementTitle: "Maintenance & Support Agreement",
        agreementContent: "This Maintenance & Support Agreement outlines the ongoing support provided for the software system.\n\n1. Scope of Support\nProvider will offer bug fixes, security patches, and minor updates.\n\n2. Service Level Agreement (SLA)\nCritical issues will be addressed within 24 hours. Non-critical issues within 3 business days.\n\n3. Term & Fees\nThis agreement is valid for 12 months from the date of signing. Fees are payable monthly."
      };
    } else if (docType === "source_code_handover") {
      boilerplate = {
        agreementTitle: "Source Code Handover Letter",
        agreementContent: "Subject: Official Handover of Source Code and Intellectual Property\n\nDear Client,\n\nThis letter serves as the official handover of all source code, database schemas, and associated documentation for the developed project.\n\n1. Transfer of Rights\nUpon final payment, all intellectual property rights and ownership of the source code are transferred to the Client.\n\n2. Confidentiality\nThe Developer will destroy any local copies of the source code within 30 days unless a maintenance agreement is active.\n\n3. Support\nAny future modifications will be subject to a separate agreement."
      };
    }

    // Update global state with the selected document type and boilerplate
    updateData({ type: docType, ...boilerplate });
    // Navigate to editor
    router.push("/editor");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            {getTitle()}
          </h1>
          <p className="text-slate-500 text-lg">
            Select a template below to start customizing your document.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Phase 1: Simple Template */}
          <div 
            onClick={handleSelectTemplate}
            className="group cursor-pointer bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
          >
            {/* Template Thumbnail Placeholder */}
            <div className="aspect-[1/1.2] bg-slate-100 p-6 flex flex-col gap-4 relative overflow-hidden group-hover:bg-slate-50 transition-colors border-b border-slate-100">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5" />
              
              {/* Mock wireframe of the document */}
              <div className="w-1/3 h-4 bg-slate-200 rounded" />
              <div className="w-1/4 h-3 bg-slate-200 rounded mb-4" />
              
              <div className="w-full h-px bg-slate-200" />
              
              <div className="space-y-2 mt-4">
                <div className="w-full h-3 bg-slate-200 rounded" />
                <div className="w-full h-3 bg-slate-200 rounded" />
                <div className="w-4/5 h-3 bg-slate-200 rounded" />
              </div>
              
              <div className="mt-auto flex justify-end">
                <div className="w-1/4 h-6 bg-slate-200 rounded" />
              </div>
            </div>

            {/* Template Info */}
            <div className="p-5 flex items-center justify-between bg-white">
              <div>
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <LayoutTemplate size={16} className="text-blue-500" />
                  Simple {getDocDisplayName()}
                </h3>
                <p className="text-xs text-slate-500 mt-1">Clean and professional</p>
              </div>
              <div className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                Use Template
              </div>
            </div>
          </div>
          
          {/* Coming Soon placeholders */}
          <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 flex items-center justify-center aspect-[1/1.2] opacity-50">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-200 mb-3">
                <LayoutTemplate size={20} className="text-slate-400" />
              </div>
              <h3 className="font-semibold text-slate-500">More Templates</h3>
              <p className="text-xs text-slate-400 mt-1">Coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
