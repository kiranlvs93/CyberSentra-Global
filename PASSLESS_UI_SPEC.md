# Passless Product UI/UX Design Specification

## 0. Product Overview
Passless is a passwordless authentication platform that serves two audiences:

- **End-users** who sign up and sign in to their accounts using platform-level passkeys (Face ID, Touch ID, Windows Hello) with optional fallback verifications.
- **Admin / Company Integrators** who manage organizational accounts, observe risk and activity telemetry, and tune policies through a SaaS-style portal.

This document provides page-by-page interaction flows, layout guidance, components, copy, and accessibility requirements to hand off to designers and front-end engineers (React + Tailwind CSS).

---

## 1. Global Foundations

### 1.1 Visual Language
- **Mood**: Minimalist, calm confidence. Dark foundation with vibrant accents for focus states and statuses.
- **Spacing Scale**: 4px base. Key steps spaced at 16px increments for clarity.
- **Layout Grid**:
  - Mobile: 4px grid, 16px margin, stacked content.
  - Tablet: 8-column grid, 24px gutters.
  - Desktop: 12-column grid, 80px max content width for end-user flows, 1200px max for admin dashboards.

### 1.2 Color Palette
| Token | Hex | Usage |
| --- | --- | --- |
| `bg-base` | `#0F172A` | App background (dark blue-gray). |
| `bg-elevated` | `#16213C` | Cards, sheets. |
| `accent-primary` | `#5B8CFF` | Primary CTAs, links, focus rings. |
| `accent-secondary` | `#7EE787` | Success chips, positive states. |
| `accent-warning` | `#FBBF24` | Warnings, fallback prompts. |
| `accent-danger` | `#F87171` | Errors, blocked states. |
| `text-high` | `#F8FAFC` | Primary text. |
| `text-muted` | `#94A3B8` | Secondary text. |
| `border-default` | `#1F2937` | Dividers, input borders. |
| `overlay` | `rgba(15, 23, 42, 0.72)` | Modal scrim. |

Tailwind example setup:
```ts
// tailwind.config.js excerpt
colors: {
  base: '#0F172A',
  elevated: '#16213C',
  accent: {
    primary: '#5B8CFF',
    secondary: '#7EE787',
    warning: '#FBBF24',
    danger: '#F87171',
  },
  text: {
    high: '#F8FAFC',
    muted: '#94A3B8',
  },
  border: '#1F2937',
}
```

### 1.3 Typography
- **Primary Typeface**: `Inter` (sans-serif) – widely available, great legibility.
- **Scale**:
  - Display (landing hero): 36px / 44px tracking -1.
  - H1: 28px / 36px, medium weight.
  - H2: 22px / 30px.
  - Body Large: 18px / 26px.
  - Body Default: 16px / 24px.
  - Caption: 14px / 20px.
- Tailwind utilities: `font-sans`, `font-medium`, `text-2xl`, etc.
- Accessibility: Maintain 4.5:1 contrast for body text; ensure text resizing up to 200% without breaking layout.

### 1.4 Iconography & Illustrations
- Use simple outline icons (e.g., Heroicons) in `text-muted` color by default, `accent-primary` on active/focused states.
- Use friendly abstract illustrations (soft gradients on dark backgrounds) sparingly, mainly on welcome/register pages.
- Provide accessible `alt` text for all decorative images (empty `alt=""`) vs informative icons (descriptive `aria-label`).

### 1.5 Components & Patterns
- **Primary Button**: `bg-accent-primary` with `hover:bg-[#4A78D9]`, `focus:ring-4 ring-accent-primary/30`. 16px vertical padding, 24px horizontal, 8px radius, bold text.
- **Secondary Button**: `bg-transparent`, border `border-default`, text `text-high`.
- **Tertiary Action**: text-only link style.
- **Status Chip**: pill with icon + label. Sizes `sm` (height 28px) and `md` (32px). Colors map to statuses (Idle `text-muted` + border, Authenticating `accent-primary` + spinner, Behavior Check `accent-warning`, Success `accent-secondary`, Error `accent-danger`).
- **Input Field**: filled variant (`bg-elevated`, border `border-default`, 12px radius). On focus: border `accent-primary`, drop-shadow `accent-primary/40`.
- **Sheet / Card**: `bg-elevated`, 24px radius, 32px padding mobile (24px). Shadow `0 24px 48px rgba(15, 23, 42, 0.35)`.
- **Progress/Spinner**: circular with accent gradient.
- **Toast Notification**: anchored bottom center (mobile) / bottom right (desktop). Provide success/failure feedback (e.g., "Passkey created").
- **Responsive Behavior**: On mobile, content stacks; on desktop, two-column layout with supporting illustration or summary column.

### 1.6 Accessibility & Microcopy
- Buttons and chips must have accessible names and focus outlines. Provide `aria-live="polite"` for status updates.
- Error messages plain language, e.g., "We couldn't verify that code. Try again or choose a different option." Provide inline field errors.
- All icon-only controls require `aria-label` and tooltip on hover.
- Provide keyboard-only navigation for modals/passkey prompts (skip link `"Skip to content"`).

---

## 2. End-User Experience (Consumer App Vibe)

### 2.1 Page 1 – Welcome / Sign-in
- **Layout**: Fullscreen dark gradient background. Centered card (max 420px) with Passless logo top center, tagline "Sign in safely without passwords." Optional background particle animation at low opacity.
- **Sections**:
  1. **Header**: Logo + tagline (H1). Subtext: "Use your device's passkey or register a new one."
  2. **Primary CTA group**:
     - `Button` "Use Passkey" (primary).
     - `Button` "Register" (secondary, ghost style).
  3. **Tertiary Link**: "Troubleshoot sign-in" (text link with arrow icon). Opens bottom sheet describing fallback steps.
  4. **Footer**: Small text for privacy/terms links.
- **States**:
  - `Idle`: Buttons enabled.
  - `Authenticating`: after tapping "Use Passkey", show modal overlay with spinner + status chip `Authenticating`. Provide cancel button.
  - `Error`: toast at bottom: "We couldn't find a passkey on this device." CTA `Try another way` → fallback page.
- **Responsive**: On desktop, card aligns left with right-hand hero illustration showing device outline.

### 2.2 Page 2 – Register: Email Capture
- **Layout**: Stepper indicator top (Step 1 of 3). Card with form field.
- **Sections**:
  1. **Headline**: "Let's find your account".
  2. **Input**: Email field with label + helper text "We'll send a verification if needed." Provide inline validation (format check).
  3. **CTA Row**: `Continue` (primary) full width, `Back` (text button) top left of card or at bottom.
  4. **Support Copy**: "Need help?" link to troubleshoot.
- **States**:
  - On submit: show spinner on button, disable field.
  - Error (invalid email) with helper text `accent-danger`.
  - Success: advance to Create Passkey page.
- **Accessibility**: `aria-describedby` for helper + error, label persists.

### 2.3 Page 3 – Create Passkey
- **Layout**: Same card structure with stepper (Step 2). Large icon representing biometric prompt.
- **Content**:
  - Title: "Create your Passkey".
  - Subtitle: "We'll use your device's secure enclave to keep you safe."
  - Section with bullet list of benefits ("No passwords to remember", "Works on any synced device").
  - Primary CTA `Create Passkey` triggers WebAuthn API (pop-up).
  - Secondary link: "What is a passkey?" (opens tooltip modal).
- **States**:
  - `Idle`: CTA ready.
  - `Prompting`: overlay with OS-specific biometric illustration and text "Confirm with Face ID" etc. Provide cancel.
  - `Success`: toast "Passkey saved!" leading to optional secondary passkey page.
  - `Error`: inline alert `accent-danger`: "We couldn't finish creating a passkey. Try again or use fallback." Provide `Retry` button.

### 2.4 Page 4 – Add Secondary Passkey (Optional)
- **Purpose**: Encourage registering another device.
- **Layout**: Card with friendly illustration of two devices.
- **Content**:
  - Title: "Add another device?"
  - Body: "Set up a backup passkey so you can sign in from your laptop too."
  - CTA options: `Add another device` (primary), `Skip for now` (secondary button). Provide note "You can add more later in settings."
  - If user chooses to add: show instructions for scanning QR or using platform handshake (component reveals step list).
- **States**: `Idle`, `Processing` spinner while waiting for secondary device handshake, `Success` chip "Synced" with accent-secondary, `Skip` transitions to login success screen or direct to account.

### 2.5 Page 5 – Login with Passkey
- **Layout**: Card with status area top, passkey prompt center, fallback prompt bottom.
- **Content**:
  - Title: "Welcome back" + user avatar initial from email.
  - Status Chip row: `Idle` (gray), `Authenticating` (blue with spinner), `Behavior Check` (amber) when risk scoring is running.
  - Central action: `Use Passkey` button. On click, show biometric overlay.
  - Inline info: "No passkey? Choose another option." link to fallback challenge.
- **States**:
  - Show timeline indicator (three dots) that fill as statuses progress.
  - On `Behavior Check`, show message "We just need an extra check while we keep you safe" with friendly icon.
  - `Success`: redirect to app/home, display `Success` chip.
  - `Failure`: error card "We couldn't verify this attempt." CTA `Try again` or go to fallback.

### 2.6 Page 6 – Fallback Challenge Selection
- **Layout**: Fullscreen sheet with list of fallback methods.
- **Content**:
  - Title: "Choose a different way to verify".
  - Option cards (radio style) for `One-time code (SMS/email)` and `Magic Link` (email). Each card shows icon, description, estimated time (e.g., "~30 seconds").
  - CTA `Continue`. `Cancel` link to go back.
- **States**: Option must be selected; otherwise `Continue` disabled. On continue, show spinner overlay "Sending...".

### 2.7 Page 7 – Verify OTP / Magic Link
- **Two variations** controlled by selection**
  - **OTP**:
    - Title: "Enter the 6-digit code".
    - Show masked destination: "Sent to ••••@example.com".
    - Input: segmented code input (6 boxes, auto-advance). Provide `Resend code` link (30s timer) and `Switch method` link.
    - After submission: status chip `Checking...` with spinner. Success leads to session creation.
    - Error: highlight boxes in `accent-danger` with message "That code expired." Provide `Resend`.
  - **Magic Link**:
    - Title: "Check your inbox".
    - Body: "Tap the secure link from your email on this or another device." Provide envelope illustration.
    - Display `Magic link sent` chip `accent-secondary`.
    - Provide `Open mail app` button (mobile) / `Copy link` and `Resend` options.
    - Auto-redirect state: When backend detects link clicked, show `Success` state with confetti animation, button `Continue to your account`.
- **Accessibility**: Provide `aria-live` updates for timers, `Resend` button accessible once timer done.

---

## 3. Admin Portal Experience (Enterprise SaaS Vibe)

### Layout System
- **Shell**: Top bar (logo, environment badge, user menu). Left side navigation (collapsed on mobile). Content area uses 12-column grid, 32px gutters desktop.
- **Nav Sections**: Overview, Risk Scoring, Events, Reports (optional), Settings. Highlight active route with background `bg-elevated` and left accent bar.
- **Search & Global Actions**: Search input in top bar (placeholder "Search users, devices, events"), `Create API Key` button when relevant.

### 3.1 Page A – Admin Sign-in (Passkey)
- **Layout**: Similar aesthetic to end-user but more professional. Center card with company logo and `Sign in as admin` text.
- **Content**: `Use Passkey` button (primary), `Request access` link.
- **States**: Idle, Authenticating (spinner), Behavior check (amber chip). On failure, show inline alert `accent-danger` with support email.
- **Accessibility**: Provide `aria-live` for status updates.

### 3.2 Page B – Overview Dashboard
- **Structure**: Title bar with date range picker (default Last 7 days) + filter chips (All tenants, Production). Layout grid:
  - **KPI Cards Row** (4 columns desktop, 2 columns tablet, stack mobile):
    - Total Logins (value + trend vs prior period).
    - Risky Logins (value, percent of total, red badge if > threshold).
    - Fallback Usage (value, sparkline).
    - Passkey Registrations (value + trending arrow).
  - **Charts Section** (two-up on desktop):
    - Line chart: Logins & Risk Score over time.
    - Donut chart: Methods breakdown (Passkey vs Fallback vs Blocked).
  - **Recent Activity Table**: Last 10 events with columns: User, Method, Risk Score badge (color-coded), Decision, Timestamp, Quick action menu.
  - **Alert Banner** (optional): If risk spikes, show warning card `accent-warning` with CTA "Review in Risk Scoring".
- **Interactions**:
  - Date range updates all widgets.
  - Table row click navigates to Event Detail.
  - Export button near table (`Download CSV`).

### 3.3 Page C – Risk Scoring
- **Layout**: Two-column (left filters/control, right visualization) on desktop; stacked on mobile.
- **Left Panel**:
  - Section title: "Risk Engine".
  - Controls: slider or input for risk threshold (0–100). Provide helper text "Current block threshold: 75".
  - Toggle switches for signals ("Geo anomaly", "Device reputation", "Velocity check").
  - CTA `Save Policy` (primary) disabled until changes.
- **Right Panel**:
  - Heatmap showing risk scores by region/time (x-axis = hour, y-axis = region). Provide tooltip on hover.
  - Secondary chart: bar chart of anomaly types (e.g., "Impossible travel", "Device mismatch").
  - Info card summarizing "Top affected tenants".
- **States**:
  - `Idle` with data loaded.
  - `Loading` (skeleton shimmer) while fetching.
  - `Error` (empty state card with retry button).
  - On `Save Policy`, show inline confirmation toast `Policy updated`. All changes tracked (dirty state indicator).

### 3.4 Page D – Events / Activity Log
- **Layout**: Full-width data table with controls top.
- **Header Controls**:
  - Search bar.
  - Filters: dropdowns for `Method`, `Decision`, `Risk Tier`, date range.
  - `Export` button (icon + label) and `Columns` settings (opens modal toggles).
- **Table Columns**: Checkbox (for bulk actions), Event ID (link), User, Device, Method, Risk Score (chip color-coded), Decision (Allow/Challenge/Block), Location, Timestamp, Actions (ellipsis menu).
- **Pagination**: bottom right with page size selector.
- **Empty State**: illustration with message "No events match your filters" and CTA to reset filters.
- **Bulk Actions**: appear in sticky footer when rows selected (e.g., `Export selected`, `Label as reviewed`).

### 3.5 Page E – Event Detail
- **Layout**: Two-column card layout.
  - **Left (2/3 width)**: Session summary card showing user info, login type, status chips (Allow, Challenge, Block). Timeline of event steps (Passkey Attempt → Risk Evaluation → Decision) with icons. Each step expandable to view raw details.
  - **Right (1/3 width)**: Risk factors card (list of contributing signals with weight, color-coded). Provide badges like `High` (red), `Medium` (amber).
  - Additional tabs or accordion for `Device info`, `Network`, `Raw payload` (JSON viewer with copy button).
- **Actions**: Buttons `Mark as reviewed`, `Create case`, `Block user` (danger). Provide confirmation modal for destructive actions.
- **States**: Provide skeleton while loading, error message if not found, success toast on mark reviewed.

### 3.6 Page F – Settings
- **Sub-navigation** tabs across top**: `Policies`, `Fallback`, `API Keys`, `Branding`, `Integrations` (if needed).

**Policies Tab**:
- Card-based forms for `Risk Threshold`, `Auto-block rules`, `Notification preferences` (toggles, sliders, segmented controls).
- Provide inline helper texts + `Last updated` info.

**Fallback Tab**:
- Options to enable/disable OTP, magic links, allow hardware keys. Provide radio groups and toggles. Secondary card with fallback usage analytics (mini chart).
- Info note: "Consider enabling at least one fallback for new users".

**API Keys Tab**:
- Table listing API keys with columns Name, Scope, Created, Last used, Status. Button `Create new key` opens modal with name input, scopes (checkbox list), and summary.
- Show copy-to-clipboard icon with tooltip "Copied".

**Branding Tab**:
- Form for uploading logo (drag & drop), selecting accent color (color picker), customizing email templates (preview card). Provide guidelines for contrast.

### 3.7 Optional Page G – Reports / Exports
- Layout: List of prebuilt reports (Monthly Usage, High-Risk Sessions, Fallback Adoption). Each card shows description, schedule toggle, last generated date, `Download` button.
- Provide ability to schedule email delivery (modal with recipients, cadence). Show success toast `Report scheduled`.

### 3.8 Optional Page H – Users & Devices Management
- Table view with tabs `Users` and `Devices`.
- User detail slide-over: shows profile info, registered devices list (with passkey status), ability to revoke credentials. Provide warning modal before revocation.

---

## 4. Motion & Feedback
- **Microinteractions**: Buttons animate with 120ms ease-out. Status chips fade between colors. Cards rise 4px on hover desktop.
- **Page transitions**: Fade + slide up for modals. When completing steps, show progress indicator updating.
- **Loading**: Use skeletons on data-rich pages (tables, dashboards). For passkey operations, use overlay spinner with friendly copy.

---

## 5. Responsive Behavior Summary
- **Mobile**: Side nav collapses into bottom sheet or hamburger menu. Tables become cards with key fields stacked. Charts use horizontal scroll or summary numbers.
- **Desktop**: Multi-column layout, persistent nav, more whitespace.
- **Accessibility**: Ensure interactive elements sized min 44x44px. Provide keyboard navigation for tables (focus ring). All color-coded statuses also include text labels and icons for colorblind users.

---

## 6. Copy & Tone Guidelines
- Friendly, supportive, and clear.
- Example success message: "You're all set!"; fallback prompt: "We just need an extra check to keep your account secure."
- Avoid alarmist language; emphasize control and transparency.
- Provide localized copy keys (JSON) for translation readiness.

---

## 7. Implementation Notes (React + Tailwind)
- Organize UI as components: `PasskeyButton`, `StatusChip`, `Stepper`, `Card`, `FallbackOptionCard`, `MetricCard`, `DataTable`, `HeatmapChart`, etc.
- Use Headless UI/ Radix primitives for accessible dialogs and menus.
- Charting: recommend `Recharts` or `Visx` with dark theme support.
- Manage theming via Tailwind `data-theme` attribute to support white-labeling in admin settings.
- Leverage `@tanstack/react-query` for data fetching to manage loading/error states elegantly.
- Provide storybook entries for each component with state variations.

---

## 8. QA & Accessibility Checklist
- [ ] All pages tested with keyboard-only navigation.
- [ ] Contrast meets WCAG AA (use accent colors over dark backgrounds with proper brightness).
- [ ] Passkey flows tested on Safari (Face ID), Chrome (Touch ID / Windows Hello), Android.
- [ ] Screen reader labels for status updates, CTA descriptions.
- [ ] Error states provide actionable next steps.

