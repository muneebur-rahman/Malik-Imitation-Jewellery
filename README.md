# Malik Imitation Jewellery 💍

> **Premium Product Catalog + WhatsApp Ordering + Mobile Admin Panel + Local SEO**
> 
> A production-quality, modern, and responsive website crafted for **Malik Imitation Jewellery**, located in Gujri Bazar, Kamptee, Maharashtra.

---

## 🌟 Core Highlights

- **Business Philosophy:** Product discovery & WhatsApp conversion boutique (no complicated online payment or checkout walls).
- **Primary WhatsApp Number:** `+91 86687 03440` (Centralized configuration in [`src/config/business.js`](./src/config/business.js)).
- **Location:** 659V+4WH, Gujri Bazar, Near Jama Masjid, Kamptee, Maharashtra 441001.
- **Phone Numbers:** `9595947246`, `8282818076`, `8668703440`.
- **Design System:** Bespoke Ivory/Cream, Rich Onyx Charcoal, and Champagne Gold luxury styling with Google Fonts (`Cormorant Garamond` & `Plus Jakarta Sans`).
- **Product Lines:**
  1. **Imitation Jewellery:** Bridal chokers, temple jhumkas, American Diamond bangles, and daily wear chains.
  2. **Cosmetics & Beauty:** Matte liquid lipsticks, eyeshadow palettes, HD foundation, and vanity kits.
  3. **Bags & Clutches:** Embroidered Zari bridal potlis, evening hard-case clutches, and chic sling bags.

---

## 📱 WhatsApp Integration

Every product card and product details page generates a pre-filled enquiry message:

```text
Hi, I am interested in this product from Malik Imitation Jewellery.

Product: [PRODUCT NAME] (Price: ₹XXXX)
Category: [CATEGORY]

Please share availability and details.
```

- WhatsApp URL: `https://wa.me/918668703440?text=...`
- Primary Call: Clickable `tel:` links for all 3 store phone numbers.
- Google Maps: One-tap directions to the physical shop in Gujri Bazar, Kamptee.

---

## 🛠️ Architecture & Tech Stack

- **Frontend:** React 19, Vite, React Router 7, Modern Vanilla CSS Design System, Lucide Icons.
- **Backend & Database:** Supabase (Database, Storage Bucket `product-images`, and Authentication).
- **Security:** PostgreSQL Row Level Security (RLS) policies enforcing read-only access for visitors and full management for authenticated shop owner.
- **Local Fallback Mode:** Works seamlessly out-of-the-box in local storage preview mode, allowing immediate testing before cloud credentials are plugged in.
- **Local SEO:** Schema.org `JewelryStore` JSON-LD, geo coordinates for Kamptee (Maharashtra), OpenGraph previews, `robots.txt`, and `sitemap.xml`.

---

## 🚀 Getting Started

### 1. Install Dependencies
```powershell
npm install
```

### 2. Run Locally
```powershell
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 3. Connect Supabase (Beginner-Friendly)
Read our complete step-by-step guide:
👉 **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)**

Run the SQL script [`supabase-schema.sql`](./supabase-schema.sql) in your Supabase SQL editor to create the tables, storage buckets, and security policies automatically.

---

## 🔐 Admin Panel Routes

- **Login:** `/admin/login`
- **Dashboard:** `/admin`
- **Catalog List:** `/admin/products`
- **Add Product:** `/admin/products/new`
- **Edit Product:** `/admin/products/edit/:id`

*(Demo credentials for initial preview before configuring `.env`: `admin@malikjewellery.com` / `admin123`)*

---

## 📄 License
Created for Malik Imitation Jewellery, Kamptee, Maharashtra.
