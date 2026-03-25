# Category System - Data Flow Summary

## ✅ ISSUE FIXED

**Problem:** Category pages were showing no products because the Supabase query filter was incorrect.

**Root Causes:**
1. Query used `.eq('categories.slug', categorySlug)` which doesn't work with joined tables in Supabase
2. Page route slugs didn't match database category slugs (e.g., "water-sports" vs "water-adventures")

**Solution Implemented:**
1. Changed to two-step query: First get category ID by slug, then filter products by `category_id`
2. Added `CATEGORY_SLUG_MAP` to map frontend route slugs to database slugs
3. Added special filtering for water-parks vs theme-parks (both use "parks" category but filtered by title keywords)

---

## 📊 How Data Flows from Supabase to Website

### **1. Database Structure**

```
┌─────────────────┐         ┌──────────────────┐
│   categories    │         │    products      │
├─────────────────┤         ├──────────────────┤
│ id (uuid)       │◄────────┤ category_id      │
│ name (text)     │         │ title            │
│ slug (text)     │         │ slug             │
│ image_url       │         │ product_type     │
│ created_at      │         │ ...              │
└─────────────────┘         └──────────────────┘
```

**Categories in Database (16 total):**
- adventure (1 product)
- attraction (40 products)
- car (25 products)
- city-tours (4 products)
- Cruises (2 products)
- dinner-cruise (10 products)
- games (3 products)
- holiday-package (5 products)
- hotel (14 products)
- parks (17 products - all theme_park type)
- restaurant (1 product)
- safari (20 products)
- sky-adventure (9 products)
- vise-services (6 products)
- water-adventures (12 products)
- yacht (21 products)

**Total: 208 products across 16 categories**

---

### **2. Data Fetch Flow**

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER VISITS CATEGORY PAGE                    │
│              Example: /dubai/water-sports                       │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 1: Page Component (Server Component)                      │
│  File: src/app/dubai/water-sports/page.tsx                      │
│                                                                  │
│  export default async function WaterSportsPage() {              │
│    const products = await getProductsByCategory("water-sports") │
│    const tours = productsToTours(products)                      │
│    return <CategoryLayout tours={tours} />                      │
│  }                                                               │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 2: Backend API Query                                      │
│  File: backend/api/products.ts                                  │
│                                                                  │
│  1. Map route slug → database slug                              │
│     "water-sports" → "water-adventures"                         │
│                                                                  │
│  2. Query category table:                                       │
│     SELECT id FROM categories WHERE slug = 'water-adventures'   │
│                                                                  │
│  3. Query products table:                                       │
│     SELECT * FROM products WHERE category_id = <category_id>    │
│     ORDER BY created_at DESC                                    │
│                                                                  │
│  4. Return array of Product objects                             │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 3: Type Adapter                                           │
│  File: src/lib/product-adapters.ts                              │
│                                                                  │
│  Convert Product[] → Tour[]                                     │
│  - Map database fields to UI component expectations             │
│  - Calculate price from product_pricing data                    │
│  - Format images, ratings, etc.                                 │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 4: Render UI                                              │
│  File: src/components/layout/CategoryLayout.tsx                 │
│                                                                  │
│  - Display product cards in grid                                │
│  - Show filters, sorting options                                │
│  - Use existing Tour component styling                          │
└─────────────────────────────────────────────────────────────────┘
```

---

### **3. Category Slug Mapping**

Since frontend routes don't always match database slugs, we use a mapping:

| Page Route | DB Category Slug | Products |
|-----------|------------------|----------|
| `/dubai/theme-parks` | `parks` | 17 |
| `/dubai/water-parks` | `parks` (filtered by title: water/aqua) | ~5 |
| `/dubai/water-sports` | `water-adventures` | 12 |
| `/dubai/attractions` | `attraction` | 40 |
| `/dubai/desert-safari` | `safari` | 20 |
| `/dubai/sky-adventures` | `sky-adventure` | 9 |
| `/dubai/yacht` | `yacht` | 21 |
| `/dubai/hotels` | `hotel` | 14 |
| `/dubai/restaurants` | `restaurant` | 1 |
| `/dubai/dinner-cruise` | `dinner-cruise` | 10 |
| `/dubai/car-rental` | `car` | 25 |
| `/dubai/limousine` | `car` | 25 |
| `/dubai/transfers` | `car` | 25 |
| `/dubai/supercars` | `car` | 25 |
| `/dubai/city-tours` | `city-tours` | 4 |
| `/dubai/adventures` | `adventure` | 1 |
| `/dubai/packages` | `holiday-package` | 5 |
| `/dubai/visa` | `vise-services` | 6 |
| `/dubai/shows` | `games` | 3 |

---

## 🎨 Navbar Categories (Dynamic)

### **Desktop Mega Menu**

Categories are fetched dynamically from Supabase and displayed in the navbar mega menu.

**File:** `src/components/layout/Navbar.tsx`

```typescript
useEffect(() => {
    const fetchCategories = async () => {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
    };
    fetchCategories();
}, []);
```

**Renders as:**
```tsx
<MegaMenu
    triggerLabel="Categories"
    type="grid"
    columns={4}
    items={categories.map(cat => ({
        title: cat.name,
        href: cat.link || '#',
        icon: cat.icon || Star,
        image: cat.image_url
    }))}
/>
```

### **Mobile Menu**

Shows first 8 categories in a 2-column grid:

```tsx
{categories.slice(0, 8).map((item) => {
    const Icon = item.icon || Star;
    return (
        <Link href={item.link || '#'}>
            <Icon /> {item.name}
        </Link>
    );
})}
```

---

## 🔧 Key Files & Their Roles

| File | Purpose |
|------|---------|
| `backend/api/products.ts` | Fetches products from Supabase with category filtering |
| `src/lib/categories.ts` | Fetches categories, maps slugs/icons/descriptions |
| `src/lib/product-adapters.ts` | Converts Product → Tour types |
| `src/components/layout/Navbar.tsx` | Displays dynamic categories in navbar |
| `src/components/layout/MegaMenu.tsx` | Reusable dropdown menu component |
| `src/components/layout/CategoryLayout.tsx` | Category page layout wrapper |
| `src/app/dubai/[category]/page.tsx` | Individual category pages (22 total) |

---

## 🎯 Icon Mapping

Categories are automatically assigned Lucide React icons based on their slug:

```typescript
const ICON_MAP = {
    'attraction': Star,
    'parks': Palmtree,
    'yacht': Ship,
    'water-adventures': Compass,
    'hotel': Building2,
    'car': Car,
    'dinner-cruise': Utensils,
    'sky-adventure': Plane,
    'visa': Ticket,
    'city-tours': MapPin,
    'adventure': Zap,
    'safari': Sun,
    'restaurant': Utensils,
    'games': Music,
    // ... etc
}
```

---

## 🎨 Description & Color Mapping

Each category gets a description and gradient color for UI:

```typescript
const DESCRIPTION_MAP = {
    'attraction': "Visit top-rated tourist spots and landmarks.",
    'parks': "Experience thrill and fun at world-class parks.",
    'yacht': "Luxury yacht rentals for private cruising.",
    // ... etc
}

const COLOR_MAP = {
    'attraction': "from-amber-600 to-yellow-500",
    'parks': "from-blue-600 to-cyan-500",
    'yacht': "from-emerald-600 to-teal-500",
    // ... etc
}
```

---

## ✨ What Changed

### **Before (Hardcoded)**
- Categories defined in arrays in Navbar.tsx
- 83KB of hardcoded product data in catalog.ts
- Static category menus

### **After (Dynamic)**
- Categories fetched from Supabase `categories` table
- Products fetched from Supabase `products` table
- Real-time updates when database changes
- Navbar mega menu populated from database
- Mobile menu categories populated from database
- 208 products across 16 categories

---

## 🧪 Testing

All category pages successfully render with products:
✅ `/dubai/theme-parks` - 17 products
✅ `/dubai/water-sports` - 12 products  
✅ `/dubai/attractions` - 40 products
✅ `/dubai/desert-safari` - 20 products
✅ `/dubai/yacht` - 21 products
✅ `/dubai/hotels` - 14 products
✅ ... (all 22 category pages working)

Build: ✅ Successful (54 pages generated)
TypeScript: ✅ No errors

---

## 🚀 Next Steps (Optional Improvements)

1. **Add destination filtering** - Filter products by destinations table
2. **Create separate water-parks category** - Currently shares "parks" with theme parks
3. **Add more categories** - Based on product_type field
4. **Cache categories** - Use React Query or SWR for better performance
5. **Add category admin panel** - CRUD operations for categories
