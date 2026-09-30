import type { PrivacyPolicyConfig } from "../types/privacy-policy";

const MAILFLEX_WEB = "mailflex.vercel.app";
export const privacyPolicyData: PrivacyPolicyConfig = {
  eyebrow: "MailFlex Legal",

  title: "Privacy Policy",

  description: "This Privacy Policy explains how MailFlex collects, uses, stores, and protects information when you use our website, temporary mailboxes, email services, and related features.",

  lastUpdated: "30th, Sept 2026",

  websiteUrl: MAILFLEX_WEB,
  contact: [
    // {
    //   label: "Legal entity",
    //   value: "[LEGAL_ENTITY_NAME]",
    // },
    // {
    //   label: "Privacy email",
    //   value: "[PRIVACY_EMAIL]",
    // },
    {
      label: "General contact",
      value: "[CONTACT_EMAIL]",
    },
    {
      label: "Website",
      value: MAILFLEX_WEB,
    },
    // {
    //   label: "Business address",
    //   value: "[BUSINESS_ADDRESS]",
    // },
  ],
  tableOfContents: [
    {
      id: "information-we-collect",
      label: "Information We Collect",
    },
    {
      id: "guest-mailboxes",
      label: "Guest Mailboxes",
    },
    {
      id: "messages-attachments",
      label: "Messages & Attachments",
    },
    {
      id: "how-we-use-information",
      label: "How We Use Information",
    },
    {
      id: "cookies-sessions",
      label: "Cookies & Sessions",
    },
    {
      id: "retention-deletion",
      label: "Retention & Deletion",
    },
    {
      id: "third-party-services",
      label: "Third-Party Services",
    },
    {
      id: "security",
      label: "Security",
    },
    {
      id: "your-rights",
      label: "Your Rights",
    },
    {
      id: "changes",
      label: "Policy Changes",
    },
    {
      id: "contact",
      label: "Contact",
    },
  ],

  sections: [
    {
      id: "information-we-collect",
      number: "1",
      title: "Information We Collect",

      paragraphs: ["The information we collect depends on how you use MailFlex. This may include the following categories."],

      subsections: [
        {
          title: "Account information",

          paragraphs: ["If you create an account, we may collect information such as your email address, account credentials, profile information, and other information you voluntarily provide."],
        },

        {
          title: "Mailbox information",

          paragraphs: ["When you create or use a MailFlex mailbox, we process information required to create and operate that mailbox, including the mailbox address and associated mailbox metadata."],
        },

        {
          title: "Technical information",

          paragraphs: [
            "We may automatically receive technical information such as IP address, browser type, device information, operating system, timestamps, and basic service activity information.",
          ],
        },

        {
          title: "Information you provide",

          paragraphs: ["We may collect information that you voluntarily provide when contacting us, reporting an issue, requesting support, or otherwise interacting with MailFlex."],
        },
      ],
    },

    {
      id: "guest-mailboxes",
      number: "2",
      title: "Guest Mailboxes",

      paragraphs: [
        'MailFlex may allow you to create and use a temporary mailbox without creating a permanent account. These are referred to as "Guest Mailboxes."',

        "A Guest Mailbox may be associated with a temporary mailbox address, session information, messages received by the mailbox, attachments, and technical information necessary to provide the service.",
      ],

      callout: {
        type: "warning",
        title: "Important",
        content:
          "Guest Mailboxes are intended for temporary use. Do not use MailFlex to receive or store information that requires guaranteed long-term preservation unless the applicable MailFlex service explicitly provides that functionality.",
      },

      subsections: [
        {
          title: "Guest mailbox accounts",

          paragraphs: [
            "If you create an account or otherwise convert a guest experience into an account-based mailbox, the information associated with the mailbox may be handled according to the applicable account and mailbox retention rules.",
          ],
        },
      ],
    },

    {
      id: "messages-attachments",
      number: "3",
      title: "Email Messages and Attachments",

      paragraphs: [
        "MailFlex processes email messages that are delivered to MailFlex mailboxes so that we can receive, store, display, and provide access to those messages.",

        "Depending on the email, messages may contain information such as:",
      ],

      bullets: [
        "Sender and recipient email addresses",
        "Subject lines",
        "Message body content",
        "Message headers and delivery information",
        "Dates and timestamps",
        "Attachments and attachment metadata",
      ],

      subsections: [
        {
          title: "Attachments",

          paragraphs: ["Attachments may be stored separately from the message body. This may include the attachment filename, content type, file size, storage identifier, and the attachment itself."],
        },

        {
          title: "Content ownership",

          paragraphs: [
            "MailFlex does not claim ownership of the content of emails delivered to your mailbox. You are responsible for ensuring that your use of the service and the content you receive or submit complies with applicable law and MailFlex's Terms of Use.",
          ],
        },
      ],
    },

    {
      id: "how-we-use-information",
      number: "4",
      title: "How We Use Information",

      paragraphs: ["We may use collected information for purposes including:"],

      bullets: [
        "Providing and operating MailFlex mailboxes",
        "Receiving, processing, and displaying email messages",
        "Delivering and providing access to attachments",
        "Maintaining authentication and user sessions",
        "Protecting the service against abuse, fraud, and unauthorized access",
        "Diagnosing technical problems and improving reliability",
        "Responding to support requests",
        "Communicating important service or security information",
        "Complying with applicable legal obligations",
      ],

      subsections: [
        {
          title: "Email content",

          paragraphs: [
            "We do not use the content of your messages for purposes unrelated to providing, securing, maintaining, or improving the MailFlex service except where permitted or required by applicable law.",
          ],
        },
      ],
    },

    {
      id: "cookies-sessions",
      number: "5",
      title: "Cookies and Session Data",

      paragraphs: ["MailFlex may use cookies, local browser storage, session identifiers, or similar technologies to operate the service."],

      subsections: [
        {
          title: "Essential cookies and sessions",

          paragraphs: ["Some cookies or session mechanisms are necessary to keep you authenticated, maintain security, remember session state, and provide core functionality."],
        },

        {
          title: "Guest sessions",

          paragraphs: ["Guest Mailboxes may use temporary session information so that your browser can continue accessing the mailbox during the applicable session period."],
        },

        {
          title: "Analytics and optional technologies",

          paragraphs: [
            "If MailFlex uses analytics, advertising, or other optional technologies, additional information about those technologies may be provided through applicable cookie controls or notices.",
          ],
        },

        {
          title: "Browser controls",

          paragraphs: ["You can configure your browser to restrict or block cookies. However, disabling certain essential cookies may prevent parts of MailFlex from functioning correctly."],
        },
      ],
    },

    {
      id: "retention-deletion",
      number: "6",
      title: "Data Retention and Deletion",

      paragraphs: [
        "We retain information only for as long as reasonably necessary for the purposes described in this Privacy Policy, unless a longer retention period is required by law or necessary to resolve disputes, enforce agreements, or protect our legal interests.",
      ],

      subsections: [
        {
          title: "Guest Mailboxes",

          paragraphs: ["Guest mailbox data may be automatically deleted after the applicable temporary mailbox or retention period expires. The exact retention period should be specified here:"],
        },

        {
          title: "Account Mailboxes",

          paragraphs: [
            "Account-associated mailbox data may be retained while the account and mailbox remain active, subject to the retention rules applicable to the specific MailFlex service.",

            "When data is deleted, it may take additional time for backups, caches, logs, or other secondary systems to completely remove the information.",
          ],
        },
      ],

      callout: {
        type: "info",
        title: "Guest mailbox retention",
        content: "N/A",
      },
    },

    {
      id: "third-party-services",
      number: "7",
      title: "Third-Party Services",

      paragraphs: [
        "MailFlex may rely on third-party providers to operate parts of the service. These providers may process information on our behalf and may have their own privacy practices.",

        "Depending on the features you use, these providers may include services for:",
      ],

      bullets: [
        "Email delivery and inbound email processing",
        "Cloud or object storage",
        "Database and infrastructure hosting",
        "Authentication and security",
        "Analytics and monitoring",
        "Customer support",
        "Advertising, where applicable",
      ],

      subsections: [
        {
          title: "Current service providers",

          paragraphs: ["The following providers should be replaced with the providers actually used by your production MailFlex deployment."],
        },
      ],

      table: {
        headers: ["Provider", "Purpose"],

        rows: [
          ["Mailgun", "Email receiving/delivery"],
          ["Cloudinary", "Attachment/object storage"],
          ["Vercel", "Application/infrastructure hosting"],
        ],
      },
    },

    {
      id: "security",
      number: "8",
      title: "Security",

      paragraphs: [
        "We use reasonable technical and organizational measures designed to protect information against unauthorized access, alteration, disclosure, or destruction.",

        "These measures may include authentication controls, secure session handling, access controls, encryption in transit, infrastructure security controls, logging, and monitoring.",

        "However, no internet-based service can guarantee absolute security. You should avoid sending highly sensitive information through a temporary mailbox unless you have determined that MailFlex is appropriate for that purpose.",
      ],
    },

    {
      id: "your-rights",
      number: "9",
      title: "Your Privacy Rights",

      paragraphs: ["Depending on where you live and the laws applicable to you, you may have rights relating to your personal information. These may include the right to:"],

      bullets: [
        "Request access to certain personal information",
        "Request correction of inaccurate information",
        "Request deletion of eligible information",
        "Object to or restrict certain processing",
        "Request a copy of certain information",
        "Withdraw consent where processing is based on consent",
      ],

      subsections: [
        {
          title: "Submitting a request",

          paragraphs: [
            "To submit a privacy request, contact us using the details provided in the Contact section below. We may need to verify your identity before completing certain requests.",

            "Some requests may be limited by applicable law or by our legitimate need to retain information for security, legal, fraud-prevention, or operational purposes.",
          ],
        },
      ],
    },

    {
      id: "changes",
      number: "10",
      title: "Changes to This Policy",

      paragraphs: [
        "We may update this Privacy Policy from time to time to reflect changes to MailFlex, our data practices, legal requirements, or the services we use.",

        'When we make changes, we will update the "Last updated" date at the beginning of this page. Where required by applicable law, we will provide additional notice.',
      ],
    },

    {
      id: "contact",
      number: "11",
      title: "Contact Us",

      paragraphs: ["If you have questions about this Privacy Policy or want to submit a privacy-related request, contact MailFlex using the information below."],
    },
  ],

  relatedLinks: [
    {
      label: "Read our Terms of Use →",
      to: "/terms-of-use",
    },
  ],
};
