# Flyout Tours Database Schema Summary

## 📊 Database Overview (Current State)

### ✅ Tables with Data

| Table | Rows | Purpose |
|-------|------|---------|
| **categories** | 16 | Product categories (Adventure, Attraction, Dinner Cruise, etc.) |
| **destinations** | 5 | UAE destinations (Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah) |
| **products** | 208 | Main products/tours/experiences |
| **product_images** | 542 | Product gallery images (avg 2.6 images per product) |
| **product_pricing** | 17 | Pricing tiers for product variants |

### ❌ Empty Tables (Ready for data)
- suppliers
- product_suppliers
- bookings
- reviews
- wishlist
- profiles
- promotions
- site_settings
- seo_meta
- notifications
- partners_applications

## 🔗 Database Relationships

```
┌─────────────┐
│ categories  │◄──┐
└─────────────┘   │
                  │
┌──────────────┐  │      ┌─────────────────┐
│ destinations │◄─┼──────┤    products     │
└──────────────┘  │      └─────────────────┘
                  │            │  │  │
                  └────────────┘  │  │
                                  │  │
                    ┌─────────────┘  └───────────────┐
                    │                                 │
                    ▼                                 ▼
            ┌───────────────┐               ┌──────────────────┐
            │product_images │               │ product_suppliers│
            └───────────────┘               └──────────────────┘
                                                     │  │
                                    ┌────────────────┘  └──────────┐
                                    │                               │
                                    ▼                               ▼
                            ┌──────────────┐              ┌────────────┐
                            │  suppliers   │              │  product_  │
                            └──────────────┘              │  pricing   │
                                                          └────────────┘
                                                                 │
                                                                 │
                                                                 ▼
                                                          ┌────────────┐
                                                          │  bookings  │
                                                          └────────────┘
                                                                 │
                                    ┌────────────────────────────┤
                                    │                            │
                                    ▼                            ▼
                            ┌──────────┐                 ┌──────────┐
                            │ reviews  │                 │ wishlist │
                            └──────────┘                 └──────────┘
```

## 📦 Core Product Structure

### 1. **products** (Main table - 208 products)
Core product information with these key fields:
- **Identity**: id, title, slug, subtitle
- **Media**: thumbnail_url → links to product_images
- **Organization**: category_id → categories, destination_id → destinations
- **Ratings**: rating, review_count
- **Content**: overview, highlights[], what_to_bring[], facilities[]
- **Business**: product_type, cancellation_policy, is_refundable
- **Status**: created_at, metadata

**Product Types Available:**
- activity, desert_safari, hotel, holiday_package, yacht
- visa, transfer, cruise, supercar, restaurant
- theme_park, water_park, dinner_cruise, sky_adventure

### 2. **categories** (16 categories)
Available categories:
- Adventure, Attraction, Dinner Cruise, Holiday Package
- Hotel, Restaurant, Sky Adventure, Supercar
- Theme Park, Transfer, Visa, Water Park
- Yacht, Cruise, Desert Safari

### 3. **destinations** (5 destinations)
UAE Emirates coverage:
- Dubai (main hub)
- Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah

### 4. **product_images** (542 images)
- Links to products via product_id
- Ordered by position field
- Images stored in Supabase Storage
- Average: 2.6 images per product

### 5. **product_pricing** (17 pricing tiers)
Currently has 17 pricing entries with:
- Duration: 10-60 minutes
- Price range: $110 - $1000
- All active (is_active = true)
- Links to product_suppliers (but that table is empty)

## ⚠️ Data Integrity Issues

1. **Missing Suppliers**: 
   - `suppliers` table is empty
   - `product_suppliers` table is empty
   - `product_pricing` references non-existent product_suppliers

2. **Missing Destinations on Products**:
   - Products show `destination_id: undefined`
   - Need to link products to destinations

3. **Orphaned Pricing**:
   - 17 pricing entries exist but no product_suppliers to link to

## 🚀 Next Steps to Complete Setup

### Priority 1: Create Suppliers
```sql
INSERT INTO suppliers (code, name, contact_email, contact_phone) 
VALUES ('SUP001', 'Supplier Name', 'email@example.com', '+971...');
```

### Priority 2: Link Products to Suppliers
```sql
INSERT INTO product_suppliers (product_id, supplier_id, price, display_title) 
VALUES (...);
```

### Priority 3: Update Products with Destinations
```sql
UPDATE products SET destination_id = '...' WHERE ...;
```

### Priority 4: Link Pricing to Suppliers
```sql
UPDATE product_pricing SET product_supplier_id = '...' WHERE ...;
```

## 📈 Database Statistics

- **Total Tables**: 16
- **Tables with Data**: 5 (31%)
- **Total Records**: 788
- **Average Product Rating**: ~4.2/5
- **Products per Category**: ~13
- **Images per Product**: ~2.6

## 🎯 Product Page Requirements (Based on Schema)

To display a product page, you need:
1. ✅ **products** table → title, overview, highlights, etc.
2. ✅ **product_images** → gallery
3. ✅ **categories** → category name
4. ⚠️ **destinations** → location (needs linking)
5. ⚠️ **product_pricing** → pricing options (needs suppliers)
6. ❌ **reviews** → customer reviews (no data yet)
7. ❌ **product_suppliers** → supplier variants (empty)

**Status**: Can create basic product pages but missing pricing/supplier data for booking functionality.
