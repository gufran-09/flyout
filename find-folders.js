const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function findCategoryFolder() {
  const categoriesToCheck = [
    "Yacht",
    "Water Adventures",
    "Holiday Package",
    "Cruises",
    "Safari",
    "Hotel",
    "Car Rental",
  ];
  const folderVariations = {
    Yacht: ["Yacht", "Yachts"],
    "Water Adventures": [
      "Water Adventures",
      "Water Adventure",
      "Water adventures",
      "water adventure",
      "Water-Adventures",
      "water-adventure",
    ],
    "Holiday Package": [
      "Holiday Package",
      "Holiday-Package",
      "Packages",
      "Holiday Packages",
      "Holiday-Packages",
      "Holiday-Packages-In-Dubai",
    ],
    Cruises: ["Cruises", "Cruise", "Cruising"],
    Safari: ["Safari", "Safaris", "Desert Safari"],
    Hotel: ["Hotel", "Hotels", "Staycations"],
    "Car Rental": ["Car Rental", "Car-Rental", "Cars"],
  };

  const results = {};

  for (const cat of categoriesToCheck) {
    console.log(`\n--- Checking Category: ${cat} ---`);

    const { data: qData, error: qError } = await supabase
      .from("products")
      .select("id, title, categories!inner(name)")
      .eq("categories.name", cat)
      .limit(10); // Check a few products per category to be sure

    if (qError || !qData || qData.length === 0) {
      console.log(`No products found for category ${cat}`);
      continue;
    }

    const variations = folderVariations[cat] || [cat];
    let catMatch = null;

    for (const v of variations) {
      let matchCount = 0;
      for (const product of qData) {
        const titleClean = product.title.trim();
        // Public URLs often just use raw spaces or %20. encodeURIComponent might be too aggressive for the FULL path segment if it contains slashes, but here it is just one segment.
        const testUrl = `${supabaseUrl}/storage/v1/object/public/media/products/${v}/${encodeURIComponent(titleClean)}/2.webp`;

        try {
          const res = await fetch(testUrl, { method: "HEAD" });
          if (res.ok) {
            matchCount++;
          }
        } catch (e) {}
      }

      if (matchCount > 0) {
        console.log(
          `MATCH FOUND! Category [${cat}] uses folder [${v}] (${matchCount}/${qData.length} products matched)`,
        );
        catMatch = v;
        break;
      }
    }

    results[cat] = catMatch;
  }

  fs.writeFileSync("category-folders.json", JSON.stringify(results, null, 2));
  console.log("\nResults saved to category-folders.json");
}

findCategoryFolder();
