import dbConnect  from "@/database/dbConnect";
import {user} from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, address, phone  } = await req.json();
    await dbConnect();

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "admin already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await user.create({ name, email, password: hashedPassword, role: "admin" , address, phone});

    return NextResponse.json({ message: "admin registered." }, { status: 201 });
  } catch (error) {
    console.error("Error registering admin:", error);
    return NextResponse.json(
      { message: "An error occurred while registering the admin." },
      { status: 500 }
    );
  }
}





