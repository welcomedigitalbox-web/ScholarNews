# ScholarMatch AI

Production-ready scholarship discovery MVP for international students. Built with Next.js, TypeScript, the App Router, Tailwind CSS, Firebase Authentication, and Cloud Firestore.

## Features

- Responsive landing, authentication, profile, scholarship, saved, tracker, and admin pages
- Email/password authentication through Firebase
- Firestore-ready user profiles and scholarship management
- Scholarship search and filters
- Device-local demo fallback when Firebase is not configured
- Accessible reusable UI components and validated forms
- Six realistic sample scholarships

AI SOP generation is intentionally not included in this release.

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and add your Firebase web app values.

3. In Firebase Console, enable **Authentication → Email/Password** and create a **Cloud Firestore** database.

4. Start the development server:

   ```bash
   npm run dev
   ```

## Firestore collections

- `users/{uid}` — account details and role (`student` or `admin`)
- `profiles/{uid}` — student academic profile
- `scholarships/{scholarshipId}` — manual and API-imported scholarship records

Deploy the included `firestore.rules` file before production use. It lets students manage only their own profile and restricts scholarship writes to administrators.

### Create the first administrator

1. Create the administrator through the normal sign-up page.
2. In Firebase Console → Firestore → `users/{uid}`, change `role` from `student` to `admin`.
3. Sign in at `/admin-login`.

Only an existing administrator can assign future admin roles. Do not let users choose their own role during registration.

## Automatic scholarship imports

The admin dashboard includes a protected **Import from API** workflow using [ScholarshipAPI](https://scholarshipapi.com/). Add these server-only variables:

```bash
SCHOLARSHIP_API_KEY=your_provider_key
ADMIN_SYNC_KEY=a_long_random_secret
```

Imported records are always saved as drafts. An administrator must verify the official URL, deadline, eligibility and funding before publishing.

## SEO

The app includes route-specific metadata, canonical URLs, Open Graph and Twitter metadata, `robots.txt`, XML sitemap generation, a web manifest, no-index rules for private pages, and structured data on scholarship detail pages.

## Quality checks

```bash
npm run lint
npm run build
```

## Vercel deployment

Import the repository into Vercel, add every variable from `.env.example` under Project Settings → Environment Variables, and deploy. The project uses the Next.js App Router and requires no custom build command.
