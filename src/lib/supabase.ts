import { variable } from "@/utils";
import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(
  variable.project_url,
  variable.api_key
);
