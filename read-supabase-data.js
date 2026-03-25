require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function readAllTables() {
  const tables = ['bookings', 'newsletter_subscribers', 'profiles', 'user_roles', 'wishlist', 'product', 'product_images', 'product_pricing'];
  
  console.log('='.repeat(80));
  console.log('SUPABASE DATABASE TABLES DATA');
  console.log('='.repeat(80));
  
  for (const table of tables) {
    console.log(`\n\n📊 TABLE: ${table.toUpperCase()}`);
    console.log('-'.repeat(80));
    
    try {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact' });
      
      if (error) {
        console.error(`❌ Error reading ${table}:`, error.message);
        continue;
      }
      
      console.log(`Total rows: ${count || 0}`);
      
      if (data && data.length > 0) {
        console.log('\nData:');
        console.table(data);
      } else {
        console.log('\n(No data in this table)');
      }
    } catch (err) {
      console.error(`❌ Error reading ${table}:`, err.message);
    }
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('FINISHED READING ALL TABLES');
  console.log('='.repeat(80));
}

readAllTables().catch(console.error);
