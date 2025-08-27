import { configData } from "../config/data";
import { transporter } from "../config/nodeMailer"; // adjust path to your transporter

type OtpType = "reset" | "verify";

export async function sendOtpEmail(email: string, otp: number, type: OtpType) {
  const isReset = type === "reset";

  const subject = isReset
    ? "🔑 Password Reset OTP"
    : "📧 Email Verification OTP";

  const heading = isReset
    ? "Password Reset Request"
    : "Verify Your Email Address";

  const message = isReset
    ? "Your One-Time Password (OTP) for resetting your password is:"
    : "Your One-Time Password (OTP) for verifying your email is:";

  return await transporter.sendMail({
    from: {
      name: "ChatRooms",
      address: configData.EMAIL_USER,
    },
    to: email,
    subject,
    text: `Hello,

${isReset ? "Password Reset" : "Email Verification"}:

${message} ${otp}

⚠️ This code will expire in 5 minutes. Please do not share it with anyone.

If you didn’t request this, you can safely ignore this email.

Best regards,  
ChatRooms Team`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2c3e50;">${heading}</h2>
        <p>Hello,</p>
        <p>${message}</p>
        <div style="background: #f4f4f4; padding: 12px; font-size: 18px; font-weight: bold; text-align: center; border-radius: 6px;">
          ${otp}
        </div>
        <p style="margin-top: 15px;">⚠️ This code will expire in <strong>5 minutes</strong>. Please do not share it with anyone.</p>
        <p>If you didn’t request this, you can safely ignore this email.</p>
        <br/>
        <p style="font-size: 14px; color: #888;">Best regards,<br/>ChatRooms Team</p>
      </div>
    `,
  });
}
