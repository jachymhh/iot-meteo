import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { data, error } = await supabase
    .from("sensor_data")
    .select("*")
    .order("timestamp", { ascending: false }) // Seřadí podle timestampu
    .limit(1); // Omezí na 1 záznam

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

  return NextResponse.json(
    { data: data.length > 0 ? data[0] : null },
    { status: 200, headers }
  );
}
