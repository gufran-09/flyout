const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Use service role key to bypass RLS and potentially perform multiple operations
// If service role key is not available, try anon key (might require RLS permission)
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function applySync() {
  console.log('--- Applying Image Synchronization ---');
  
  if (!fs.existsSync('sync-results.json')) {
    console.error('sync-results.json not found. Run sync-images.js first.');
    return;
  }

  const imageData = JSON.parse(fs.readFileSync('sync-results.json', 'utf8'));
  console.log(`Loaded ${imageData.length} images to sync.`);

  if (imageData.length === 0) {
    console.log('No images to sync.');
    return;
  }

  // Chunk the inserts to avoid large request body limits or timeouts
  const CHUNK_SIZE = 50;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < imageData.length; i += CHUNK_SIZE) {
    const chunk = imageData.slice(i, i + CHUNK_SIZE);
    console.log(`Processing chunk ${i/CHUNK_SIZE + 1} (${chunk.length} items)...`);

    // Use upsert to handle potential conflicts with (product_id, position)
    // We don't provide UUID 'id', so it will be auto-generated for new rows.
    const { error } = await supabase
      .from('product_images')
      .upsert(chunk, { onConflict: 'product_id, position' });

    if (error) {
      console.error(`Error in chunk ${i/CHUNK_SIZE + 1}:`, error.message);
      errorCount += chunk.length;
    } else {
      successCount += chunk.length;
    }
  }

  console.log('\n--- Final Result ---');
  console.log(`Successfully synced: ${successCount} images.`);
  console.log(`Failed: ${errorCount} images.`);
}

applySync();
