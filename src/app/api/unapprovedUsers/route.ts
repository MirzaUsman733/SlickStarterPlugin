import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request: any) => {
  await connect();

  // Assume some form of authentication to check if the requester is an admin

  try {
    const unapprovedUsers = await User.find({ approved: false });
    return new NextResponse(JSON.stringify(unapprovedUsers), { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};

export const PUT = async (request: any) => {
  const { userId } = await request.json();

  await connect();

  // Assume some form of authentication to check if the requester is an admin

  try {
    const user = await User.findById(userId);
    if (user) {
      user.approved = true;
      await user.save();
      return new NextResponse("User approved successfully", { status: 200 });
    } else {
      return new NextResponse("User not found", { status: 404 });
    }
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
