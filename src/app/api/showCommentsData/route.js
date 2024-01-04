import connect from "@/utils/db";
import CommentsDataModel from "@/models/CommentsModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connect();
        const userCommentsData = await CommentsDataModel.find({}).select("id name email language product prompt comments totalTokensUsed currentTime");
        return NextResponse.json({ userCommentsData });
    } catch (error) {
        console.error(error);
        return NextResponse.error({ status: 500, message: 'Internal Server Error' });
    }
}
