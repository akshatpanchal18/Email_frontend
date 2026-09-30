export interface PrivacyPolicySection {
  id: string;
  number: string;
  title: string;
  paragraphs?: string[];
  subsections?: PrivacyPolicySubsection[];
  bullets?: string[];
  callout?: PrivacyPolicyCallout;
  table?: PrivacyPolicyTable;
}

export interface PrivacyPolicySubsection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface PrivacyPolicyCallout {
  type: "info" | "warning";
  title?: string;
  content: string;
}

export interface PrivacyPolicyTable {
  headers: string[];
  rows: string[][];
}

export interface PrivacyPolicyContact {
  label: string;
  value: string;
}

export interface PrivacyPolicyConfig {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  websiteUrl: string;

  tableOfContents: PrivacyPolicyTocItem[];

  sections: PrivacyPolicySection[];

  contact: PrivacyPolicyContact[];

  relatedLinks: PrivacyPolicyRelatedLink[];
}

export interface PrivacyPolicyTocItem {
  id: string;
  label: string;
}

export interface PrivacyPolicyRelatedLink {
  label: string;
  to: string;
}
