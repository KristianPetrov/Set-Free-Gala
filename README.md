# Set Free Gala

A black-and-white, editorial-style Next.js site for the Set Free Gala, with Stripe-powered donations, ticket/table checkout, a Fieldy signature bass raffle, sponsorship logo uploads, and Resend receipt emails.

## Stack

- Next.js 16 (App Router, Turbopack) + React 19
- Tailwind CSS v4
- Stripe Checkout (hosted) via the `stripe` Node SDK
- Resend + React Email for branded transactional receipts
- Vercel Blob for sponsorship logo uploads

## Getting started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Configure environment variables. Copy `.env.example` to `.env.local` and set:

   ```bash
   STRIPE_SECRET_KEY=rk_... # restricted key preferred, sk_... also works
   STRIPE_WEBHOOK_SECRET=whsec_...
   RESEND_API_KEY=re_...
   RESEND_FROM="Set Free Gala <tickets@yourdomain.com>"
   NOTIFY_EMAIL=team@example.com
   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

   Don't have keys? Run `stripe sandbox create` with the [Stripe CLI](https://docs.stripe.com/stripe-cli) to provision a temporary sandbox. Claim it with `stripe sandbox claim` before it expires.

3. Run the dev server:

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## How donations work

- The donate section (`components/DonateSection.tsx`) posts to a server action (`app/actions.ts`) with an amount and frequency.
- The action creates a Stripe Checkout Session (`mode: payment` for one-time gifts, `mode: subscription` for monthly) and redirects to Stripe's hosted checkout.
- After payment, Stripe redirects to `/donate/success`, which verifies the session server-side before showing the thank-you page.
- Stripe sends `checkout.session.completed` to `/api/webhooks/stripe`, which sends the branded Resend receipt.

## How ticket checkout works

- Ticket, table, and sponsorship options are defined in `lib/products.ts` and rendered in `components/Tickets.tsx`.
- Sponsor tiers require a sponsor/company name and a PNG or JPG logo upload. Logos are stored in Vercel Blob before checkout.
- `createTicketSession` creates a Stripe Checkout Session and stores order details in session metadata.
- After payment, Stripe redirects to `/tickets/success`, and the webhook sends the receipt email.

## How raffle checkout works

- The Fieldy signature bass raffle is $25 per entry and supports multiple tickets in one order.
- Buyers provide their full name, phone number, and email before Stripe Checkout.
- Buyer details and ticket quantity are stored in Stripe Checkout metadata.
- After payment, Stripe redirects to `/raffle/success`; the webhook emails the buyer a confirmation and sends the order details to `NOTIFY_EMAIL`.

## Stripe webhooks

For local testing, forward Stripe events to the app:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the printed `whsec_...` value into `STRIPE_WEBHOOK_SECRET`.

## Email previews

Preview the React Email receipts locally:

```bash
pnpm email
```

Open [http://localhost:3001](http://localhost:3001). Use a verified Resend sending domain before going live; the default `resend.dev` sandbox can only send to your Resend account email.

Test card in sandbox/test mode: `4242 4242 4242 4242`, any future expiry, any CVC and ZIP.

## Going live

- Replace the sandbox key in `.env.local` with a restricted live key from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys).
- Review Stripe's [go-live checklist](https://docs.stripe.com/get-started/checklist/go-live).
