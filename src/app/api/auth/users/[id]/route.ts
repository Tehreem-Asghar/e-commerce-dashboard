import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/database/dbConnect';
import { user } from '@/model/User';

// Define types for params
interface Params {
  id: string;
}

// PUT request handler
export async function PUT(request: NextRequest, { params }: { params: Params }) {
  await dbConnect();
  const { id } = params;

  try {
    const body = await request.json();
    const updatedUser = await user.findByIdAndUpdate(id, body, { new: true });

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating user', error }, { status: 500 });
  }
}

// DELETE request handler
export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  await dbConnect();
  const { id } = params;

  try {
    const deletedUser = await user.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting user', error }, { status: 500 });
  }
}