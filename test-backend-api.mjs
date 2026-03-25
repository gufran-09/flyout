// Test the backend API directly
import { getProductsByCategory } from './backend/api/products';

async function testBackendAPI() {
  console.log('🧪 Testing Backend API Functions\n');
  console.log('═'.repeat(70));
  
  const testCategories = [
    'water-sports',
    'attractions', 
    'theme-parks',
    'desert-safari',
    'yacht'
  ];
  
  for (const slug of testCategories) {
    console.log(`\n📦 Testing: /dubai/${slug}`);
    console.log('─'.repeat(70));
    
    try {
      const products = await getProductsByCategory(slug);
      console.log(`✅ Returned ${products.length} products`);
      
      if (products.length > 0) {
        console.log('Sample products:');
        products.slice(0, 3).forEach(p => {
          console.log(`  - ${p.title} (${p.id})`);
        });
      } else {
        console.log('⚠️  No products returned!');
      }
    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
      console.error(error.stack);
    }
  }
}

testBackendAPI().catch(console.error);
