import connect from "@/utils/db";
import ResponsesDataModel from "@/models/ResponseModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connect();
        const userResponseData = await ResponsesDataModel.find({}).select("id name email prompt selectedTitle article totalTokensUsed currentTime");
        console.log("userData: ", userResponseData);
        return NextResponse.json({ userResponseData });
    } catch (error) {
        console.error(error);
        return NextResponse.error({ status: 500, message: 'Internal Server Error' });
    }
}
