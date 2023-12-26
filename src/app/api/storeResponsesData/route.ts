import ResponsesDataModel from "@/models/ResponseModel"; // Replace with the actual path to your model
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { prompt, selectedTitle, totalTokensUsed } = await request.json();
// const requestData = await request.json();
// console.log('Received request data:', requestData);
// const { prompt, selectedTitle, totalTokensUsed } = requestData;
  await connect();

  const newEntry = new ResponsesDataModel({
    prompt,
    selectedTitle,
    totalTokensUsed,
  });
  console.log("New Entry:", newEntry)
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
