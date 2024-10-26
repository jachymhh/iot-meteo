// app/api/temperature/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("sensor_data")
    .select("*")
    .order("timestamp", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Přidání hlaviček pro zakázání caching
  const headers = new Headers();
  headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  headers.set("Pragma", "no-cache");
  headers.set("Expires", "0");

  return NextResponse.json({ data }, { status: 200, headers });
}
