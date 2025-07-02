import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // Use env variable
    port: Number(process.env.SMTP_PORT) || 587, // Use env variable or default 587
    secure: false, // true if port 465
    auth: {
      user: process.env.EMAIL_USER, // Your email user from env
      pass: process.env.EMAIL_PASS, // Your email password/app password from env
    },
  });

  await transporter.sendMail({
    from: `"TinyThought" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
};
