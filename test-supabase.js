const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

async function test() {
  const envFile = fs.readFileSync('.env.local', 'utf8');
  const env = {};
  envFile.split('\n').forEach(line => {
    const [key, ...rest] = line.split('=');
    if (key && rest.length > 0) {
      // Remove quotes if present
      let value = rest.join('=').trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }
      env[key.trim()] = value;
    }
  });

  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error("Missing Supabase credentials in .env.local", { url, key });
    return;
  }

  const supabase = createClient(url, key);

  const { data: catData, error } = await supabase
    .from('products')
    .select(`
      title, 
      slug, 
      category:categories(name), 
      product_images(id)
    `)
    .eq('is_active', true);

  if (error) {
    console.error("Supabase error:", error);
    return;
  }

  // Debug: print first product to see structure
  if (catData && catData.length > 0) {
    console.log("DEBUG: first product structure:", JSON.stringify(catData[0], null, 2));
  }

  const report = {};
  catData.forEach(p => {
    const categoryName = p.category?.name || 'Uncategorized';
    if (!report[categoryName]) {
      report[categoryName] = {
        totalProducts: 0,
        productsWithMultipleImages: 0,
        productsWithOnlyOneImageInImagesTable: 0,
        productsWithZeroImagesInImagesTable: 0,
        exampleSlugs: []
      };
    }

    const imageCount = p.product_images?.length || 0;
    report[categoryName].totalProducts++;

    if (imageCount > 1) {
      report[categoryName].productsWithMultipleImages++;
    } else if (imageCount === 1) {
      report[categoryName].productsWithOnlyOneImageInImagesTable++;
    } else {
      report[categoryName].productsWithZeroImagesInImagesTable++;
    }

    if (imageCount > 1 && report[categoryName].exampleSlugs.length < 3) {
      report[categoryName].exampleSlugs.push(p.slug);
    }
  });

  fs.writeFileSync('test-images-report-v2.json', JSON.stringify(report, null, 2));
  console.log("Report saved to test-images-report-v2.json");
}

test().catch(console.error);
