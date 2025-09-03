import { NextResponse, NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const jobName = formData.get("jobName") as string;
        const jobDesignation = formData.get("jobDesignation") as string;
        const resume = formData.get("resume") as File;

        if (!jobName || !jobDesignation || !resume) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Convert resume (PDF) to base64 string
        const arrayBuffer = await resume.arrayBuffer();
        const base64Resume = Buffer.from(arrayBuffer).toString("base64");

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `You are an AI ATS (Applicant Tracking System) specialized in resume scanning. 
Your task is to analyze the uploaded resume in the context of the provided Job Role (${jobName}) and Job Designation (${jobDesignation}). 
Extract and return the following structured fields in JSON format and The upload pdf is not a resume then return fields as empty and isResume false:

- fullName
- email (if available)
- linkedin (url if available)
- github (url if available)
- phoneNumber (if available)
- isExperienced
- needsImprovement
- atsScore (a score out of 100 indicating how well the resume matches the job role/designation)
- matchScore (percentage of fit)
- improvementSuggestions (specific areas where the resume can be improved for better alignment)
- isResume (boolean indicating if the uploaded file is a resume)
⚠️ IMPORTANT: Only return valid JSON. Do not include explanations, markdown, or text outside of the JSON.`;

        const result = await model.generateContent({
            contents: [
                { role: "user", parts: [{ text: prompt }] },
                {
                    role: "user",
                    parts: [
                        {
                            inlineData: {
                                mimeType: "application/pdf",
                                data: base64Resume,
                            },
                        },
                    ],
                },
            ],
        });

        let textResponse = result.response.text();

        textResponse = textResponse
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        let parsedJson;
        try {
            parsedJson = JSON.parse(textResponse);
        } catch (error) {
            parsedJson = { raw: textResponse }; 
        }

        return NextResponse.json({ data: parsedJson }, { status: 200 });
    } catch (error) {
        console.error("ATS API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
