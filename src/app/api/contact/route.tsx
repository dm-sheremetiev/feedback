import { NextResponse, NextRequest } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(request: NextRequest) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",

    auth: {
      user: process.env.NEXT_PUBLIC_MAIL_USERNAME,
      pass: process.env.NEXT_PUBLIC_MAIL_PASSWORD,
    },
  });

  const formData = await request.formData();
  const name = formData.get("text");

  try {
    await transporter.sendMail({
      from: "dmytriy.sheremetiev@gmail.com",
      to: "dmytriy.sheremetiev@gmail.com",
      subject: `Фідбек від співробітників `,
      html: `
        <p>Фідбек: ${name}</p>
        `,
    });

    return NextResponse.json({ message: "Success: email was sent" });
  } catch (error) {
    console.log(error);
    NextResponse.json({ message: "COULD NOT SEND MESSAGE" });
  }
}
