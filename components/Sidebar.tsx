"use client";

import React from "react";
import { useDocument } from "./DocumentProvider";
import { DocumentType, PaperSize } from "../lib/types";
import { Settings2, User, Building, FileText, Palette, Plus, Trash2 } from "lucide-react";

export function Sidebar() {
  const { data, updateData, updateCompany, updateClient, addItem, updateItem, removeItem } = useDocument();

  return (
    <div className="w-96 h-full bg-white border-r border-gray-200 flex flex-col no-print z-20 shadow-xl relative overflow-hidden glass">
      <div className="p-6 border-b border-gray-100 flex-shrink-0 bg-white/50 backdrop-blur">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">
          NextGen EZSlip
        </h1>
        <p className="text-xs text-gray-500 font-medium">Premium Receipt Creator</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
        {/* Document Settings */}
        <section>
          <h2 className="flex items-center gap-2 font-semibold text-gray-800 border-b pb-2 mb-4">
            <Settings2 size={18} className="text-blue-500" />
            Document Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm border p-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                value={data.type}
                onChange={(e) => updateData({ type: e.target.value as DocumentType })}
              >
                <option value="invoice">Invoice</option>
                <option value="quotation">Quotation</option>
                <option value="agreement">Developer Agreement</option>
                <option value="sla">Software License Agreement</option>
                <option value="delivery_acceptance">Delivery & Acceptance</option>
                <option value="maintenance_agreement">Maintenance / Support</option>
                <option value="source_code_handover">Source Code Handover</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Paper Size</label>
              <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                {(['a4', 'a5', 'legal'] as PaperSize[]).map(size => (
                  <button
                    key={size}
                    onClick={() => updateData({ paperSize: size })}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md uppercase transition-all ${
                      data.paperSize === size ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Theme Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    className="h-8 w-8 rounded cursor-pointer border-0 p-0 bg-transparent"
                    value={data.themeColor}
                    onChange={(e) => updateData({ themeColor: e.target.value })}
                  />
                  <span className="text-xs text-gray-500 uppercase">{data.themeColor}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ref No.</label>
                <input
                  type="text"
                  className="w-full rounded-md border-gray-300 shadow-sm border p-1.5 px-2 bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={data.documentNumber}
                  onChange={(e) => updateData({ documentNumber: e.target.value })}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sender / Company */}
        <section>
          <h2 className="flex items-center gap-2 font-semibold text-gray-800 border-b pb-2 mb-4">
            <Building size={18} className="text-indigo-500" />
            Your Details (Sender)
          </h2>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Company Name"
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              value={data.company.name}
              onChange={(e) => updateCompany({ name: e.target.value })}
            />
            <textarea
              placeholder="Address"
              rows={2}
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              value={data.company.address}
              onChange={(e) => updateCompany({ address: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Phone"
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                value={data.company.phone}
                onChange={(e) => updateCompany({ phone: e.target.value })}
              />
              <input
                type="text"
                placeholder="Email"
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                value={data.company.email}
                onChange={(e) => updateCompany({ email: e.target.value })}
              />
            </div>
          </div>
        </section>

        {/* Client / Receiver */}
        <section>
          <h2 className="flex items-center gap-2 font-semibold text-gray-800 border-b pb-2 mb-4">
            <User size={18} className="text-emerald-500" />
            Client Details
          </h2>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Client Name"
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              value={data.client.name}
              onChange={(e) => updateClient({ name: e.target.value })}
            />
            <textarea
              placeholder="Address"
              rows={2}
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              value={data.client.address}
              onChange={(e) => updateClient({ address: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Phone"
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                value={data.client.phone}
                onChange={(e) => updateClient({ phone: e.target.value })}
              />
              <input
                type="text"
                placeholder="Email"
                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                value={data.client.email}
                onChange={(e) => updateClient({ email: e.target.value })}
              />
            </div>
          </div>
        </section>

        {/* Conditional Sections based on Document Type */}
        {(() => {
          const isLongForm = ['agreement', 'sla', 'delivery_acceptance', 'maintenance_agreement', 'source_code_handover'].includes(data.type);

          if (!isLongForm) {
            return (
              <section>
                <div className="flex items-center justify-between border-b pb-2 mb-4">
                  <h2 className="flex items-center gap-2 font-semibold text-gray-800">
                    <FileText size={18} className="text-amber-500" />
                    Line Items
                  </h2>
                  <button 
                    onClick={addItem}
                    className="text-xs flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-1 rounded hover:bg-amber-200 transition"
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>
                
                <div className="space-y-4">
                  {data.items.map((item, i) => (
                    <div key={item.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200 relative group">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="absolute -top-2 -right-2 bg-red-100 text-red-600 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={14} />
                      </button>
                      <input
                        type="text"
                        placeholder="Description"
                        className="w-full rounded border-gray-300 border p-1.5 text-sm mb-2"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, { description: e.target.value })}
                      />
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="text-xs text-gray-500">Qty</label>
                          <input
                            type="number"
                            className="w-full rounded border-gray-300 border p-1.5 text-sm"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) })}
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-xs text-gray-500">Price</label>
                          <input
                            type="number"
                            className="w-full rounded border-gray-300 border p-1.5 text-sm"
                            value={item.unitPrice}
                            onChange={(e) => updateItem(item.id, { unitPrice: Number(e.target.value) })}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Notes</label>
                    <textarea
                      rows={2}
                      className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none focus:border-amber-500"
                      value={data.notes}
                      onChange={(e) => updateData({ notes: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Terms & Conditions</label>
                    <textarea
                      rows={2}
                      className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none focus:border-amber-500"
                      value={data.terms}
                      onChange={(e) => updateData({ terms: e.target.value })}
                    />
                  </div>
                </div>
              </section>
            );
          } else {
            return (
              <section>
                <h2 className="flex items-center gap-2 font-semibold text-gray-800 border-b pb-2 mb-4">
                  <FileText size={18} className="text-purple-500" />
                  Document Content
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                      value={data.agreementTitle || ""}
                      onChange={(e) => updateData({ agreementTitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Body (Multi-page supported)</label>
                    <textarea
                      rows={15}
                      className="w-full rounded-md border border-gray-300 p-3 text-sm font-mono leading-relaxed focus:ring-2 focus:ring-purple-500 outline-none resize-y"
                      value={data.agreementContent || ""}
                      onChange={(e) => updateData({ agreementContent: e.target.value })}
                      placeholder="Enter your long form text here..."
                    />
                  </div>
                </div>
              </section>
            );
          }
        })()}

      </div>
    </div>
  );
}
