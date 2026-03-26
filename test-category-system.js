require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testCategorySystem() {
  console.log('🧪 Testing Category System\n');
  console.log('═'.repeat(70));
  
  // Test 1: Fetch all categories
  console.log('\n📦 TEST 1: Fetching Categories from Supabase');
  console.log('─'.repeat(70));
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (catError) {
    console.error('❌ Error fetching categories:', catError.message);
    return;
  }
  
  console.log(`✅ Fetched ${categories.length} categories:\n`);
  console.table(categories.map(c => ({
    Name: c.name,
    Slug: c.slug,
    'Has Image': c.image_url ? '✓' : '✗'
  })));
  
  // Test 2: Count products per category
  console.log('\n📊 TEST 2: Products per Category');
  console.log('─'.repeat(70));
  
  const categoryCounts = [];
  for (const cat of categories) {
    const { count } = await supabase
      .from('products')
      .select('id', { count: 'exact', head: true })
      .eq('category_id', cat.id);
    
    categoryCounts.push({
      Category: cat.name,
      Slug: cat.slug,
      Products: count || 0,
      Status: count > 0 ? '✅' : '⚠️'
    });
  }
  
  console.table(categoryCounts);
  
  // Test 3: Simulate ALL category page queries
  // Mirrors backend/api/products.ts CATEGORY_SLUG_MAP exactly
  console.log('\n🔍 TEST 3: Simulating ALL Category Page Queries');
  console.log('─'.repeat(70));
  
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

  // Every frontend route slug under /dubai/
  const allPageSlugs = [
    'attractions', 'adventures', 'car-rental', 'city-tours',
    'desert-safari', 'dinner-cruise', 'games', 'holiday-packages',
    'hotels', 'limousine', 'packages', 'restaurants', 'shows',
    'sky-adventures', 'supercars', 'theme-parks', 'transfers',
    'visa', 'water-adventures', 'water-parks', 'yacht',
  ];
  
  for (const pageSlug of allPageSlugs) {
    const dbSlug = CATEGORY_SLUG_MAP[pageSlug] || pageSlug;

    // Get category
    const { data: category } = await supabase
      .from('categories')
      .select('id, name')
      .eq('slug', dbSlug)
      .single();
    
    if (!category) {
      console.log(`❌ /dubai/${pageSlug} → Category "${dbSlug}" not found`);
      continue;
    }
    
    // Get products
    const { data: products } = await supabase
      .from('products')
      .select('id, title')
      .eq('category_id', category.id);
    
    const count = products?.length || 0;
    const status = count > 0 ? '✅' : '❌';
    console.log(`${status} /dubai/${pageSlug.padEnd(20)} → ${dbSlug.padEnd(20)} (${count} products)`);
  }
  
  // Summary
  console.log('\n' + '═'.repeat(70));
  console.log('📈 SUMMARY');
  console.log('═'.repeat(70));
  
  const totalProducts = categoryCounts.reduce((sum, cat) => sum + cat.Products, 0);
  const categoriesWithProducts = categoryCounts.filter(c => c.Products > 0).length;
  const emptyCategories = categoryCounts.filter(c => c.Products === 0).length;
  
  console.log(`✅ Total Categories: ${categories.length}`);
  console.log(`✅ Categories with Products: ${categoriesWithProducts}`);
  console.log(`⚠️  Empty Categories: ${emptyCategories}`);
  console.log(`✅ Total Products: ${totalProducts}`);
  console.log(`✅ Average Products per Category: ${Math.round(totalProducts / categories.length)}`);
  
  if (emptyCategories > 0) {
    console.log('\n⚠️  Empty categories:');
    categoryCounts
      .filter(c => c.Products === 0)
      .forEach(c => console.log(`   - ${c.Category} (${c.Slug})`));
  }
  
  console.log('\n✅ All tests completed!');
}

testCategorySystem().catch(console.error);
