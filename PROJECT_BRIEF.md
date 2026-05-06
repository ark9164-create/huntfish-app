# Axios AI Fellow — Assignment 1 Deliverable

## What This Is

Take-home assignment for the Axios AI Fellow role (reports to Jim VandeHei + Mike Allen). Andrew had a successful founder interview on May 7; this is a post-interview deliverable.

## The Assignment

See `Axios_ AI Fellow role - Candidate Assignments.pdf` for the full prompt. Two assignments:

### Assignment 1: "Uber for Fly Fishing" (60-90 min cap)

Given a rough prototype for an "Uber for fishing and hunting guides" app, answer in 1-2 pages:

1. What are the 2-3 biggest product or UX improvements you'd make, and why?
2. What are the 2-3 biggest risks or hurdles you'd want to test early?
3. Briefly: how might AI help validate or de-risk this idea?

They say: "We're not looking for a perfect business plan, just to understand how you think, prioritize, and communicate."

### Assignment 2: "Your Current AI Project" (30 min cap)

Describe an AI project you're working on right now:
- What is it, and how are you using the technology?
- How would you explain to Jim and Mike how you're using it and how they could use it?

## The Prototype

`HuntFish_Prototype.tsx` — the original React prototype from Claude Artifacts. It's a single-file React app with:

- Fish/Hunt mode toggle with themed colors (cyan fishing, orange hunting)
- Filter-based search: where (location dropdown), when (season), experience level, sub-type (fly/spin/deep-sea or bow/gun)
- 18 hardcoded guides with ratings, reviews, catches, bios, pricing, availability
- 30 hardcoded species with difficulty ratings, locations, seasons, techniques
- Species encyclopedia with "bucket list" save feature
- Booking modal (fake — no backend, no payments, no messaging)
- Playfair Display + DM Sans fonts, polished animations

No backend. No real-time availability. No credential verification. No AI.

## AK's Strategy: Show Don't Tell

Instead of just writing 1-2 pages of bullet points, AK wants to **deploy an improved version of the app on Vercel** with an AI chatbot layer (OpenRouter), then write the response around the live app. The live app IS the answer to question 3 ("how might AI help") — demonstrated, not described.

## Framework Analysis (from NYU Stern Digital Innovation, Prof. Levina)

Two frameworks ground the whole response:

### Framework 1: Human Cloud 2x2

The prototype is built as a **Facilitator** (low governance by platform, buyer trusts the individual guide/supplier). But the vertical — boats, firearms, backcountry, $500+ stakes, serious liability — demands **Governor** positioning (platform provides governance, buyer trusts the platform brand). That Facilitator-Governor mismatch is where most of the real product work lives.

The 2x2 axes:
- X-axis: Where buyer's trust is placed (supplier vs. platform)
- Y-axis: Who provides project governance (buyer vs. platform)
- Facilitator = bottom-left (market). Governor = top-right (managed firm)

### Framework 2: ACE (Alignment, Coordination, Expertise)

The prototype solves **E** (Expertise matching — browse guide bios and catches) when the user's actual bottleneck is **C** (Coordination — who's free on my dates, what will conditions be, what's the cancellation policy, what gear do I need).

- **A (Alignment)**: How to keep guides on-platform after first trip? How to incentivize quality?
- **C (Coordination)**: Real-time availability, weather/conditions, booking logistics, cancellation terms
- **E (Expertise)**: Credential verification (USCG license, state permits, insurance), verified catches

## Deliverable Skeleton

### UX Improvements (2):

1. **Availability + conditions calendar** — ACE Coordination gap. Show who's free when conditions are right (weather, tides, hatches, seasons). The prototype shows guides; it should show *bookable windows with context*.

2. **Verified credentials as first-class UI** — Facilitator → Governor move. USCG license number, state outfitter permit, insurance carrier displayed as badges, not buried in a bio paragraph. This is what justifies the platform's take rate and differentiates from Google.

### Risks (2):

1. **Disintermediation** — after one trip, guide and angler go direct forever. Platform only captures on cold acquisition. Test: 12-month cohort, track repeat booking rate on-platform.

2. **Supply-side adverse selection** — top guides are already fully booked via word-of-mouth and lodge relationships. Guides who list immediately on a new platform skew toward new/struggling. Test: try recruiting 10 best guides in 3 regions and find out what it takes. If they won't list, consider pivoting to practice management software (calendar, payments, CRM) that also surfaces availability to new clients.

### AI De-Risking (1 clean answer):

- **Demand mining from enthusiast forums** — scrape r/flyfishing, MonsterMuley, FlyTalk, extract what people actually try to book, where, when, what they complain about. Builds a demand map cheaper than surveys. Plus AI-powered credential verification at intake (cross-reference state licensing databases at scale). The chatbot in the deployed app demonstrates this: natural-language trip planning > dropdown filters.

## What the Building Agent Should Do

1. **Set up a Next.js or Vite React project** deployable to Vercel
2. **Port the prototype TSX** into the project as the base
3. **Add an AI chatbot layer** (OpenRouter API — use a cheap model like `google/gemini-2.0-flash`) that acts as a trip-planning concierge:
   - User describes what they want in natural language ("I've never fished before but I'm going to Florida in October with my dad")
   - Chatbot recommends guides from the hardcoded dataset, explains why, asks follow-up questions
   - Chatbot has access to the full guide + species data as context
4. **Add credential verification badges** to guide cards (mock data — USCG #, state permit #, insurance badge)
5. **Add a conditions/availability overlay** on guide cards (mock data — available dates with weather context)
6. Deploy to Vercel, return the live URL

### Design Notes
- Keep the existing visual design (Playfair Display + DM Sans, cyan/orange theming)
- Chatbot should be a slide-out drawer or floating panel, not replace the browse UI
- The chatbot IS the "AI de-risking" demo — it should feel like a real product improvement, not a gimmick
- OpenRouter API key should be in env vars, not hardcoded

## AK's Voice / Style Rules (for any written copy in the app)
- No em-dashes
- No "slots" (say "tour times" if relevant)
- No "venue" (say "attraction" if relevant)
- No promotional adjectives or inflated language
- Direct, concrete, specific

## Files in This Folder
- `PROJECT_BRIEF.md` — this file
- `HuntFish_Prototype.tsx` — original prototype source code
- `Axios_ AI Fellow role - Candidate Assignments.pdf` — the assignment prompt
