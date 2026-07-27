"use client";

import React, { useRef } from "react";
import { useDocument } from "./DocumentProvider";
import { Invoice } from "./templates/Invoice";
import { Quotation } from "./templates/Quotation";
import { DeveloperAgreement } from "./templates/DeveloperAgreement";
import { Printer } from "lucide-react";

export function DocumentPreview() {
  const { data } = useDocument();
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const renderTemplate = () => {
    switch (data.type) {
      case "invoice":
        return <Invoice data={data} />;
      case "quotation":
        return <Quotation data={data} />;
      case "agreement":
        return <DeveloperAgreement data={data} />;
      default:
        return <Invoice data={data} />;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-200/50 print:bg-white overflow-hidden relative">
      {/* Top Bar (No print) */}
      <div className="h-14 flex items-center justify-between px-6 bg-white/80 backdrop-blur border-b border-gray-200 no-print z-10">
        <h2 className="font-semibold text-gray-700 capitalize">{data.type} Preview</h2>
        <div className="flex gap-4">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors shadow-sm"
          >
            <Printer size={18} />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto p-4 md:p-8 flex justify-center no-print-bg">
        <div
          ref={printRef}
          className={`paper paper-${data.paperSize} print-area bg-white transition-all duration-300 ease-in-out`}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}
