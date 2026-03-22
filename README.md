# The Whale Investors

Production-ready starter built with Node.js, Express, EJS, MongoDB, JWT cookies, Cloudinary uploads, and MVC naming.

## Quick start

1. Copy `.env.example` to `.env`
2. Install dependencies
   ```bash
   npm install
   ```
3. Run MongoDB locally or point `MONGODB_URI` to your cluster
4. Seed plans and admin
   ```bash
   npm run seed
   ```
5. Start dev server
   ```bash
   npm run dev
   ```

## Route file naming

Routes are intentionally named without `Routes` suffix:
- `auth.js`
- `pages.js`
- `user.js`
- `admin.js`
- `deposit.js`
- `withdrawal.js`
- `investment.js`
- `referral.js`
- `upload.js`

## Security included
- Helmet
- Rate limiting
- HPP
- Cookie-based JWT auth
- Input validation via `express-validator`
- Password hashing with `bcryptjs`
- MongoDB sanitization via custom sanitizer
- Cloudinary upload restrictions
- Centralized error handling
