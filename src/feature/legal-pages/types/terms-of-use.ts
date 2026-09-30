export interface LegalPageSection {
  id: string;
  number: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: LegalPageSubsection[];
  callout?: LegalPageCallout;
  table?: LegalPageTable;
}

export interface LegalPageSubsection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface LegalPageCallout {
  type: "info" | "warning";
  title?: string;
  content: string;
}

export interface LegalPageTable {
  headers: string[];
  rows: string[][];
}

export interface LegalPageContact {
  label: string;
  value: string;
}

export interface LegalPageTocItem {
  id: string;
  label: string;
}

export interface LegalPageRelatedLink {
  label: string;
  to: string;
}

export interface LegalPageConfig {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;

  tableOfContents: LegalPageTocItem[];

  sections: LegalPageSection[];

  contact: LegalPageContact[];

  relatedLinks: LegalPageRelatedLink[];
}
