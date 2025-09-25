import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

// connect();
export async function POST(request: NextRequest) {
  await connect();
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return NextResponse.json(
      { message: "User created successfully", data: newUser },
      { status: 200 }
    );
  } catch (error: unknown) {
    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// export async function GET(request: Request) {
//   return NextResponse.json({message: "Hello from Signup API"});
// }
// export async function POST(request: Request) {
//   const {username, password} = await request.json();
//   return NextResponse.json({username, password});
// }
//   try {
//     const {username, email, password} = await request.json();
//     const existingUser = await
//         User.find
//         .find
//         .one
//         ({email});
//     if (existingUser) {
//       return NextResponse.json(
//           {message: "User already exists"},

//           {status: 400},
//       );
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       username,
//       email,

//       password: hashedPassword,
//     });
//     await newUser.save();
//     return NextResponse.json(
//         {message: "User created successfully"},
