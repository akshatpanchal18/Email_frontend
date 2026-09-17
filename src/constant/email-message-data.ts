import type { EmailMessage } from "../store/types/mailbox";

export const dummyMessages: EmailMessage[] = [
  {
    id: "msg_001",
    mailbox_id: "mailbox_001",
    message_id: "<welcome-001@example.com>",
    from: "Sarah Johnson <sarah@acme.com>",
    to: "you@example.com",
    subject: "Welcome to Acme — Your account is ready!",
    text: `
Hi there,

Welcome to Acme! Your account has been successfully created.

You can now log in to your dashboard and start using all the available features.

Best regards,
Sarah Johnson
Acme Team
    `.trim(),

    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to Acme</title>
</head>

<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;color:#111827;">

  <div style="max-width:640px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">

    <div style="background:#2563eb;padding:32px;text-align:center;">
      <h1 style="margin:0;color:#ffffff;font-size:28px;">
        Welcome to Acme!
      </h1>

      <p style="margin:10px 0 0;color:#dbeafe;font-size:15px;">
        Your account is ready to use
      </p>
    </div>

    <div style="padding:32px;">

      <p style="font-size:16px;line-height:1.6;">
        Hi there,
      </p>

      <p style="font-size:16px;line-height:1.6;color:#374151;">
        We're excited to have you with us. Your Acme account has been
        successfully created and you can now access your dashboard.
      </p>

      <div style="margin:28px 0;text-align:center;">
        <a
          href="https://example.com/dashboard"
          style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;"
        >
          Open Dashboard
        </a>
      </div>

      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:20px;margin-top:24px;">

        <h3 style="margin:0 0 12px;font-size:16px;color:#111827;">
          What's next?
        </h3>

        <ul style="margin:0;padding-left:20px;color:#4b5563;line-height:1.8;">
          <li>Complete your profile</li>
          <li>Explore your dashboard</li>
          <li>Invite your team members</li>
          <li>Configure your notification preferences</li>
        </ul>

      </div>

      <p style="margin-top:28px;font-size:14px;color:#6b7280;line-height:1.6;">
        If you didn't create this account, please contact our support team
        immediately.
      </p>

      <p style="font-size:15px;line-height:1.6;">
        Best regards,<br />
        <strong>Sarah Johnson</strong><br />
        Acme Team
      </p>

    </div>

    <div style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">

      <p style="margin:0;font-size:12px;color:#9ca3af;">
        © 2026 Acme Inc. All rights reserved.
      </p>

    </div>

  </div>

</body>
</html>
    `.trim(),

    raw_size_bytes: 12450,
    owner_id: "user_001",
    is_read: false,

    receivedAt: "2026-09-11T08:30:00.000Z",
    createdAt: "2026-09-11T08:30:00.000Z",
    expiresAt: "2026-10-11T08:30:00.000Z",

    attachments: [
      {
        id: "attachment_001",
        message_id: "msg_001",
        filename: "getting-started.pdf",
        content_type: "application/pdf",
        size: 245760,
        url: "https://example.com/files/getting-started.pdf",
        storageKey: "emails/msg_001/getting-started.pdf",
      },
      {
        id: "attachment_002",
        message_id: "msg_001",
        filename: "acme-logo.png",
        content_type: "image/png",
        size: 48320,
        url: "https://example.com/files/acme-logo.png",
        storageKey: "emails/msg_001/acme-logo.png",
      },
    ],
  },

  {
    id: "msg_002",
    mailbox_id: "mailbox_001",
    message_id: "<invoice-002@billing.example.com>",
    from: "Billing Team <billing@example.com>",
    to: "you@example.com",
    subject: "Your September invoice is available",

    text: `
Hello,

Your September invoice is now available.

Invoice: INV-2026-0911
Amount: $149.00
Due date: September 30, 2026

Thank you,
Billing Team
    `.trim(),

    html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#1f2937;">

  <div style="max-width:600px;margin:40px auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;">

    <div style="padding:24px 28px;border-bottom:1px solid #e5e7eb;">
      <strong style="font-size:20px;color:#111827;">
        ACME BILLING
      </strong>
    </div>

    <div style="padding:30px;">

      <h2 style="margin-top:0;">
        Your invoice is ready
      </h2>

      <p style="color:#4b5563;line-height:1.6;">
        Hello,
      </p>

      <p style="color:#4b5563;line-height:1.6;">
        Your invoice for September 2026 is now available.
        Please review the details below.
      </p>

      <table style="width:100%;border-collapse:collapse;margin:24px 0;">

        <tr>
          <td style="padding:12px;border-bottom:1px solid #e5e7eb;color:#6b7280;">
            Invoice
          </td>

          <td style="padding:12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:600;">
            INV-2026-0911
          </td>
        </tr>

        <tr>
          <td style="padding:12px;border-bottom:1px solid #e5e7eb;color:#6b7280;">
            Amount
          </td>

          <td style="padding:12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:600;">
            $149.00
          </td>
        </tr>

        <tr>
          <td style="padding:12px;color:#6b7280;">
            Due date
          </td>

          <td style="padding:12px;text-align:right;font-weight:600;color:#dc2626;">
            September 30, 2026
          </td>
        </tr>

      </table>

      <div style="text-align:center;margin:28px 0;">

        <a
          href="https://example.com/invoices/INV-2026-0911"
          style="background:#111827;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:7px;display:inline-block;"
        >
          View Invoice
        </a>

      </div>

      <p style="font-size:13px;color:#9ca3af;line-height:1.5;">
        This is an automated billing notification.
        Please do not reply directly to this email.
      </p>

    </div>

  </div>

</body>
</html>
    `.trim(),

    raw_size_bytes: 8420,
    owner_id: "user_001",
    is_read: true,

    receivedAt: "2026-09-10T14:15:00.000Z",
    createdAt: "2026-09-10T14:15:00.000Z",
    expiresAt: "2026-10-10T14:15:00.000Z",

    attachments: [
      {
        id: "attachment_003",
        message_id: "msg_002",
        filename: "invoice-INV-2026-0911.pdf",
        content_type: "application/pdf",
        size: 184320,
        url: "https://example.com/files/invoice-INV-2026-0911.pdf",
        storageKey: "emails/msg_002/invoice-INV-2026-0911.pdf",
      },
    ],
  },

  {
    id: "msg_003",
    mailbox_id: "mailbox_001",
    message_id: "<meeting-003@company.com>",
    from: "John Smith <john@company.com>",
    to: "you@example.com",
    subject: "Project kickoff — Meeting details",

    text: `
Hi,

Here are the details for our project kickoff meeting.

Date: September 15, 2026
Time: 10:00 AM
Location: Google Meet

See you there!

John
    `.trim(),

    html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">

  <div style="max-width:620px;margin:30px auto;background:#ffffff;border-radius:12px;border:1px solid #e5e7eb;padding:32px;">

    <div style="display:inline-block;background:#dbeafe;color:#1d4ed8;padding:6px 12px;border-radius:20px;font-size:12px;font-weight:bold;">
      PROJECT MEETING
    </div>

    <h1 style="font-size:24px;color:#111827;margin:20px 0 10px;">
      Project Kickoff
    </h1>

    <p style="color:#4b5563;line-height:1.6;">
      Hi,
    </p>

    <p style="color:#4b5563;line-height:1.6;">
      We're ready to kick off the project.
      Here are the meeting details:
    </p>

    <div style="background:#f9fafb;border-radius:10px;padding:20px;margin:24px 0;">

      <p style="margin:0 0 12px;">
        <strong>Date:</strong> September 15, 2026
      </p>

      <p style="margin:0 0 12px;">
        <strong>Time:</strong> 10:00 AM
      </p>

      <p style="margin:0;">
        <strong>Location:</strong> Google Meet
      </p>

    </div>

    <a
      href="https://meet.google.com/example"
      style="display:inline-block;background:#16a34a;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:7px;font-weight:600;"
    >
      Join Meeting
    </a>

    <hr style="border:0;border-top:1px solid #e5e7eb;margin:30px 0;" />

    <p style="font-size:13px;color:#6b7280;">
      Please review the attached project brief before the meeting.
    </p>

    <p style="color:#374151;">
      See you there!<br />
      <strong>John Smith</strong>
    </p>

  </div>

</body>
</html>
    `.trim(),

    raw_size_bytes: 10240,
    owner_id: "user_001",
    is_read: false,

    receivedAt: "2026-09-10T09:45:00.000Z",
    createdAt: "2026-09-10T09:45:00.000Z",
    expiresAt: "2026-10-10T09:45:00.000Z",

    attachments: [
      {
        id: "attachment_004",
        message_id: "msg_003",
        filename: "project-brief.pdf",
        content_type: "application/pdf",
        size: 512000,
        url: "https://example.com/files/project-brief.pdf",
        storageKey: "emails/msg_003/project-brief.pdf",
      },
      {
        id: "attachment_005",
        message_id: "msg_003",
        filename: "project-timeline.xlsx",
        content_type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        size: 128000,
        url: "https://example.com/files/project-timeline.xlsx",
        storageKey: "emails/msg_003/project-timeline.xlsx",
      },
    ],
  },

  {
    id: "msg_004",
    mailbox_id: "mailbox_001",
    message_id: "<newsletter-004@techweekly.com>",
    from: "Tech Weekly <newsletter@techweekly.com>",
    to: "you@example.com",
    subject: "🚀 Tech Weekly — 5 things you should know",

    text: `
Here are this week's top technology stories.

1. AI continues to evolve
2. New developer tools
3. Cloud computing trends
4. Cybersecurity updates
5. What's coming next
    `.trim(),

    html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#111827;font-family:Arial,Helvetica,sans-serif;">

  <div style="max-width:650px;margin:30px auto;background:#ffffff;">

    <div style="background:#7c3aed;padding:35px;text-align:center;">

      <h1 style="color:#ffffff;margin:0;font-size:30px;">
        TECH WEEKLY
      </h1>

      <p style="color:#ede9fe;margin:8px 0 0;">
        September 11, 2026
      </p>

    </div>

    <div style="padding:30px;">

      <h2 style="margin-top:0;">
        🚀 5 things you should know this week
      </h2>

      <div style="border-bottom:1px solid #e5e7eb;padding:18px 0;">
        <h3 style="margin:0 0 8px;">
          1. AI continues to evolve
        </h3>

        <p style="margin:0;color:#6b7280;line-height:1.5;">
          The latest developments in artificial intelligence are changing
          how teams build and ship software.
        </p>
      </div>

      <div style="border-bottom:1px solid #e5e7eb;padding:18px 0;">
        <h3 style="margin:0 0 8px;">
          2. New developer tools
        </h3>

        <p style="margin:0;color:#6b7280;line-height:1.5;">
          Developers are getting access to faster and more powerful tools.
        </p>
      </div>

      <div style="border-bottom:1px solid #e5e7eb;padding:18px 0;">
        <h3 style="margin:0 0 8px;">
          3. Cloud computing trends
        </h3>

        <p style="margin:0;color:#6b7280;line-height:1.5;">
          Cloud infrastructure continues to become more flexible and
          cost-efficient.
        </p>
      </div>

      <div style="border-bottom:1px solid #e5e7eb;padding:18px 0;">
        <h3 style="margin:0 0 8px;">
          4. Cybersecurity updates
        </h3>

        <p style="margin:0;color:#6b7280;line-height:1.5;">
          Security remains one of the most important areas for engineering
          teams.
        </p>
      </div>

      <div style="padding:18px 0;">
        <h3 style="margin:0 0 8px;">
          5. What's coming next
        </h3>

        <p style="margin:0;color:#6b7280;line-height:1.5;">
          Here's what we're watching for the rest of the month.
        </p>
      </div>

      <div style="text-align:center;margin-top:25px;">

        <a
          href="https://example.com/newsletter"
          style="color:#7c3aed;font-weight:bold;text-decoration:none;"
        >
          Read the full newsletter →
        </a>

      </div>

    </div>

    <div style="background:#f9fafb;text-align:center;padding:20px;">

      <p style="font-size:12px;color:#9ca3af;margin:0;">
        You received this email because you subscribed to Tech Weekly.
      </p>

    </div>

  </div>

</body>
</html>
    `.trim(),

    raw_size_bytes: 15680,
    owner_id: "user_001",
    is_read: true,

    receivedAt: "2026-09-09T16:20:00.000Z",
    createdAt: "2026-09-09T16:20:00.000Z",
    expiresAt: "2026-10-09T16:20:00.000Z",

    attachments: [],
  },
];
