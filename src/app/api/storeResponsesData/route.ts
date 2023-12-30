import ResponsesDataUser from "@/models/ResponseModel";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const {
    _id,
    name,
    email,
    prompt,
    selectedTitle,
    article,
    totalTokensUsed,
  } = await request.json();
  await connect();

  const newEntry = new ResponsesDataUser({
    _id,
    name,
    email,
    prompt,
    selectedTitle,
    article,
    totalTokensUsed,
  });
  try {
    await newEntry.save();
    console.log("New Entry Pass",newEntry);
    return new NextResponse("User Response is saved", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
