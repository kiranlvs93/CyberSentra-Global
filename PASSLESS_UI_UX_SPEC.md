# Passless UI/UX Specification

## Brand Foundations

### Experience Principles
- **Trust without friction**: communicate security cues with reassuring copy and subtle motion rather than alarming alerts.
- **One-tap actions**: focus on the primary CTA per screen with large hit areas and generous spacing, optimized for thumbs.
- **Progress visibility**: status chips, inline loaders, and contextual guidance explain the current step and next action.
- **Consistency across audiences**: shared visual language (typography, color, iconography) with tailored tone—friendly for end-users, professional for admins.

### Color Palette (Dark-first)
| Purpose | Token | Value | Usage |
| --- | --- | --- | --- |
| Background base | `--surface-900` | #0F1115 | App shells, full-bleed backgrounds |
| Elevated surface | `--surface-800` | #161921 | Cards, modals |
| Accent primary | `--accent-500` | #5B8DEF | Primary CTAs, focus states |
| Accent hover | `--accent-400` | #7AA4FF | CTA hover, active inputs |
| Success | `--success-500` | #4CD17C | Success chips, confirmation banners |
| Warning | `--warning-500` | #F0B429 | Behavior checks, pending review |
| Danger | `--danger-500` | #F76A6A | Errors, high-risk indicators |
| Neutral text high | `--text-100` | #F7F9FC | Primary text |
| Neutral text secondary | `--text-300` | #C5CBD6 | Helper text, labels |
| Border | `--border-600` | #242834 | Dividers, input borders |
| Chart gradient | `--chart-start` → `--chart-end` | #5B8DEF → #92E3A9 | Dashboard charts |

> **Accessibility**: All color pairs meet or exceed WCAG AA contrast (minimum 4.5:1) on dark surfaces. Use semantic Tailwind classes (e.g., `text-success-500`, `bg-surface-800`).

### Typography
- **Primary typeface**: Inter (system fallback: `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`).
- **Scale** (Tailwind utility mapping):
  - Display / Hero: 32px `text-3xl` (mobile), 48px `text-5xl` (desktop).
  - Headings: `text-2xl` (H2), `text-xl` (H3), `text-lg` (section titles).
  - Body: `text-base` for primary copy, `text-sm` for captions and helper text.
  - Buttons: `text-base font-medium` with 52px min height.
- Line height 1.4–1.6 for readability. Enforce minimum 16px text size.

### Iconography & Illustration
- Use phosphor-react or heroicons outline set for consistency.
- Key icons: fingerprint, key, shield-check, info, warning, clock, document-text, chart.
- All icons with `aria-hidden="true"` unless critical. Provide `sr-only` text for assistive tech.
- Subtle abstract wave or gradient background for hero sections; Lottie-based fingerprint animation optional.

### Components & Tokens
- **Buttons**: Primary (filled accent), Secondary (outline with accent border), Ghost (text with underline on hover). Disabled states reduce opacity (60%) and remove shadows.
- **Inputs**: Full-width, 48px height, rounded (`rounded-lg`), accent border on focus, error state with red border + helper text.
- **Chips**: Rounded pill, `inline-flex items-center gap-2 px-3 py-1 text-sm`. Status colors map to Idle (`--text-300` border), Authenticating (`accent` animated dots), Success (`success-500`), Warning (`warning-500`), Error (`danger-500`). Include spinner icon when loading.
- **Cards**: `bg-surface-800 rounded-2xl shadow-lg shadow-black/40 p-6` for elevated content. Use grid gap of 24px.

---

## End-User Experience (7 Screens)
Mobile-first layout widths assume 360px viewport; desktop uses centered column max-width 480px with generous padding and blurred gradient background.

### 1. Welcome / Sign-in
**Purpose**: Provide quick access to passkey login, registration, or troubleshooting.

**Layout**
- App bar: minimal top-left wordmark (Passless logomark), top-right help icon → opens FAQ modal.
- Content stack (centered, `mt-24 md:mt-32`):
  1. Hero icon (animated fingerprint) `w-16 h-16`.
  2. Headline: “Sign in securely with Passless”.
  3. Subcopy: “Your passkey keeps you safe without passwords.”
  4. Primary CTA button: “Use Passkey” (`id="btn-passkey"`). Trigger WebAuthn prompt.
  5. Secondary button (outline): “Register new device”.
  6. Tertiary text button: “Troubleshoot access” → opens bottom sheet with quick tips and link to fallback flow.

**States**
- **Idle**: Primary CTA enabled.
- **Authenticating**: Replace CTA label with spinner + “Waiting for your passkey…”; show inline status chip (accent) below button.
- **Error**: Red inline alert card with icon + message (e.g., “Passkey declined. Try again or choose a fallback.”) Provide `aria-live="polite"` region.

### 2. Register – Email Capture
**Purpose**: Start registration by associating an email.

**Layout**
- Back button (chevron) to Welcome.
- Progress indicator (1 of 3) using segmented bar.
- Card containing:
  - Title: “Let’s confirm your email”.
  - Description: “We’ll send a secure link if you ever need it.”
  - Form field: Email input with label, placeholder `you@company.com`, validation messages below.
  - Primary CTA: “Continue”. Disabled until valid email.
  - Secondary text button: “Back”.

**States**
- **Validating**: CTA shows inline loader, status chip near top “Checking eligibility…”.
- **Error**: Inline message (“We couldn’t find that email. Try another or contact support.”) with friendly tone.

### 3. Create Passkey
**Purpose**: Invoke biometric registration.

**Layout**
- Step indicator (2 of 3).
- Illustration of device/biometric.
- Title: “Create your passkey”.
- Copy: “Use Face ID, Touch ID, or a security key. Your biometric stays on this device.”
- Primary CTA: “Create Passkey”. On click, call WebAuthn `navigator.credentials.create`.
- Tips: `Accordion` (optional) with “Need help?” toggling instructions for each platform.
- Footer note: “Having trouble? Use alternative verification.” Link to fallback.

**States**
- **Prompting**: CTA disabled, show chip “Waiting for confirmation…” with animated dots.
- **Success**: Swap icon to success check; show confirmation message and auto-progress after 1.5s or manual “Continue”.
- **Failure**: Inline friendly error (“We couldn’t complete the passkey. Try again or switch device.”).

### 4. Add Secondary Passkey (Optional)
**Purpose**: Encourage device redundancy.

**Layout**
- Step indicator (3 of 3) – optional tag.
- Title: “Add a backup passkey”.
- Subcopy: “Set one up on another phone or hardware key to stay covered.”
- Illustrative carousel showing devices (mobile, laptop, security key).
- CTA row:
  - Primary: “Add another device now”.
  - Secondary: “Skip for now” (ghost button) → confirm skip.
- Tip: Info banner (surface-800 with accent border) explaining benefits.

**States**
- **Skip Confirm Modal**: “You can always add it later in settings.” Buttons: “Skip” (secondary), “Go Back”.
- **Adding**: Mirror Create Passkey state with status chip.
- **Completed**: Show list of registered devices (name, platform icon, last used). CTA -> “Finish”.

### 5. Login with Passkey
**Purpose**: Primary authentication path.

**Layout**
- Centered card with user avatar initial (generated from email) + masked email.
- Title: “Welcome back, Alex”.
- Status chip row under title showing current stage: Idle (gray), Authenticating (accent with spinner), Behavior Check (warning with pulse).
- Primary CTA: “Continue with Passkey”.
- Secondary text: “Use a different account” link.
- Inline `info` banner: “Passkeys keep your data on this device.”

**States**
- **Idle**: CTA active, chip `Idle`.
- **Authenticating**: CTA disabled, show overlay “Waiting for Face ID…”.
- **Behavior Check**: After biometric success, show message “We just need an extra check” with yellow chip; display subtle progress bar while risk assessment runs (1–3s). Provide `aria-live` updates.
- **Success**: Fade to success state (green chip “All clear”) and transition to app.
- **Error**: Show red chip “Try again” with actionable help link.

### 6. Fallback Challenge Selection
**Purpose**: Provide alternative verification choices.

**Entry Points**: From Troubleshoot link, from passkey failure, or by user choice.

**Layout**
- Title: “Verify another way”.
- Subcopy: “Choose the quickest option available.”
- Card list (radio cards) with icons:
  1. **OTP via Authenticator or SMS**: shows estimated time, phone obfuscated.
  2. **Magic Link to Email**.
  3. (Optional) **Security Backup Code** if available.
- CTA: “Continue”. Enabled when selection made.
- Inline reassurance: “We just need an extra check to be sure it’s you.”

**States**
- **Selection**: Highlight active card with accent border + checkmark.
- **Disabled**: Methods unavailable appear grayed with tooltip (“No phone on file”).

### 7. Verify OTP / Magic Link
**Purpose**: Complete fallback verification.

**Layout Variations**
- **OTP**:
  - Title: “Enter the 6-digit code”.
  - Message: “We sent a code to •••• 1234.”
  - Input: segmented 6-field code entry with auto-focus; accessible single input with visually separated boxes.
  - Timer text: “Code expires in 01:30” with resend button (disabled until 30s).
  - CTA: “Continue”.
  - Secondary: “Try another method”.
  - Status area: Idle chip; when verifying, show accent spinner.
  - Error: Shake animation on inputs, message “That code didn’t match. Try again.” + resend link.

- **Magic Link**:
  - Title: “Check your email”.
  - Copy: “We’ve sent you a secure link. Open it on this device or another.”
  - Animated mail illustration.
  - Status card showing steps: 1. Email sent (accent), 2. Link opened (pending), 3. Session secured (pending).
  - CTA: “Refresh status” + auto-poll every 5s. Provide fallback: “Send a new link”.
  - Success: show green check, auto-redirect countdown.

**Accessibility**
- Provide `aria-live` on timers and status updates.
- All inputs with visible focus outlines and error text.

---

## Admin / Integrator Experience (6–8 Screens)
Desktop-first responsive layout with 1440px canvas; collapsible side navigation for smaller widths. End-users share visual language but with enterprise tone: deeper surfaces, structured grids.

### Shared Admin UI Elements
- **Shell**: Fixed top bar (height 64px) with logo, environment badge (e.g., Production), user menu (avatar + name + org switcher), and quick actions (Create API Key).
- **Side Navigation**: `w-72` dark panel. Sections: Overview, Risk Scoring, Events, Reports (optional), Settings. Active item with accent indicator.
- **Content Area**: `px-8 py-6` with breadcrumb, page title, quick filters.
- **Cards**: 3-column grid (auto-fit) using `grid-cols-1 md:grid-cols-2 xl:grid-cols-3`.
- **Tables**: Sticky headers, zebra stripes (`bg-surface-900/60` alt rows), row hover highlight.
- **Filters**: Use horizontal filter bar with pills + date range picker.

### A. Admin Sign-in (Passkey)
- Similar to end-user login but with admin branding: Title “Welcome to Passless Console”.
- Fields: account email, passkey prompt.
- Additional CTA: “Request access” linking to onboarding docs.
- Background: gradient with abstract network nodes.
- States mirror end-user login with added message: “Confirm on your security key”.

### B. Overview Dashboard
**Hero Section**
- Page title + date range selector (Last 7 days default).
- Quick filters: Environment toggle (Prod / Sandbox), Org dropdown.

**KPI Cards** (3–4)
- `Total Passkey Logins`, `Risky Attempts`, `Fallback Usage`, `Avg Behavior Score`.
- Each card: value, delta vs previous period (with arrow icon), mini trend sparkline.
- Provide tooltips describing metrics.

**Charts Row**
- Left: Area chart of logins over time (stacked passkey vs fallback). Provide legend with accent + teal.
- Right: Donut chart showing authentication methods share.
- Interactivity: hover reveals tooltips; accessible table fallback under charts.

**Recent Activity Table**
- Columns: User, Method, Risk Score, Outcome, Timestamp, Location. Sortable by timestamp.
- Each row includes risk chip (color-coded) and status icons.
- Row click opens Event Detail.

**Alerts Banner** (optional top-right): “3 policies require review” with link to Risk Scoring.

### C. Risk Scoring
**Layout**
- Sub-navigation tabs: `Overview`, `Anomalies`, `Policy Simulator` (future-proof).

**Heatmap**
- Matrix: Dimensions (Y-axis: Behavior signals like Device trust, Geo velocity, Biometrics, Network; X-axis: Risk levels / time). Colors from green to red gradient.
- Hover reveals tooltip with signal weighting, sample size.
- Provide accessible description and table alternative.

**Anomaly Types**
- Card list showing detection categories (Impossible Travel, Device Spoof, High Velocity). Each card with count, delta, severity chip.

**Threshold Controls**
- Panel on right with sliders / input fields for risk thresholds (Low, Medium, High) with preview of expected impact (# of events). Include CTA “Save changes” (requires confirmation modal) and `Reset` button.
- Display warning toast after save with summary: “Risk threshold updated to 72 – applies in 5 minutes.”

### D. Events / Activity Log
**Filter Bar**
- Quick filters: Date range picker, Risk level multi-select, Method (Passkey/Fallback), Decision (Allow/Step-up/Deny).
- Search input for email/user ID.
- Export button (CSV) with icon, disabled if > 10k rows.

**Table**
- Sticky column for user info with avatar initials.
- Additional columns: Session ID, Behavior Score (numeric + sparkline), Signals triggered (chip list), Result, Duration.
- Row actions: view detail (chevron), quick tag (“Mark for review”).
- Empty state: illustration + message “No events match filters. Try expanding your date range.”

**Pagination**
- `Showing 1-50 of 1,240` with select for page size, accessible `aria-label` on controls.

### E. Event Detail
**Breadcrumb**: `Events > Session 8d32a9`.

**Header**
- Summary card with user info, time, location map snippet (Leaflet static), risk score chip, final decision badge.
- Action buttons: “Approve” (if pending), “Download JSON”.

**Tabs**
1. **Overview**
   - Timeline of steps (Passkey, Behavior Check, Fallback) with icons and durations.
   - Risk factors list with weights and statuses (color-coded).
   - Decision explanation block: “Denied because risk score (82) exceeded high threshold (75) and device flagged as new.”
2. **Signals**
   - Accordion grouped by signal category; each item shows raw values (IP, device fingerprint, geolocation).
   - Provide copy-to-clipboard button for IDs.
3. **Audit Trail**
   - Log of policy changes & admin actions (time, actor, action). Ensure sortable.

**Side Panel**
- Related sessions (cards linking to other attempts by same user/device) with risk trend sparkline.

### F. Settings
**Sections** (left vertical tabs or anchor list within page)
1. **Authentication Policies**
   - Toggles for enabling fallback methods (OTP, Magic Link, Backup Codes).
   - Sliders for fallback frequency / lockout windows.
   - Info tooltips clarify security impact.
2. **Risk Thresholds**
   - Sync with Risk Scoring page (shared component). Provide preview chart.
3. **API Keys**
   - Table of keys with name, scopes, last used, status. Buttons: `Create Key`, `Revoke`.
   - Modal for key creation with copyable secret (display once) + friendly warning.
4. **Branding**
   - Upload logos (light/dark). Provide guidelines (SVG preferred, 320×80). Preview authentication screens with selected theme colors.
5. **Notifications**
   - Checkbox list for email/webhook alerts.

**Save Pattern**
- Sticky footer showing unsaved changes with CTAs `Discard` + `Save All`.

### G. (Optional) Reports & User/Device Management
- Reports: list of scheduled reports with status, next delivery, format (CSV/JSON). Actions: download latest, edit schedule.
- User & Device: directory of registered users with search, filters (Status, Role). Row expand reveals devices (passkey name, last seen, revoke button).

---

## Interaction Patterns & States

### Status Chips
| State | Color | Icon | Usage |
| --- | --- | --- | --- |
| Idle | Neutral (`border border-border-600 text-text-300`) | dot | Waiting for user input |
| Authenticating | Accent (`bg-accent-500/10 text-accent-400`) | spinner | WebAuthn in progress |
| Behavior Check | Warning (`bg-warning-500/10 text-warning-500`) | pulse | Risk assessment |
| Success | Success color | check | Completed step |
| Error | Danger color | x-circle | Failure requiring attention |

### Loading
- Use 16px circular spinner with accent stroke.
- For skeleton states on dashboards: shimmering cards (`animate-pulse`). Provide `aria-busy="true"`.

### Empty / Error States
- Provide friendly illustrations with CTA to retry or adjust filters.
- Errors show short plain-language message, actionable next step, and support link.

### Modals & Sheets
- Rounded corners `rounded-2xl`, maximum width 420px (mobile full width). Use overlay with `bg-black/60`.
- Close button accessible with `aria-label`.

### Notifications
- Toasts anchored bottom-right (desktop) / top full-width (mobile). Include icon + summary + CTA when applicable. Auto-dismiss after 5s; allow manual close.

---

## Accessibility & Inclusive Design
- All interactive elements have visible focus states (accent glow + outline). Use `focus:ring-2 focus:ring-offset-2 focus:ring-accent-400` on dark surfaces.
- Provide keyboard shortcuts for admin navigation (`/` to focus search, `?` to open help).
- Support screen readers: set document titles per page, use `aria-live` for status updates, label icons, supply alt text for illustrations.
- Ensure form errors described via `aria-describedby`. Provide inline success confirmation.
- Respect reduced motion: disable loader animations and transitions when `prefers-reduced-motion` detected.
- Text content uses inclusive language; avoid jargon in end-user flows.

---

## Implementation Notes (React + Tailwind)
- Use layout components: `<AuthLayout>` for end-user, `<AdminShell>` for dashboard. Both share tokens via CSS variables defined in `:root` and toggled for theme.
- Create reusable components: `Button`, `StatusChip`, `Card`, `ChartCard`, `Stepper`, `FallbackOptionCard`, `DataTable` (with headless UI or TanStack Table), `Tabs`, `Modal`.
- Manage state machines for authentication flows (XState recommended) to handle Idle → Authenticating → Success/Failure transitions.
- For WebAuthn interactions, provide promise-based hooks `usePasskeyLogin` and `usePasskeyRegistration`. Handle errors gracefully with typed messages.
- Charts: use Recharts or Chart.js with custom theme; ensure data table fallback for accessibility.
- Responsive behavior: use Tailwind responsive classes to adjust spacing (`px-4 md:px-8`), grid columns, and nav collapse.
- Localize copy via i18n library (react-intl). Keep strings friendly and reassuring.

---

## Copy Guidelines
- Use conversational tone: “We just need an extra check.”, “All set! You’re in.”
- Avoid blameful language; prefer collaborative phrasing (“Let’s try that again.”).
- Provide microcopy for security reassurance without inducing alarm.

---

## Assets & Deliverables
- Create Figma components mirroring Tailwind tokens.
- Provide icon set (SVG) and illustrations (Lottie optional) referenced above.
- Document passkey flows with sequence diagram and state machine (appendix).
- For engineering handoff, attach component prop tables and event tracking schema (Mixpanel/Segment) for key interactions: `auth_passkey_start`, `auth_passkey_success`, `fallback_selected`, etc.

