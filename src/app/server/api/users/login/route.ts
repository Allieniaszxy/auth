import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  await connect();
  try {
    const reBody = await request.json();
    const { email, password } = reBody;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { message: "User does not exists" },
        { status: 400 }
      );
    }

    // check password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }
    // create a session and jwt token later
    const tokenData = {
      id: existingUser._id,
      email: existingUser.email,
      username: existingUser.username,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const NextResponseWithCookie = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );
    NextResponseWithCookie.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 1 day
    });

    return NextResponseWithCookie;
  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
