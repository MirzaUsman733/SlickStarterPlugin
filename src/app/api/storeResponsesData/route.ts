import ResponsesDataModel from "@/models/ResponseModel";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { name,
    email, prompt, selectedTitle,
     totalTokensUsed 
    } = await request.json();
// const requestData = await request.json();
// console.log('Received request data:', requestData);
// const { prompt, selectedTitle, totalTokensUsed } = requestData;
  await connect();

  const newEntry = new ResponsesDataModel({
    name,
    email,
    prompt,
    selectedTitle,
    totalTokensUsed,
  });
  try {
    await newEntry.save();
    console.log(newEntry)
    return new NextResponse("User Response is saved", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
