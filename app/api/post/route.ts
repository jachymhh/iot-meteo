import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const apiKey = request.headers.get("x-api-key");

  // Ověření API klíče
  if (apiKey !== process.env.API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { temperature, humidity } = await request.json();

  const { error } = await supabase
    .from("sensor_data")
    .insert([{ temperature, humidity }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { message: "Data saved successfully" },
    { status: 200 }
  );
}
