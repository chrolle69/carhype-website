import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const token = process.env.VERCEL_ANALYTICS_TOKEN; // keep secret!
    const projectId = process.env.VERCEL_PROJECT_ID; // set in env vars

    // Simple password protection via query parameter
    const url = new URL(request.url);
    const password = url.searchParams.get("password");
    if (password !== process.env.ANALYTICS_PASSWORD) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(token);
    console.log(projectId);
    if (!token || !projectId) {
        return NextResponse.json({ error: "Missing token or project ID" }, { status: 500 });
    }

    const res = await fetch(
        `https://api.vercel.com/v2/insights/web?projectId=${projectId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );


    const data = await res.json();
    return NextResponse.json(data);
}