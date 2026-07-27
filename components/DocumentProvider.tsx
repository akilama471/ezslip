"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { DocumentData, DocumentType, PaperSize, LineItem } from "../lib/types";

const defaultData: DocumentData = {
  type: "invoice",
  paperSize: "a4",
  documentNumber: "INV-001",
  date: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  company: {
    name: "Your Company Ltd.",
    address: "123 Business Road\nCity, Country 12345",
    phone: "+1 234 567 890",
    email: "contact@yourcompany.com",
    logo: "",
  },
  client: {
    name: "Client Name",
    address: "456 Client Avenue\nCity, Country 67890",
    phone: "+1 987 654 321",
    email: "client@example.com",
  },
  items: [
    { id: "1", description: "Web Development Services", quantity: 1, unitPrice: 1500, total: 1500 },
    { id: "2", description: "UI/UX Design", quantity: 1, unitPrice: 800, total: 800 },
  ],
  notes: "Thank you for your business!",
  terms: "Payment is due within 14 days.",
  themeColor: "#2563eb", // brand-600
  agreementTitle: "Software Development Agreement",
  agreementContent: "This Software Development Agreement (the \"Agreement\") is made and entered into on this day by and between the parties.\n\n1. Services\nThe Developer agrees to perform the software development services as described in Exhibit A.\n\n2. Payment\nThe Client agrees to pay the Developer the amount specified in Exhibit A.\n\n3. Confidentiality\nBoth parties agree to keep all confidential information private.\n\n4. Termination\nEither party may terminate this agreement with 30 days written notice.",
};

interface DocumentContextType {
  data: DocumentData;
  updateData: (updates: Partial<DocumentData>) => void;
  updateCompany: (updates: Partial<DocumentData["company"]>) => void;
  updateClient: (updates: Partial<DocumentData["client"]>) => void;
  addItem: () => void;
  updateItem: (id: string, updates: Partial<LineItem>) => void;
  removeItem: (id: string) => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export function DocumentProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DocumentData>(defaultData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage
  useEffect(() => {
    const savedData = localStorage.getItem("ezslip_data");
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ezslip_data", JSON.stringify(data));
    }
  }, [data, isLoaded]);

  const updateData = (updates: Partial<DocumentData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const updateCompany = (updates: Partial<DocumentData["company"]>) => {
    setData((prev) => ({ ...prev, company: { ...prev.company, ...updates } }));
  };

  const updateClient = (updates: Partial<DocumentData["client"]>) => {
    setData((prev) => ({ ...prev, client: { ...prev.client, ...updates } }));
  };

  const addItem = () => {
    setData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { id: Date.now().toString(), description: "New Item", quantity: 1, unitPrice: 0, total: 0 },
      ],
    }));
  };

  const updateItem = (id: string, updates: Partial<LineItem>) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, ...updates };
          // Auto calculate total if quantity or unitPrice changed
          if (updates.quantity !== undefined || updates.unitPrice !== undefined) {
            updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
          }
          return updatedItem;
        }
        return item;
      }),
    }));
  };

  const removeItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  if (!isLoaded) return null; // Avoid hydration mismatch

  return (
    <DocumentContext.Provider
      value={{ data, updateData, updateCompany, updateClient, addItem, updateItem, removeItem }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocument() {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error("useDocument must be used within a DocumentProvider");
  }
  return context;
}
