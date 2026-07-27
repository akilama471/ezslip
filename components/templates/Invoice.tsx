import React from "react";
import { DocumentData } from "../../lib/types";

interface InvoiceProps {
  data: DocumentData;
}

export function Invoice({ data }: InvoiceProps) {
  const { company, client, items, themeColor } = data;

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.05; // 5% tax for example, can be dynamic
  const total = subtotal + tax;

  return (
    <div className="w-full h-full flex flex-col bg-white text-gray-900 text-sm">
      {/* Header */}
      <div className="flex justify-between items-start mb-12">
        <div>
          {company.logo ? (
            <img src={company.logo} alt="Company Logo" className="h-16 object-contain mb-4" />
          ) : (
            <div className="text-3xl font-bold mb-4" style={{ color: themeColor }}>
              {company.name}
            </div>
          )}
          <div className="text-gray-500 whitespace-pre-wrap">{company.address}</div>
          <div className="text-gray-500">{company.phone}</div>
          <div className="text-gray-500">{company.email}</div>
        </div>
        <div className="text-right">
          <h1 className="text-4xl font-light mb-4 uppercase tracking-widest text-gray-800">Invoice</h1>
          <div className="grid grid-cols-2 gap-2 text-gray-600">
            <div className="font-semibold">Invoice #:</div>
            <div>{data.documentNumber}</div>
            <div className="font-semibold">Date:</div>
            <div>{data.date}</div>
            {data.dueDate && (
              <>
                <div className="font-semibold">Due Date:</div>
                <div>{data.dueDate}</div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-12">
        <h2 className="text-lg font-bold mb-2 border-b-2 inline-block pb-1" style={{ borderColor: themeColor }}>Bill To:</h2>
        <div className="font-semibold text-gray-800">{client.name}</div>
        <div className="text-gray-500 whitespace-pre-wrap">{client.address}</div>
        <div className="text-gray-500">{client.phone}</div>
        <div className="text-gray-500">{client.email}</div>
      </div>

      {/* Items Table */}
      <div className="flex-grow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2" style={{ borderColor: themeColor }}>
              <th className="py-3 px-2 text-gray-700 font-semibold">Description</th>
              <th className="py-3 px-2 text-gray-700 font-semibold text-right">Qty</th>
              <th className="py-3 px-2 text-gray-700 font-semibold text-right">Unit Price</th>
              <th className="py-3 px-2 text-gray-700 font-semibold text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-3 px-2 border-b border-gray-100">{item.description}</td>
                <td className="py-3 px-2 border-b border-gray-100 text-right">{item.quantity}</td>
                <td className="py-3 px-2 border-b border-gray-100 text-right">${item.unitPrice.toFixed(2)}</td>
                <td className="py-3 px-2 border-b border-gray-100 text-right">${item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mt-8 mb-12">
        <div className="w-1/3">
          <div className="flex justify-between py-2 text-gray-600">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 text-gray-600 border-b border-gray-200">
            <span>Tax (5%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-3 text-xl font-bold" style={{ color: themeColor }}>
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Footer Notes & Terms */}
      <div className="mt-auto border-t border-gray-200 pt-8 flex gap-8">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-700 mb-1">Notes:</h3>
          <p className="text-gray-500 whitespace-pre-wrap text-xs">{data.notes}</p>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-700 mb-1">Terms & Conditions:</h3>
          <p className="text-gray-500 whitespace-pre-wrap text-xs">{data.terms}</p>
        </div>
      </div>
    </div>
  );
}
