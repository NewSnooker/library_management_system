import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import base64url from "base64url";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import EmailTemplate from "@/components/ui/email-template";
export async function PUT(request) {
  try {
    //extract the data
    const { email } = await request.json();
    //Check if the user Already exists in the db
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: `User Not Found`,
        },
        { status: 404 }
      );
    }
    //Generate Token
    // Generate a random UUID (version 4)
    const rawToken = uuidv4();
    const token = base64url.encode(rawToken);
    const nameWebsite = "Library Management System";

    const userId = existingUser.id;
    const username = existingUser.username;
    const subject = `คุณได้เปลี่ยนรหัสผ่านใหม่ในเว็บไซต์ของ ${nameWebsite} โปรดยืนยันบัญชีของคุณ`;
    const linkText = "เปลี่ยนรหัสผ่านของคุณ";
    const description = "โปรดยืนยันรหัสผ่านใหม่ของคุณ";
    const redirectUrl = `reset-password?token=${token}&id=${userId}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.APP_NODEMAILER_PASSWORD,
      },
    });

    const emailHtml = render(
      EmailTemplate({ username, redirectUrl, linkText, subject, description })
    );

    const options = {
      from: ` ${nameWebsite} <${process.env.NODEMAILER_USER}>`,
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
        data: null,
        message: "User Updated Password Successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Server Error: Something went wrong",
      },
      { status: 500 }
    );
  }
}
