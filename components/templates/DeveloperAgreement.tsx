import React from "react";
import { DocumentData } from "../../lib/types";

interface DeveloperAgreementProps {
  data: DocumentData;
}

export function DeveloperAgreement({ data }: DeveloperAgreementProps) {
  const { company, client, themeColor } = data;

  return (
    <div className="w-full h-full flex flex-col bg-white text-gray-900 text-sm leading-relaxed">
      {/* Header */}
      <div className="text-center mb-12 border-b-2 pb-8" style={{ borderColor: themeColor }}>
        <h1 className="text-3xl font-bold uppercase tracking-widest text-gray-800 mb-2">
          {data.agreementTitle || "Developer Agreement"}
        </h1>
        <div className="text-gray-500 font-medium tracking-wider">
          Date: {data.date} | Ref: {data.documentNumber}
        </div>
      </div>

      {/* Parties Info */}
      <div className="mb-10 text-gray-800">
        <p className="mb-4">
          This Agreement is entered into on <strong>{data.date}</strong> by and between:
        </p>

        <div className="grid grid-cols-2 gap-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
          <div>
            <h3 className="font-bold uppercase text-xs text-gray-500 mb-2">The Developer</h3>
            <div className="font-bold text-lg" style={{ color: themeColor }}>{company.name}</div>
            <div className="whitespace-pre-wrap mt-1">{company.address}</div>
            <div className="mt-1">{company.phone}</div>
            <div>{company.email}</div>
          </div>
          <div>
            <h3 className="font-bold uppercase text-xs text-gray-500 mb-2">The Client</h3>
            <div className="font-bold text-lg text-gray-800">{client.name}</div>
            <div className="whitespace-pre-wrap mt-1">{client.address}</div>
            <div className="mt-1">{client.phone}</div>
            <div>{client.email}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow whitespace-pre-wrap text-gray-700 text-base leading-loose text-justify mb-16">
        {data.agreementContent}
      </div>

      {/* Signatures */}
      <div className="mt-auto pt-8 flex justify-between gap-12" style={{ pageBreakInside: "avoid" }}>
        <div className="flex-1">
          <div className="border-t-2 border-gray-300 pt-2 text-center">
            <div className="font-bold text-gray-800">{company.name}</div>
            <div className="text-gray-500 text-xs">Developer Signature & Date</div>
          </div>
        </div>
        <div className="flex-1">
          <div className="border-t-2 border-gray-300 pt-2 text-center">
            <div className="font-bold text-gray-800">{client.name}</div>
            <div className="text-gray-500 text-xs">Client Signature & Date</div>
          </div>
        </div>
      </div>
    </div>
  );
}
