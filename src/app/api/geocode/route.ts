import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    if (!lat || !lng) {
        return NextResponse.json(
            { message: "Missing lat or lng query parameters" },
            { status: 400 }
        );
    }

    try {
        const apiKey = process.env.OPENCAGE_API_KEY!;
        const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}&key=${apiKey}`
        );

        if (!response.ok) {
            throw new Error(`API error ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Erro na geocode API:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}