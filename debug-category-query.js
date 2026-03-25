require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function debugCategoryQuery() {
  console.log('Testing category queries...\n');
  
  // Test 1: Get a product with category
  console.log('1. Sample product with category:');
  const { data: sampleProduct } = await supabase
    .from('products')
    .select('id, title, category_id, category:categories(id, name, slug)')
    .limit(1)
    .single();
  console.log(JSON.stringify(sampleProduct, null, 2));
  
  // Test 2: Get categories
  console.log('\n2. All categories:');
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, slug')
    .order('name');
  console.table(categories);
  
  // Test 3: Try filtering by category slug (wrong way)
  console.log('\n3. Wrong way - eq(categories.slug, water-sports):');
  const { data: wrongData, error: wrongError } = await supabase
    .from('products')
    .select('id, title, category:categories(id, name, slug)')
    .eq('categories.slug', 'water-sports')
    .limit(5);
  console.log('Error:', wrongError?.message || 'None');
  console.log('Results:', wrongData?.length || 0);
  
  // Test 4: Correct way - get category ID first, then filter
  console.log('\n4. Correct way - two-step query:');
  const { data: attractionCat } = await supabase
    .from('categories')
    .select('id, slug')
    .eq('slug', 'attraction')
    .single();
  console.log('Attraction category:', attractionCat);
  
  if (attractionCat) {
    const { data: products } = await supabase
      .from('products')
      .select('id, title, category:categories(name, slug)')
      .eq('category_id', attractionCat.id)
      .limit(5);
    console.log('Products found:', products?.length || 0);
    if (products && products.length > 0) {
      console.table(products.map(p => ({ title: p.title, category: p.category })));
    }
  }
  
  // Test 5: Count products per category
  console.log('\n5. Products per category:');
  for (const cat of categories || []) {
    const { count } = await supabase
      .from('products')
      .select('id', { count: 'exact', head: true })
      .eq('category_id', cat.id);
    console.log(`  ${cat.slug.padEnd(20)} : ${count} products`);
  }
}

debugCategoryQuery().catch(console.error);
