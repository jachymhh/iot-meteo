// @ts-ignore
import { createClient } from "@supabase/supabase-js";

// Supabase URL a API klíč z environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Vytvoříme Supabase klienta
export const supabase = createClient(supabaseUrl, supabaseKey);
