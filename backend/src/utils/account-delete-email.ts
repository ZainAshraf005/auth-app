import { transporter } from "../config/nodeMailer";
import { configData } from "../config/data";

function accountDeletedPlainText(
  name: string,
  dateStr: string,
  supportUrl: string
) {
  return `Hi ${name || "there"},

Your ChatRooms account has been permanently deleted on ${dateStr}.

If this wasn't you, contact support immediately: ${supportUrl}

— ChatRooms Team
`;
}

function accountDeletedHtml(name: string, dateStr: string, supportUrl: string) {
  const safeName = name || "there";
  return `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Account Deleted</title>
  <style>
    /* Client resets */
    body,table,td,a { text-size-adjust:100%; -ms-text-size-adjust:100%; -webkit-text-size-adjust:100%; }
    table,td { mso-table-lspace:0pt; mso-table-rspace:0pt; border-collapse:collapse !important; }
    img { border:0; height:auto; line-height:100%; outline:none; text-decoration:none; }
    body { margin:0 !important; padding:0 !important; background-color:#f6f8fb; }
    a { color:#2563eb; text-decoration:none; }
    /* Responsive */
    @media screen and (max-width:600px) {
      .container { width:100% !important; padding:24px !important; }
      .btn { display:block !important; width:100% !important; }
    }
  </style>
</head>
<body style="background-color:#f6f8fb; margin:0; padding:0;">
  <!-- Preheader (hidden preview text) -->
  <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
    Your ChatRooms account was deleted. If this wasn’t you, contact support immediately.
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" style="padding:32px 12px;">
        <table role="presentation" width="600" class="container" style="width:600px; max-width:600px; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <tr>
            <td style="padding:28px 32px; background:#111827;">
              <h1 style="margin:0; font-family:Arial,Helvetica,sans-serif; color:#ffffff; font-size:20px;">
                ChatRooms
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <h2 style="margin:0 0 12px; font-family:Arial,Helvetica,sans-serif; color:#111827; font-size:22px;">
                Account Deleted
              </h2>
              <p style="margin:0 0 16px; font-family:Arial,Helvetica,sans-serif; color:#374151; font-size:15px; line-height:1.6;">
                Hi ${safeName},
              </p>
              <p style="margin:0 0 16px; font-family:Arial,Helvetica,sans-serif; color:#374151; font-size:15px; line-height:1.6;">
                This is a confirmation that your <strong>ChatRooms</strong> account was permanently deleted on <strong>${dateStr}</strong>.
              </p>
              <p style="margin:0 0 22px; font-family:Arial,Helvetica,sans-serif; color:#374151; font-size:15px; line-height:1.6;">
                If you didn’t make this request, please contact our support team immediately so we can help secure your account.
              </p>

              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <a class="btn" href="${supportUrl}" target="_blank"
                      style="display:inline-block; padding:12px 18px; border-radius:10px; background:#dc2626; color:#ffffff; font-family:Arial,Helvetica,sans-serif; font-size:14px; font-weight:bold;">
                      Contact Support
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:24px 0 0; font-family:Arial,Helvetica,sans-serif; color:#6b7280; font-size:13px; line-height:1.6;">
                This is an automated message. Replies to this email are not monitored.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 32px; background:#f3f4f6; text-align:center;">
              <p style="margin:0; font-family:Arial,Helvetica,sans-serif; color:#9ca3af; font-size:12px;">
                © ${new Date().getFullYear()} ChatRooms. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

export async function sendAccountDeletedEmail(params: {
  email: string;
  name?: string;
  deletedAt?: Date;
  supportUrl?: string;
}) {
  const { email, name, deletedAt, supportUrl } = params;

  const dateStr = (deletedAt ? deletedAt : new Date()).toLocaleString("en-US", {
    timeZone: "Asia/Karachi",
  });

  const supportLink = supportUrl || "chatRooms official";

  const text = accountDeletedPlainText(name || "there", dateStr, supportLink);
  const html = accountDeletedHtml(name || "there", dateStr, supportLink);

  await transporter.sendMail({
    from: `"ChatRooms" <${configData.EMAIL_USER}>`,
    to: email,
    subject: "Your ChatRooms account has been deleted",
    text,
    html,
  });
}
