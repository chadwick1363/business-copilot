import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const jobDescription = body.jobDescription?.trim();

    if (!jobDescription) {
      return NextResponse.json(
        { error: "Please describe the job." },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "The OpenAI API key is missing." },
        { status: 500 }
      );
    }

    const response = await openai.responses.create({
      model: "gpt-5-mini",
      instructions: `
You create preliminary estimates for home-service businesses.

Return a clear, professional estimate using this exact format:

JOB SUMMARY:
Short description

LABOR:
Description and estimated price range

MATERIALS:
Description and estimated price range

OTHER COSTS:
Permits, travel, disposal, or "None identified"

ESTIMATED TOTAL:
A realistic price range

CUSTOMER NOTE:
A short professional disclaimer explaining that this is a preliminary estimate and final pricing requires inspection.

Never claim the price is guaranteed.
Never invent exact local permit requirements.
Use US dollars.
      `,
      input: jobDescription,
    });

    return NextResponse.json({
      estimate: response.output_text,
    });
  } catch (error) {
    console.error("Estimate generation error:", error);

    return NextResponse.json(
      { error: "The estimate could not be generated." },
      { status: 500 }
    );
  }
}