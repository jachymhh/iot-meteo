import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const apiKey = request.headers.get("x-api-key");

  // CORS hlavičky
  const responseHeaders = new Headers({
    "Access-Control-Allow-Origin": "*", // Umožní přístup z libovolné domény
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-api-key",
  });

  // Ověření API klíče
  if (apiKey !== process.env.API_KEY) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: responseHeaders }
    );
  }

  try {
    const { temperature, humidity } = await request.json();

    const { error } = await supabase
      .from("sensor_data")
      .insert([{ temperature, humidity }]);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500, headers: responseHeaders }
      );
    }

    return NextResponse.json(
      { message: "Data saved successfully" },
      { status: 200, headers: responseHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400, headers: responseHeaders }
    );
  }
}
