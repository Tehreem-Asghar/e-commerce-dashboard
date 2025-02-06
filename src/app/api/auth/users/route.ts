import { NextResponse } from 'next/server';
import dbConnect from '@/database/dbConnect';
import { user } from '@/model/User';

export async function GET() {
  await dbConnect();

  try {
    const users = await user.find();

    if (!users) {
      return NextResponse.json({ message: 'Users not found' }, { status: 404 });
    }

    // return NextResponse.json({ message: 'Users fetched successfully', users });

    return NextResponse.json(
      { message: "Users fetched successfully", users },
      { status: 200, headers: { 'Cache-Control': 'no-store' } } // No cache
    );

  } catch (error) {
    return NextResponse.json({ message: 'Error fetching users', error }, { status: 500 });
  }
}











// import { NextRequest, NextResponse } from "next/server";
// import dbConnect  from "@/database/dbConnect";
// import {user} from "@/model/User";

// export async function PUT(req: NextRequest) {
 
//   const { name, email, address, phone } = await req.json();

//   await dbConnect ();
          
//   try {
//     const updatedUser = await user.findOneAndUpdate(
//       { email }, // Match the user by email
//       { $set: { name, address, phone } }, // Update fields
//       { new: true } // Return the updated document
//     );
    

//     if (!updatedUser) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     return NextResponse.json({ message: "Profile updated successfully", user: updatedUser });
//   } catch (error) {
//     return NextResponse.json({ message: "Error updating profile", error }, { status: 500 });
//   }
// }
