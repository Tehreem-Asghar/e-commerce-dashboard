import dbConnect from "@/database/dbConnect";
import { user } from "@/model/User";
import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
    await dbConnect();
    const { _id } = await req.json();
  
    const users = await user.findOne({ _id }).exec();
    if (!users) {
      return new Response(
        JSON.stringify({ message: "User not found" }),
        { status: 404, headers: { "content-type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({ user: users }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }
  