require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Mirrors backend/api/products.ts CATEGORY_SLUG_MAP exactly
const CATEGORY_SLUG_MAP = {
  'theme-parks': 'parks',
  'water-parks': 'parks',
  'water-sports': 'water-adventures',
  'water-adventure': 'water-adventures',
  'attractions': 'attraction',
  'desert-safari': 'safari',
  'safari': 'safari',
  'sky-adventures': 'sky-adventure',
  'dinner-cruise': 'dinner-cruise',
  'yacht': 'yacht',
  'hotels': 'hotel',
  'restaurants': 'restaurant',
  'holiday-packages': 'holiday-package',
  'visa': 'vise-services',
  'car-rental': 'car',
  'city-tours': 'city-tours',
  'limousine': 'car',
  'transfers': 'car',
  'supercars': 'car',
  'adventures': 'adventure',
  'water-adventures': 'water-adventures',
  'shows': 'games',
  'games': 'games',
  'packages': 'holiday-package',
};

async function testCategoryPages() {
  console.log('Testing ALL category page queries:\n');

  // Every frontend route slug under /dubai/
  const testPages = [
    'attractions',
    'adventures',
    'car-rental',
    'city-tours',
    'desert-safari',
    'dinner-cruise',
    'games',
    'holiday-packages',
    'hotels',
    'limousine',
    'packages',
    'restaurants',
    'shows',
    'sky-adventures',
    'supercars',
    'theme-parks',
    'transfers',
    'visa',
    'water-adventures',
    'water-parks',
    'yacht',
  ];

  let pass = 0;
  let fail = 0;

  for (const pageSlug of testPages) {
    const dbSlug = CATEGORY_SLUG_MAP[pageSlug] || pageSlug;

    // Get category ID
    const { data: category } = await supabase
      .from('categories')
      .select('id, name')
      .eq('slug', dbSlug)
      .single();

    if (!category) {
      console.log(`❌ ${pageSlug} → ${dbSlug}: Category not found`);
      fail++;
      continue;
    }

    // Get products for this category
    const { data: products } = await supabase
      .from('products')
      .select('id, title')
      .eq('category_id', category.id);

    const count = products?.length || 0;
    console.log(`✅ ${pageSlug.padEnd(20)} → ${dbSlug.padEnd(20)} (${category.name}): ${count} products`);
    pass++;
  }

  console.log(`\n--- Result: ${pass} passed, ${fail} failed out of ${testPages.length} routes ---`);
}

testCategoryPages().catch(console.error);
