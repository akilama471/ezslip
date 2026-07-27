export type DocumentType = 'invoice' | 'quotation' | 'agreement';
export type PaperSize = 'a4' | 'a5' | 'legal';

export interface CompanyDetails {
  name: string;
  address: string;
  phone: string;
  email: string;
  logo: string;
  taxId?: string;
}

export interface ClientDetails {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface DocumentData {
  type: DocumentType;
  paperSize: PaperSize;
  documentNumber: string;
  date: string;
  dueDate?: string;
  company: CompanyDetails;
  client: ClientDetails;
  items: LineItem[];
  notes: string;
  terms: string;
  themeColor: string;
  
  // Specific to agreement
  agreementTitle?: string;
  agreementContent?: string;
}
