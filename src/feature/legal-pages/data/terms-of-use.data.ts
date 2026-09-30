import type { LegalPageConfig } from "../types/terms-of-use";

export const termsOfUseData: LegalPageConfig = {
  eyebrow: "MailFlex Legal",

  title: "Terms of Use",

  description: "These Terms of Use govern your access to and use of MailFlex, including temporary mailboxes, email receiving, attachments, accounts, and related services.",

  lastUpdated: "30th, Sept 2026",

  tableOfContents: [
    {
      id: "acceptance",
      label: "Acceptance of Terms",
    },
    {
      id: "service",
      label: "About MailFlex",
    },
    {
      id: "eligibility",
      label: "Eligibility",
    },
    {
      id: "guest-mailboxes",
      label: "Guest Mailboxes",
    },
    {
      id: "acceptable-use",
      label: "Acceptable Use",
    },
    {
      id: "email-content",
      label: "Email Content",
    },
    {
      id: "accounts",
      label: "Accounts",
    },
    {
      id: "availability",
      label: "Service Availability",
    },
    {
      id: "intellectual-property",
      label: "Intellectual Property",
    },
    {
      id: "third-party-services",
      label: "Third-Party Services",
    },
    {
      id: "disclaimers",
      label: "Disclaimers",
    },
    {
      id: "limitation",
      label: "Limitation of Liability",
    },
    {
      id: "termination",
      label: "Termination",
    },
    {
      id: "changes",
      label: "Changes to Terms",
    },
    {
      id: "contact",
      label: "Contact",
    },
  ],

  sections: [
    {
      id: "acceptance",
      number: "1",
      title: "Acceptance of Terms",

      paragraphs: ["By accessing or using MailFlex, you agree to be bound by these Terms of Use and our Privacy Policy.", "If you do not agree with these Terms, you must not access or use MailFlex."],
    },

    {
      id: "service",
      number: "2",
      title: "About MailFlex",

      paragraphs: [
        "MailFlex provides online email-related services, including temporary and account-based mailboxes that allow users to receive and access email messages and attachments.",

        "The features available through MailFlex may change over time. We may add, modify, suspend, or remove features as the service develops.",
      ],

      callout: {
        type: "info",
        title: "Service information",
        content: "MailFlex is not intended to be used as a guaranteed permanent email archive unless a specific MailFlex feature explicitly provides that functionality.",
      },
    },

    {
      id: "eligibility",
      number: "3",
      title: "Eligibility",

      paragraphs: [
        "You may use MailFlex only if you are legally permitted to enter into these Terms and use the service under the laws applicable to you.",

        "If you are using MailFlex on behalf of another person or organization, you represent that you have the authority to accept these Terms on their behalf.",
      ],
    },

    {
      id: "guest-mailboxes",
      number: "4",
      title: "Guest Mailboxes",

      paragraphs: [
        "MailFlex may allow users to create temporary mailboxes without creating a permanent account.",

        "Guest mailboxes are intended for temporary use and may be automatically deleted after the applicable retention period.",
      ],

      subsections: [
        {
          title: "Temporary nature",

          paragraphs: [
            "You should not rely on a guest mailbox as a permanent storage location for important communications, records, credentials, or other information that you cannot afford to lose.",
          ],
        },

        {
          title: "Mailbox access",

          paragraphs: [
            "Access to a guest mailbox may depend on browser session information, mailbox identifiers, or other temporary authentication mechanisms. MailFlex cannot guarantee recovery of a guest mailbox if the required access information is lost.",
          ],
        },
      ],
    },

    {
      id: "acceptable-use",
      number: "5",
      title: "Acceptable Use",

      paragraphs: ["You agree to use MailFlex only for lawful purposes and in a manner that does not interfere with the service or harm other users.", "You must not use MailFlex to:"],

      bullets: [
        "Break or attempt to bypass applicable laws or regulations",
        "Send, receive, store, or distribute unlawful content",
        "Attempt to gain unauthorized access to MailFlex or another user's mailbox",
        "Probe, scan, or test the security of MailFlex without authorization",
        "Interfere with or disrupt the operation of the service",
        "Attempt to circumvent usage limits or rate limits",
        "Place unreasonable automated load on MailFlex infrastructure",
        "Distribute malware, malicious code, or harmful software",
        "Conduct phishing, credential theft, fraud, or impersonation",
        "Use MailFlex to facilitate abuse, harassment, or other unlawful activity",
        "Attempt to access or expose another user's private information",
      ],

      callout: {
        type: "warning",
        title: "Abuse may result in termination",
        content: "MailFlex may restrict or terminate access when we reasonably believe the service is being abused, used unlawfully, or used in violation of these Terms.",
      },
    },

    {
      id: "email-content",
      number: "6",
      title: "Email Content",

      paragraphs: [
        "MailFlex may process email messages and attachments that are delivered to its mailboxes in order to provide the service.",

        "You are responsible for the content you receive, access, or otherwise cause to be processed through MailFlex.",
      ],

      subsections: [
        {
          title: "No ownership transfer",

          paragraphs: ["You retain whatever rights you have in the content you submit or receive through MailFlex. These Terms do not transfer ownership of your email content to MailFlex."],
        },

        {
          title: "Responsibility for content",

          paragraphs: ["You are responsible for ensuring that your use of MailFlex does not violate applicable law or the rights of other people or organizations."],
        },
      ],
    },

    {
      id: "accounts",
      number: "7",
      title: "Accounts",

      paragraphs: ["Some MailFlex features may require you to create an account.", "You are responsible for keeping your account credentials and authentication information secure."],

      subsections: [
        {
          title: "Accurate information",

          paragraphs: ["You agree to provide information that is accurate and reasonably current when creating or maintaining an account."],
        },

        {
          title: "Account security",

          paragraphs: ["If you believe your account has been accessed without authorization, you should contact MailFlex as soon as reasonably possible."],
        },
      ],
    },

    {
      id: "availability",
      number: "8",
      title: "Service Availability",

      paragraphs: [
        "We aim to keep MailFlex available and reliable, but we do not guarantee that the service will always be available, uninterrupted, secure, or error-free.",

        "The service may become temporarily unavailable because of maintenance, updates, infrastructure failures, network problems, security incidents, third-party service failures, or other circumstances.",

        "MailFlex may also impose temporary restrictions when necessary to protect the service, its infrastructure, or its users.",
      ],
    },

    {
      id: "intellectual-property",
      number: "9",
      title: "Intellectual Property",

      paragraphs: [
        "The MailFlex software, website, branding, design, logos, interfaces, and other materials provided by MailFlex are owned by or licensed to MailFlex unless otherwise stated.",

        "Except as permitted by applicable law or expressly authorized by MailFlex, you may not copy, modify, distribute, sell, reverse engineer, or otherwise exploit MailFlex's proprietary materials.",
      ],
    },

    {
      id: "third-party-services",
      number: "10",
      title: "Third-Party Services",

      paragraphs: [
        "MailFlex may rely on third-party services and infrastructure to operate certain parts of the platform, including email processing, storage, hosting, authentication, analytics, or monitoring.",

        "Third-party services may have their own terms and privacy policies. Your use of a third-party service may therefore be subject to those additional terms.",

        "MailFlex is not responsible for the availability, security, or practices of third-party services that are outside our control.",
      ],
    },

    {
      id: "disclaimers",
      number: "11",
      title: "Disclaimers",

      paragraphs: [
        'MailFlex is provided on an "as available" and "as is" basis to the extent permitted by applicable law.',

        "We do not guarantee that emails will always be received, delivered, displayed, retained, or accessible without interruption or error.",

        "You are responsible for determining whether MailFlex is appropriate for your intended use.",
      ],

      callout: {
        type: "warning",
        title: "Do not rely on MailFlex for critical data",
        content: "Unless a specific MailFlex feature expressly provides guaranteed retention, you should maintain independent copies of information that is important to you.",
      },
    },

    {
      id: "limitation",
      number: "12",
      title: "Limitation of Liability",

      paragraphs: [
        "To the maximum extent permitted by applicable law, MailFlex and its operators will not be responsible for indirect, incidental, special, consequential, or punitive damages arising from or related to your use of the service.",

        "This may include loss of data, loss of access, loss of communications, business interruption, or other losses resulting from your use of or inability to use MailFlex.",

        "Nothing in these Terms is intended to exclude or limit liability that cannot legally be excluded or limited under applicable law.",
      ],
    },

    {
      id: "termination",
      number: "13",
      title: "Termination",

      paragraphs: [
        "You may stop using MailFlex at any time.",

        "We may suspend or terminate access to MailFlex when reasonably necessary, including where we believe that you have violated these Terms, used the service unlawfully, abused the service, or created a security or operational risk.",
      ],

      subsections: [
        {
          title: "Effect of termination",

          paragraphs: [
            "After termination, you may lose access to your mailbox, messages, attachments, account information, or other service data, subject to applicable retention requirements and our Privacy Policy.",
          ],
        },
      ],
    },

    {
      id: "changes",
      number: "14",
      title: "Changes to These Terms",

      paragraphs: [
        "We may update these Terms from time to time to reflect changes to MailFlex, our services, legal requirements, or other circumstances.",

        'When we make changes, we will update the "Last updated" date shown at the beginning of this page.',

        "If you continue using MailFlex after updated Terms become effective, your continued use of the service will be subject to the updated Terms to the extent permitted by applicable law.",
      ],
    },

    {
      id: "contact",
      number: "15",
      title: "Contact",

      paragraphs: ["If you have questions about these Terms or need to contact MailFlex regarding the service, you can use the contact information below."],
    },
  ],

  contact: [
    {
      label: "Website",
      value: "https://mailflex.vercel.app",
    },
    {
      label: "Contact",
      value: "[YOUR_CONTACT_EMAIL]",
    },
  ],

  relatedLinks: [
    {
      label: "Read our Privacy Policy →",
      to: "/privacy-policy",
    },
  ],
};
