# Square Online Shop Setup Guide for TC Pro Dojo

## Overview
Your shop page is ready to integrate with Square Online - a free e-commerce platform that accepts credit/debit cards with secure checkout.

## Step 1: Create Your Free Square Online Store

1. **Go to Square Online**: https://squareup.com/us/en/online-store
2. **Sign Up for Free Account**:
   - Click "Get Started"
   - Use email: info@tcprodojo.com
   - Create password
   - Business name: "TC Pro Dojo" or "Torture Chamber Pro Wrestling Dojo"

3. **Choose Free Plan**:
   - Square offers a FREE plan with:
     - Unlimited products
     - Secure checkout
     - Credit/debit card processing
     - Only pay processing fees (2.9% + $0.30 per transaction)

## Step 2: Set Up Your Store

1. **Store Settings**:
   - Store Name: TC Pro Dojo
   - Add your logo (circle-logo.jpg)
   - Add description about TC Pro Dojo

2. **Create Product Categories**:
   - Category 1: "Merch" (for apparel and gear)
   - Category 2: "Tickets" (for event tickets)

## Step 3: Add Products

### MERCH PRODUCTS:
1. TC Pro Dojo T-Shirt - $29.99
2. TC Championship Hoodie - $54.99
3. TC Training Shorts - $34.99
4. TC Snapback Cap - $24.99
5. TC Gym Bag - $44.99
6. TC Water Bottle - $19.99

### EVENT TICKETS:
1. TC Winter Showcase 2025 - (Set your price)
2. Pro Wrestling Invitational - (Set your price)
3. Spring Training Exhibition - (Set your price)
4. TC 21st Anniversary Celebration - (Set your price)

## Step 4: Get Your Store URL

1. After setup, Square will give you a store URL like:
   - `https://square.site/book/YOUR-UNIQUE-ID` or
   - `https://tc-pro-dojo.square.site`

2. You can also use custom domain if you have one

## Step 5: Update Your Website

1. **Open the Shop.js file**:
   ```
   /app/frontend/src/pages/Shop.js
   ```

2. **Find line 10** and replace with your actual Square store URL:
   ```javascript
   const SQUARE_STORE_URL = 'https://YOUR-ACTUAL-SQUARE-URL';
   ```

3. **Save the file** - the shop will now link to your live store!

## Step 6: Category Links (Optional)

If Square supports category filtering in URLs:
- Update MERCH_CATEGORY_URL to link directly to merch
- Update TICKETS_CATEGORY_URL to link directly to tickets

Example:
```javascript
const MERCH_CATEGORY_URL = `${SQUARE_STORE_URL}/category/merch`;
const TICKETS_CATEGORY_URL = `${SQUARE_STORE_URL}/category/tickets`;
```

## Payment Processing

**Square Fees**:
- 2.9% + $0.30 per transaction (standard for all payment processors)
- No monthly fees on free plan
- Instant transfer available (for a fee) or standard 1-2 business days

**Accepted Payment Methods**:
- Visa, Mastercard, American Express, Discover
- Apple Pay, Google Pay
- Cash App Pay

## Benefits of Square Online

✅ Free to start
✅ Professional checkout experience
✅ Mobile-optimized
✅ Secure payment processing
✅ Inventory management
✅ Email receipts to customers
✅ Sales analytics
✅ No coding required to manage products

## Support

If you need help:
- Square Support: https://squareup.com/help
- Square Community: https://www.sellercommunity.com/

## After Setup

1. Test your shop by making a test purchase
2. Remove the yellow admin notice from Shop.js (lines 152-161)
3. Add real product images in Square dashboard
4. Promote your shop on social media

---

**Need Help?** Contact your web developer or Square Support for assistance setting up your account.
