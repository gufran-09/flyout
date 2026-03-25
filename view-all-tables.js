require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function viewAllTables() {
  console.log('='.repeat(100));
  console.log('COMPLETE DATABASE OVERVIEW');
  console.log('='.repeat(100));
  
  const tables = [
    'categories',
    'destinations', 
    'suppliers',
    'products',
    'product_suppliers',
    'product_images',
    'product_pricing',
    'bookings',
    'reviews',
    'wishlist',
    'profiles',
    'promotions',
    'site_settings',
    'seo_meta',
    'notifications',
    'partners_applications'
  ];
  
  for (const table of tables) {
    console.log(`\n${'='.repeat(100)}`);
    console.log(`📊 TABLE: ${table.toUpperCase()}`);
    console.log('='.repeat(100));
    
    try {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact' });
      
      if (error) {
        console.error(`❌ Error: ${error.message}`);
        continue;
      }
      
      console.log(`\n✅ Total rows: ${count || 0}`);
      
      if (data && data.length > 0) {
        // Show sample for large tables, all for small tables
        const displayCount = count > 10 ? 5 : data.length;
        console.log(`\n${count > 10 ? `Sample data (first ${displayCount})` : 'All data'}:`);
        
        // Customize display based on table
        switch(table) {
          case 'categories':
            console.table(data.slice(0, displayCount).map(c => ({
              id: c.id?.substring(0, 8) + '...',
              name: c.name,
              slug: c.slug,
              has_image: c.image_url ? '✓' : '✗'
            })));
            break;
            
          case 'destinations':
            console.table(data.slice(0, displayCount).map(d => ({
              id: d.id?.substring(0, 8) + '...',
              name: d.name,
              slug: d.slug,
              description: d.description?.substring(0, 50) + '...' || 'N/A',
              has_hero: d.hero_image ? '✓' : '✗'
            })));
            break;
            
          case 'suppliers':
            console.table(data.slice(0, displayCount).map(s => ({
              id: s.id?.substring(0, 8) + '...',
              code: s.code,
              name: s.name,
              email: s.contact_email || 'N/A',
              phone: s.contact_phone || 'N/A'
            })));
            break;
            
          case 'products':
            console.table(data.slice(0, displayCount).map(p => ({
              id: p.id?.substring(0, 8) + '...',
              title: p.title?.substring(0, 35),
              type: p.product_type,
              rating: p.rating,
              reviews: p.review_count,
              category: p.category_id?.substring(0, 8) + '...' || 'N/A',
              destination: p.destination_id?.substring(0, 8) + '...' || 'N/A'
            })));
            break;
            
          case 'product_suppliers':
            console.table(data.slice(0, displayCount).map(ps => ({
              id: ps.id?.substring(0, 8) + '...',
              product_id: ps.product_id?.substring(0, 8) + '...',
              supplier_id: ps.supplier_id?.substring(0, 8) + '...',
              price: `$${ps.price}`,
              commission: ps.commission_percent ? `${ps.commission_percent}%` : 'N/A',
              active: ps.is_active ? '✓' : '✗'
            })));
            break;
            
          case 'product_pricing':
            console.table(data.slice(0, displayCount).map(pp => ({
              id: pp.id?.substring(0, 8) + '...',
              supplier_id: pp.product_supplier_id?.substring(0, 8) + '...',
              duration: `${pp.duration_minutes}min`,
              price: `$${pp.price}`,
              original: pp.original_price ? `$${pp.original_price}` : 'N/A',
              pax: pp.pax,
              active: pp.is_active ? '✓' : '✗'
            })));
            break;
            
          case 'product_images':
            console.table(data.slice(0, displayCount).map(pi => ({
              id: pi.id?.substring(0, 8) + '...',
              product_id: pi.product_id?.substring(0, 8) + '...',
              position: pi.position,
              url: pi.image_url?.substring(0, 60) + '...'
            })));
            break;
            
          case 'bookings':
            console.table(data.slice(0, displayCount).map(b => ({
              id: b.id?.substring(0, 8) + '...',
              user_id: b.user_id?.substring(0, 8) + '...',
              date: b.booking_date?.substring(0, 10),
              guests: b.guests,
              total: `$${b.total_price}`,
              status: b.status,
              payment: b.payment_status
            })));
            break;
            
          case 'reviews':
            console.table(data.slice(0, displayCount).map(r => ({
              id: r.id?.substring(0, 8) + '...',
              product_id: r.product_id?.substring(0, 8) + '...',
              rating: '⭐'.repeat(r.rating),
              title: r.title?.substring(0, 30) || 'N/A',
              verified: r.is_verified_purchase ? '✓' : '✗',
              published: r.is_published ? '✓' : '✗'
            })));
            break;
            
          default:
            console.table(data.slice(0, displayCount));
        }
      } else {
        console.log('\n(No data in this table)');
      }
    } catch (err) {
      console.error(`❌ Error: ${err.message}`);
    }
  }
  
  console.log('\n' + '='.repeat(100));
  console.log('DATABASE OVERVIEW COMPLETE');
  console.log('='.repeat(100));
}

viewAllTables().catch(console.error);
