# 💍 Step-by-Step Supabase Setup Guide for Malik Imitation Jewellery

Welcome! This guide is written specially for **complete beginners**. You do **not** need any prior database or backend experience. Just follow these steps one by one.

---

## 📋 What We Are Setting Up

Your website uses three services from Supabase:
1. **Supabase Database:** Stores product details (name, category, price, description, in-stock status).
2. **Supabase Storage:** Stores product photos uploaded by the shop owner from mobile/desktop.
3. **Supabase Auth:** Lets the shop owner securely log into the Admin Panel.

---

## Step 1: Create a Free Supabase Account
1. Open your browser and go to [https://supabase.com](https://supabase.com).
2. Click the green button: **"Start your project"** or **"Sign Up"**.
3. Sign up using your GitHub account or your email address.
4. Verify your email if prompted.

---

## Step 2: Create a New Supabase Project
1. Once logged into the Supabase dashboard, click the **"New Project"** button.
2. If asked to choose an Organization, select your default organization.
3. Fill in the project details:
   - **Name:** `malik-imitation-jewellery`
   - **Database Password:** Enter a strong password and save it in a safe place.
   - **Region:** Choose the region closest to your shop (for example: `South Asia (Mumbai)`).
   - **Pricing Plan:** Select **Free plan**.
4. Click **"Create new project"**.
5. Wait 1 to 2 minutes while Supabase sets up your database.

---

## Step 3: Get Your Project URL & Anon Public Key
1. In your Supabase project dashboard, look at the left sidebar and click on **Project Settings** (the gear icon ⚙️ at the bottom left).
2. In the settings menu, click on **API** (or **Data API**).
3. Under the **Project URL** section:
   - You will see a URL starting with `https://xxxxxxxx.supabase.co`.
   - Click the **Copy** button. This is your `VITE_SUPABASE_URL`.
4. Under the **Project API keys** section:
   - Find the key labeled **`anon` / `public`**.
   - Click the **Copy** button. This is your `VITE_SUPABASE_ANON_KEY`.
   - ⚠️ **SECURITY WARNING:** **NEVER** copy or share the `service_role` key! Only copy the `anon` / `public` key.

---

## Step 4: Run the Complete Schema Script (Tables, Storage & Policies)
We have prepared a complete SQL script called [`supabase-schema.sql`](./supabase-schema.sql) in your project folder. Running this script sets up everything automatically:

1. In the Supabase left sidebar, click on **SQL Editor** (the icon with `>_` or SQL terminal).
2. Click **"New query"**.
3. Open the file [`supabase-schema.sql`](./supabase-schema.sql) in this project, copy **all** of its contents, and paste them into the Supabase SQL editor.
4. Click the green **"Run"** button (or press `Ctrl + Enter`).
5. You should see a message saying: **"Success. No rows returned"** or table creations succeeded.

### What the script just did for you:
- ✅ Created the `products` table with all fields (name, slug, category, price, image, stock, active).
- ✅ Created the public storage bucket named `product-images` for photos.
- ✅ Enabled Row Level Security (RLS) so regular visitors cannot edit your items.
- ✅ Configured policies allowing visitors to view active products and only the admin to add/edit/delete.
- ✅ Inserted 8 beautiful starter products for Malik Imitation Jewellery.

---

## Step 5: Create Your Shop Owner Admin Account
Now let's create the email and password you will use to log into your `/admin` panel:

1. In the Supabase left sidebar, click on **Authentication** (the user/lock icon 👤).
2. Click on the **Users** tab.
3. Click the **"Add user"** button on the top right, then select **"Create user"**.
4. Fill in:
   - **User Email:** Enter your shop owner email (e.g. `owner@malikjewellery.com`).
   - **User Password:** Enter your secure password (minimum 6 characters).
   - Check the box: **"Auto Confirm User"** (this avoids waiting for email confirmation).
5. Click **"Create user"**.

---

## Step 6: Connect the Website (Add Environment Variables)
1. In your project root directory (`d:\My_Projects\Malik-Imitation-Jewellery`), find the file named `.env.example`.
2. Create a copy of `.env.example` and name the new file `.env` (or create a file called `.env` directly in the root folder).
3. Paste your credentials copied from Step 3:
   ```env
   VITE_SUPABASE_URL=https://your-actual-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-real-anon-key-here
   ```
4. Save the `.env` file.
5. In your terminal, restart the Vite development server:
   ```powershell
   npm run dev
   ```

---

## Step 7: Verification & Testing Checklist

Once your `.env` is configured:

1. **Check Admin Login:**
   - Open your browser to: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)
   - Notice the status badge at top: It will now say **"Supabase Cloud"** with a green dot!
   - Log in using the email and password you created in **Step 5**.
   - You should land on the **Store Management Dashboard**.

2. **Test Adding a New Product:**
   - Click **"Add New Product"** (or go to `/admin/products/new`).
   - Fill in:
     - Product Name: e.g. `Bridal Emerald Kundan Set`
     - Category: `Jewellery`
     - Subcategory: `Necklace Sets`
     - Price: `2800` (or leave empty to test "Enquire for Price")
     - Description: `Handcrafted choker set with emerald drops.`
   - Select a photo using the file picker (from your phone camera or computer).
   - Click **"Publish Product to Catalog"**.

3. **Verify Public Appearance:**
   - Go to the public website home page [http://localhost:5173/](http://localhost:5173/) or [http://localhost:5173/jewellery](http://localhost:5173/jewellery).
   - Your newly added product will appear immediately in the catalog!

4. **Test WhatsApp Ordering:**
   - Click on the new product to open its details page (`/product/...`).
   - Click **"Order / Enquire on WhatsApp"**.
   - WhatsApp will open with the pre-filled message:
     ```
     Hi, I am interested in this product from Malik Imitation Jewellery.

     Product: Bridal Emerald Kundan Set (Price: ₹2800)
     Category: Jewellery

     Please share availability and details.
     ```
   - Target number: `+91 86687 03440` (Primary WhatsApp).

---

## 💡 Troubleshooting Tips

- **Images not uploading?**
  Make sure you ran Step 4's script completely, which creates the `product-images` bucket. You can also verify this in Supabase by clicking **Storage** in the sidebar. You should see a bucket named `product-images` with a badge saying **Public**.
- **Login fails?**
  Make sure the user in Supabase Authentication -> Users has **Confirmed** status. If not, click the user and select "Confirm email".
- **Need to manage from mobile?**
  Open the admin URL on your phone's browser, log in, tap **"Add New Product"**, and use your mobile camera to take live product photos directly into the catalog!
