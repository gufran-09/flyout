require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Simulate the backend API function
const CATEGORY_SLUG_MAP = {
  'theme-parks': 'parks',
  'water-parks': 'parks',
  'water-sports': 'water-adventures',
  'attractions': 'attraction',
  'desert-safari': 'safari',
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
  'packages': 'holiday-package',
};

async function testCategoryPages() {
  console.log('Testing category page queries:\n');
  
  const testPages = [
    'theme-parks',
    'water-sports', 
    'attractions',
    'desert-safari',
    'yacht',
    'hotels'
  ];
  
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
      continue;
    }
    
    // Get products for this category
    const { data: products } = await supabase
      .from('products')
      .select('id, title')
      .eq('category_id', category.id);
    
    const count = products?.length || 0;
    console.log(`✅ ${pageSlug.padEnd(18)} → ${dbSlug.padEnd(18)} (${category.name}): ${count} products`);
    if (count > 0 && count <= 3) {
      products.forEach(p => console.log(`   - ${p.title}`));
    }
  }
}

testCategoryPages().catch(console.error);
