import nodemailer from "nodemailer";

let testAccount = null;
let transporter = null;

// Create Ethereal test account ONCE
async function initEthereal() {
  if (!testAccount) {
    testAccount = await nodemailer.createTestAccount();

transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass
  },
  tls: {
    rejectUnauthorized: false
  }
});

    console.log("Ethereal test account created:");
    console.log("User:", testAccount.user);
    console.log("Pass:", testAccount.pass);
  }
}

export async function sendEmail(to, subject, html) {
  await initEthereal();

  const info = await transporter.sendMail({
    from: `"Poetry Subscription" <no-reply@example.com>`,
    to,
    subject,
    html
  });

  console.log("Email sent. Preview URL:");
  console.log(nodemailer.getTestMessageUrl(info));

const emailPreviewUrl = nodemailer.getTestMessageUrl(info);
return emailPreviewUrl;

}

export default sendEmail;