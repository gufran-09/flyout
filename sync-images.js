const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const categoryFolderMap = {
  Yacht: "Yatch",
  "Water Adventures": "Water-Sports",
  "Holiday Package": "Holiday Packages",
  Cruises: "Cruise",
  "Visa & Services": "Visa Services",
  Safari: "Safari",
  Hotel: "Hotel",
  "Car Rental": "Car Rental",
  Attractions: "Attractions",
  Parks: "Parks",
  Games: "Games",
  "Dinner Cruise": "Dinner Cruise",
  "City Tours": "City Tours",
};

async function syncImages() {
  console.log("Fetching products and categories...");
  const { data: products, error } = await supabase
    .from("products")
    .select("id, title, categories(name)");

  if (error) {
    console.error("Error fetching products:", error);
    return;
  }

  console.log(
    `Found ${products.length} products. Checking storage for missing images in chunks...`,
  );
  const missingImages = [];
  const chunkSize = 10;

  for (let i = 0; i < products.length; i += chunkSize) {
    const chunk = products.slice(i, i + chunkSize);
    console.log(
      `Processing chunk ${Math.floor(i / chunkSize) + 1}/${Math.ceil(products.length / chunkSize)}...`,
    );

    await Promise.all(
      chunk.map(async (product) => {
        const categoryName = product.categories?.name;
        const folder = categoryFolderMap[categoryName] || categoryName;

        if (!folder) return;

        const checks = [];
        for (let j = 1; j <= 10; j++) {
          const testUrl = `${supabaseUrl}/storage/v1/object/public/media/products/${folder}/${encodeURIComponent(product.title)}/${j}.webp`;
          checks.push(
            (async () => {
              try {
                const res = await fetch(testUrl, { method: "HEAD" });
                if (res.ok) {
                  missingImages.push({
                    product_id: product.id,
                    image_url: testUrl,
                    alt_text: product.title,
                    position: j,
                  });
                }
              } catch (e) {}
            })(),
          );
        }
        await Promise.all(checks);
      }),
    );
  }

  console.log(`Sync complete! Found ${missingImages.length} images.`);
  fs.writeFileSync("sync-results.json", JSON.stringify(missingImages, null, 2));
  console.log("Results saved to sync-results.json");
}

syncImages();
