import CommentsDataUser from "@/models/CommentsModel";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const {
    id,
    name,
    email,
    language,
    product,
    prompt,
    comments,
    totalTokensUsed,
  } = await request.json();
  await connect();

  const newEntry = new CommentsDataUser({
    id,
    name,
    email,
    language,
    product,
    prompt,
    comments,
    totalTokensUsed,
  });
  try {
    await newEntry.save();
    return new NextResponse("User Response is saved", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
