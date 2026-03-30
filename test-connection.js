const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("URL Length:", supabaseUrl ? supabaseUrl.length : "MISSING");
console.log("Key Length:", supabaseKey ? supabaseKey.length : "MISSING");

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  const { count, error } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });
  if (error) {
    console.error("Connection Error:", error.message);
  } else {
    console.log("Connected! Product Count:", count ?? "N/A");
    // Actually get one product
    const { data: p } = await supabase
      .from("products")
      .select("id, title, thumbnail_image")
      .limit(1);
    console.log("Sample Product:", p ? p[0].title : "NONE");
    console.log("Thumbnail:", p ? p[0].thumbnail_image : "NONE");
  }
}

testConnection();
