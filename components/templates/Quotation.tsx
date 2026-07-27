import React from "react";
import { DocumentData } from "../../lib/types";

interface QuotationProps {
  data: DocumentData;
}

export function Quotation({ data }: QuotationProps) {
  const { company, client, items, themeColor } = data;

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const total = subtotal;

  return (
    <div className="w-full h-full flex flex-col bg-white text-gray-900 text-sm">
      {/* Header */}
      <div className="flex justify-between items-start mb-12 border-b-4 pb-8" style={{ borderColor: themeColor }}>
        <div>
          {company.logo ? (
            <img src={company.logo} alt="Company Logo" className="h-16 object-contain mb-4" />
          ) : (
            <div className="text-3xl font-bold mb-4 text-gray-800">
              {company.name}
            </div>
          )}
          <div className="text-gray-500 whitespace-pre-wrap">{company.address}</div>
          <div className="text-gray-500">{company.phone}</div>
          <div className="text-gray-500">{company.email}</div>
        </div>
        <div className="text-right bg-gray-50 p-6 rounded-lg border border-gray-100">
          <h1 className="text-4xl font-bold mb-4 uppercase tracking-wider" style={{ color: themeColor }}>Quotation</h1>
          <div className="grid grid-cols-2 gap-2 text-gray-600 text-right">
            <div className="font-semibold">Quote #:</div>
            <div>{data.documentNumber}</div>
            <div className="font-semibold">Date:</div>
            <div>{data.date}</div>
            <div className="font-semibold">Valid Until:</div>
            <div>{data.dueDate}</div>
          </div>
        </div>
      </div>

      {/* Prepared For */}
      <div className="mb-12">
        <h2 className="text-sm font-bold mb-2 uppercase text-gray-400 tracking-wider">Prepared For</h2>
        <div className="font-semibold text-xl text-gray-800">{client.name}</div>
        <div className="text-gray-600 whitespace-pre-wrap mt-1">{client.address}</div>
        <div className="text-gray-600 mt-1">{client.phone}</div>
        <div className="text-gray-600">{client.email}</div>
      </div>

      {/* Items Table */}
      <div className="flex-grow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-gray-700 font-semibold rounded-tl-lg">Description</th>
              <th className="py-3 px-4 text-gray-700 font-semibold text-right">Qty</th>
              <th className="py-3 px-4 text-gray-700 font-semibold text-right">Unit Price</th>
              <th className="py-3 px-4 text-gray-700 font-semibold text-right rounded-tr-lg">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-4 px-4">{item.description}</td>
                <td className="py-4 px-4 text-right">{item.quantity}</td>
                <td className="py-4 px-4 text-right">${item.unitPrice.toFixed(2)}</td>
                <td className="py-4 px-4 text-right font-medium">${item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mt-8 mb-12">
        <div className="w-1/3 bg-gray-50 p-6 rounded-lg border border-gray-100">
          <div className="flex justify-between py-2 text-gray-600">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-3 text-xl font-bold border-t border-gray-200 mt-2 pt-4" style={{ color: themeColor }}>
            <span>Estimated Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Footer Notes & Terms */}
      <div className="mt-auto flex flex-col gap-6">
        {data.notes && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-semibold text-blue-800 mb-1">Remarks:</h3>
            <p className="text-blue-900 whitespace-pre-wrap text-sm">{data.notes}</p>
          </div>
        )}
        <div className="text-center text-gray-400 text-xs border-t border-gray-100 pt-4">
          <p className="whitespace-pre-wrap">{data.terms}</p>
        </div>
      </div>
    </div>
  );
}
