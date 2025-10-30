import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    // 🔐 Environment variables
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
    const GMAIL_PASSKEY = process.env.GMAIL_PASSKEY;

    // ✅ Validate all keys
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID || !EMAIL_ADDRESS || !GMAIL_PASSKEY) {
      return new Response(JSON.stringify({ success: false, message: "Missing environment variables" }), { status: 400 });
    }

    // 💬 Telegram Message
    const telegramMsg = `📬 New message from ${name}\n\n📧 Email: ${email}\n\n💭 Message:\n${message}`;
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const telegramResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: telegramMsg }),
    });

    const telegramData = await telegramResponse.json();

    // 📧 Send email via Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_ADDRESS,
        pass: GMAIL_PASSKEY,
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact" <${EMAIL_ADDRESS}>`,
      to: EMAIL_ADDRESS,
      subject: `New Message From ${name}`,
      html: `
        <h2>New Portfolio Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <blockquote>${message}</blockquote>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({
      success: true,
      message: "Message sent to Telegram and Email successfully",
      telegram: telegramData,
    }), { status: 200 });

  } catch (error) {
    console.error("Error in contact route:", error);
    return new Response(JSON.stringify({ success: false, message: "Server error", error: error.message }), { status: 500 });
  }
}
