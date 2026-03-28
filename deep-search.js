const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function deepSearch() {
  const products = [
    { title: 'Luxury Yacht 82ft', cat: 'Yacht' },
    { title: 'Jet Ski Tour - Burj Al Arab', cat: 'Water Adventures' }
  ];

  const catFolders = ['Yacht', 'Yachts', 'Water Adventures', 'Water-Adventures', 'Water-Sports', 'Water Adventure', 'water-sports'];
  
  for (const p of products) {
    console.log(`\nSearching for: ${p.title}`);
    const variations = [
      p.title,
      p.title.replace(/\s+/g, '-'),
      p.title.replace(/\s+/g, '_'),
      p.title.toLowerCase().replace(/\s+/g, '-'),
      'jet-ski' // specific guess for water sports
    ];

    for (const cf of catFolders) {
      for (const v of variations) {
        const url = `${supabaseUrl}/storage/v1/object/public/media/products/${cf}/${encodeURIComponent(v)}/1.webp`;
        const res = await fetch(url, { method: 'HEAD' });
        if (res.ok) {
          console.log(`[FOUND] ${url}`);
        }
      }
    }
  }
}

deepSearch();
