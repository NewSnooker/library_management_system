import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import base64url from "base64url";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import EmailTemplate from "@/components/ui/email-template";
import db from "@/lib/db";

export async function POST(request) {
  const { username, email, password } = await request.json();
  try {

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: "User Already exists",
        },
        { status: 409 }
      );
    }
    // Encrypt the Password => bycrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    const rawToken = uuidv4();
    // Encode the token using Base64 URL-safe format
    const token = base64url.encode(rawToken);

    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        verificationToken: token,
      },
    });

    const userId = newUser.id;
    await db.userProfile.create({
      data: {
        username,
        emailAddress: email,
        userId,
      },
    });
    const nameWebsite = "Library Management System";
    const subject = `คุณได้สมัครเป็นสมาชิกในเว็บไซต์ของ ${nameWebsite} โปรดยืนยันบัญชีของคุณ`;
    const linkText = "ยืนยันบัญชีของคุณ";
    const description = "ขอขอบคุณที่สร้างบัญชีกับเรา โปรดยืนยันบัญชีของคุณ";

    const redirectUrl = `/onboarding/${userId}?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const emailHtml = render(
      EmailTemplate({ username, redirectUrl, linkText, subject, description })
    );

    const options = {
      from: `${nameWebsite} <${process.env.NODEMAILER_USER}>`,
      to: email,
      subject: subject,
      html: emailHtml,
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "High",
      },
    };

    transporter.sendMail(options, (err, info) => {
      if (err) {
        console.log("err", err);
      } else {
        console.log("Send: ", info.response);
      }
    });

    return NextResponse.json(
      {
        data: newUser,
        message: "User Created Successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Server Error: Something Went wrong",
      },
      { status: 500 }
    );
  }
}
