require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkParkCategories() {
  console.log('Checking PARKS category breakdown...\n');
  
  const { data: parksCategory } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', 'parks')
    .single();
  
  if (!parksCategory) {
    console.log('Parks category not found');
    return;
  }
  
  // Get all products in parks category
  const { data: products } = await supabase
    .from('products')
    .select('id, title, product_type')
    .eq('category_id', parksCategory.id);
  
  console.log(`Total products in "parks" category: ${products?.length || 0}\n`);
  
  // Group by product_type
  const grouped = {};
  products?.forEach(p => {
    const type = p.product_type || 'unknown';
    if (!grouped[type]) grouped[type] = [];
    grouped[type].push(p.title);
  });
  
  for (const [type, titles] of Object.entries(grouped)) {
    console.log(`\n${type.toUpperCase()} (${titles.length}):`);
    titles.forEach(t => console.log(`  - ${t}`));
  }
  
  console.log('\n\n=== RECOMMENDATION ===');
  console.log('The "parks" category contains mixed product types.');
  console.log('Both "theme-parks" and "water-parks" pages will show the same 17 products.');
  console.log('To fix: Either split into separate categories in DB, or filter by product_type.');
}

checkParkCategories().catch(console.error);
