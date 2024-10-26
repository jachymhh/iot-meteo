import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("sensor_data")
    .select("*")
    .order("timestamp", { ascending: false }) // Seřadí podle timestampu
    .limit(1); // Omezí na 1 záznam

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { data: data.length > 0 ? data[0] : null },
    { status: 200 }
  );
}
