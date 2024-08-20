import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import base64url from "base64url";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import EmailTemplate from "@/components/ui/email-template";
import { nameWebsite } from "@/lib/nameWebsite";
export async function PUT(request) {
  try {
    //extract the data
    const { email } = await request.json();
    //Check if the user Already exists in the db
    const existingUserEmailVerifiedFalse = await db.user.findUnique({
      where: { email, emailVerified: false },
    });
    if (existingUserEmailVerifiedFalse) {
      return NextResponse.json(
        {
          data: null,
          message: `อีเมลนี้ยังไม่ได้ยืนยัน`,
        },
        { status: 404 }
      );
    }
    const existingUser = await db.user.findUnique({
      where: {
        email,
        emailVerified: true,
      },
    });
    if (!existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: `ไม่พบผู้ใช้งานนี้`,
        },
        { status: 404 }
      );
    }
    //Generate Token
    // Generate a random UUID (version 4)
    const rawToken = uuidv4();
    const token = base64url.encode(rawToken);

    const userId = existingUser.id;
    const subject = `คุณได้เปลี่ยนรหัสผ่านใหม่ในเว็บเซ็บของ ${nameWebsite} โปรดยืนยันบัญชีของคุณ`;
    const linkText = "เปลี่ยนรหัสผ่านของคุณ";
    const description = "โปรดยืนยันรหัสผ่านใหม่ของคุณ";
    const name = existingUser.name;
    const redirectUrl = `/reset-password?token=${token}&id=${userId}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const emailHtml = render(
      EmailTemplate({ name, redirectUrl, linkText, subject, description })
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

    await new Promise((resolve, reject) => {
      transporter.sendMail(options, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(info);
        }
      });
    });

    return NextResponse.json(
      {
        data: null,
        message: "อีเมลของคุณได้ถูกส่งเรียบร้อยแล้ว",
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
