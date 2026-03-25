require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function getProductTablesSummary() {
  console.log('='.repeat(80));
  console.log('PRODUCT TABLES SUMMARY');
  console.log('='.repeat(80));
  
  // Check products (plural!)
  console.log('\n📦 PRODUCTS TABLE');
  console.log('-'.repeat(80));
  try {
    const { data, error, count } = await supabase
      .from('products')
      .select('*', { count: 'exact' });
    
    if (error) {
      console.error('❌ Error:', error.message);
    } else {
      console.log(`✅ Total products: ${count}`);
      if (data && data.length > 0) {
        console.log(`\nSample data (first 5):`);
        console.table(data.slice(0, 5).map(p => ({
          id: p.id?.substring(0, 8) + '...',
          title: p.title?.substring(0, 40),
          category: p.category_id?.substring(0, 8) + '...',
          location: p.location?.substring(0, 30),
          price: p.original_price ? `$${p.original_price}` : 'N/A',
          rating: p.rating,
          active: p.is_active ? '✓' : '✗',
          featured: p.is_featured ? '✓' : '✗'
        })));
      }
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
  
  // Check product_suppliers
  console.log('\n🏢 PRODUCT_SUPPLIERS TABLE');
  console.log('-'.repeat(80));
  try {
    const { data, error, count } = await supabase
      .from('product_suppliers')
      .select('*', { count: 'exact' });
    
    if (error) {
      console.error('❌ Error:', error.message);
    } else {
      console.log(`✅ Total product suppliers: ${count}`);
      if (data && data.length > 0) {
        console.log(`\nSample data (first 5):`);
        console.table(data.slice(0, 5).map(ps => ({
          id: ps.id?.substring(0, 8) + '...',
          product_id: ps.product_id?.substring(0, 8) + '...',
          supplier_id: ps.supplier_id?.substring(0, 8) + '...',
          price: ps.price ? `$${ps.price}` : 'N/A',
          title: ps.display_title?.substring(0, 35),
          active: ps.is_active ? '✓' : '✗'
        })));
      }
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
  
  // Check product_images
  console.log('\n📸 PRODUCT_IMAGES TABLE');
  console.log('-'.repeat(80));
  try {
    const { data, error, count } = await supabase
      .from('product_images')
      .select('*', { count: 'exact' });
    
    if (error) {
      console.error('❌ Error:', error.message);
    } else {
      console.log(`✅ Total images: ${count}`);
      console.log(`\nSample data (first 5):`);
      console.table(data.slice(0, 5).map(img => ({
        id: img.id.substring(0, 8) + '...',
        product_id: img.product_id.substring(0, 8) + '...',
        position: img.position,
        image_url: img.image_url.substring(0, 60) + '...'
      })));
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
  
  // Check product_pricing
  console.log('\n💰 PRODUCT_PRICING TABLE');
  console.log('-'.repeat(80));
  try {
    const { data, error, count } = await supabase
      .from('product_pricing')
      .select('*', { count: 'exact' });
    
    if (error) {
      console.error('❌ Error:', error.message);
    } else {
      console.log(`✅ Total pricing entries: ${count}`);
      console.log(`\nAll pricing data:`);
      console.table(data.map(p => ({
        id: p.id.substring(0, 8) + '...',
        supplier_id: p.product_supplier_id.substring(0, 8) + '...',
        duration_min: p.duration_minutes,
        price: `$${p.price}`,
        original: p.original_price ? `$${p.original_price}` : 'N/A',
        pax: p.pax,
        active: p.is_active ? '✓' : '✗'
      })));
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
  
  console.log('\n' + '='.repeat(80));
}

getProductTablesSummary().catch(console.error);
