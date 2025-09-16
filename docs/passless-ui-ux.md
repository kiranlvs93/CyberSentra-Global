# Passless Authentication Platform – UI/UX Design Specification

## 1. Brand & Visual System
### 1.1 Core Personality
- **Tone**: Trustworthy, calm, and empowering. Avoid security panic language; focus on guidance and reassurance.
- **Look**: Minimalist dark theme with vibrant accents and soft depth. Supports both consumer-facing flows and enterprise admin portal.
- **Accessibility**: Color contrast ratios ≥ 4.5:1 for text, ≥ 3:1 for large display text/buttons.

### 1.2 Color Palette (Design Tokens)
| Token | Hex | Usage |
| --- | --- | --- |
| `--color-bg-primary` | `#0F172A` | Primary background for all screens.
| `--color-bg-elevated` | `#141F36` | Cards, modals, nav trays.
| `--color-surface-muted` | `#1F2A40` | Tables, inputs, secondary surfaces.
| `--color-border` | `#253652` | Dividers, outlines, focus rings (paired with glow).
| `--color-text-primary` | `#F8FAFC` | Primary text on dark backgrounds.
| `--color-text-secondary` | `#CBD5F5` | Body copy/supporting text.
| `--color-accent` | `#38BDF8` | Primary CTAs, active states (tailwind `sky-400`).
| `--color-accent-strong` | `#0EA5E9` | Hover/pressed CTA states, focus outlines.
| `--color-success` | `#34D399` | Success toasts, "Pass" statuses.
| `--color-warning` | `#FBBF24` | Behavioral check/pending attention states.
| `--color-danger` | `#F87171` | Errors, blocked events.
| `--color-info` | `#818CF8` | Informational chips, behavior analysis status.
| `--color-chip-idle-bg` | `rgba(129, 140, 248, 0.16)` | Idle chips background.
| `--color-chip-auth-bg` | `rgba(56, 189, 248, 0.18)` | Authenticating chips background.
| `--color-chip-check-bg` | `rgba(251, 191, 36, 0.18)` | Behavior check chips background.

Gradients for hero moments: `linear-gradient(135deg, rgba(14,165,233,0.16) 0%, rgba(129,140,248,0.12) 100%)`.

### 1.3 Typography
- **Primary font**: "Inter" (system fallback: `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`).
- **Type scale** (rem values assume 16px base):
  - Display (hero): 2.5rem / 600
  - H1: 2rem / 600
  - H2: 1.5rem / 600
  - H3: 1.25rem / 600
  - Body Large: 1.125rem / 400
  - Body: 1rem / 400
  - Caption/Meta: 0.875rem / 500
- **Line height**: 1.4 for headings, 1.6 for body to aid readability.
- All interactive text ≥ 16px.

### 1.4 Iconography & Illustration
- Use outline icons (Lucide/Feather) at 20–24px with 1.5px stroke.
- End-user flow: subtle illustrations (soft gradients, abstract waves) to humanize security moments.
- Admin portal: data-centric icons (shield, activity, sliders, settings).
- Provide alt text for every meaningful icon when used as stand-alone buttons.

### 1.5 Spacing & Layout
- **Spacing scale**: 4px grid (`4, 8, 12, 16, 20, 24, 32, 40, 48, 64`).
- **Border radius**: 16px for primary cards/modals, 12px for inputs/buttons, 999px for chips/pills.
- **Elevation**: Soft shadow `0 20px 60px rgba(15, 23, 42, 0.45)` for modals; `0 10px 30px rgba(8, 47, 73, 0.35)` for cards.
- **Breakpoints**:
  - Mobile: ≤ 640px – single column, sticky footer CTAs.
  - Tablet: 641–1024px – two-column splits where relevant.
  - Desktop: ≥ 1025px – wider cards, grid dashboards.

### 1.6 Motion & Micro-interactions
- Use 200ms ease-out transitions for hover/focus/CTA states.
- Passkey authentication status chips animate with subtle pulse (scale 1 → 1.05) during "Authenticating".
- Loading spinners: 24px circular indicator using accent gradient.

## 2. Accessibility & Copy Guidance
- **Copy tone**: Supportive. E.g., "We just need an extra check" for fallback screens.
- **Error messaging**: Clearly describe issue + action. Example: "We couldn’t verify that code. Try again or resend." Provide inline error text below fields.
- **Keyboard navigation**: Visible focus ring `outline: 2px solid #0EA5E9; outline-offset: 3px;` on all focusable elements.
- **Assistive text**: Provide aria-live regions for auth state updates ("Authenticating", "Success").
- **Alt text**: Summaries for hero illustrations (e.g., `alt="Person unlocking securely with a passkey"`).
- **Forms**: Labels persist above inputs; placeholder only for example formatting.

## 3. Shared Component Patterns
### 3.1 Buttons
- **Primary CTA**: Filled accent background, white text, large radius. Tailwind: `bg-sky-400 hover:bg-sky-500 text-slate-950 font-medium px-6 py-3 rounded-xl shadow-lg shadow-sky-900/40`.
- **Secondary**: Outline with accent border `border border-sky-400 text-sky-200 bg-transparent`.
- **Ghost**: No border, `text-sky-200 hover:text-sky-100 hover:bg-slate-800/60`.
- Include left-aligned icon on CTAs where needed (16–20px).
- Disabled state: `bg-slate-700 text-slate-400 cursor-not-allowed` with 50% opacity.

### 3.2 Status Chips
| State | Background | Text/Icon | Usage |
| --- | --- | --- | --- |
| Idle | `--color-chip-idle-bg` | `--color-info` text, info icon | Display waiting state before user acts.
| Authenticating | `--color-chip-auth-bg` + pulsing spinner | `--color-accent-strong` text | Active biometric check.
| Behavior Check | `--color-chip-check-bg` | `--color-warning` text | Risk evaluation running.
| Success | `rgba(52,211,153,0.18)` | `--color-success` text + check icon | Completed login.
| Error | `rgba(248,113,113,0.2)` | `--color-danger` text + alert icon | When fallback or passkey fails.

Chips sized 32px height, 16px padding, medium weight text.

### 3.3 Cards & Layout Containers
- End-user: center-aligned card max width 420px on desktop, full width on mobile. Soft gradient background behind card.
- Admin: Content area uses 24px padding, grid gap 24px. Cards with 16px padding, `backdrop-blur` 12.

### 3.4 Form Inputs
- Tailwind: `bg-slate-900/60 border border-slate-700 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/60 rounded-xl px-4 py-3 text-slate-100`.
- Include helper text below input (0.875rem) for hints/errors.

### 3.5 Tables
- Sticky header with accent underline `border-b border-slate-700`.
- Hover row background `bg-slate-900/40`.
- Rows 56px tall on desktop, 64px for dense info.
- Provide empty state with illustration + CTA to adjust filters.

### 3.6 Toasts/Inline Feedback
- Toast container top-right. Each toast card 320px width, includes icon, title, message, close button.
- Colors follow success/warning/error tokens.

## 4. End-User Journey (Passless Consumer Flow)
### 4.1 Overview
Flow: Welcome / Sign-in → Register Email (if new) → Create Passkey → Optional Secondary Passkey → Login with Passkey → (if risk requires) Fallback Challenge → Verify OTP/Magic Link → Session granted.

- Mobile-first: content vertically stacked, sticky footer CTAs for long forms.
- Desktop: central card with background gradient, floating support link bottom-right.
- Global header minimal: logotype + help icon. Footer with legal links.

### 4.2 Page 1 – Welcome / Sign-in
**Purpose**: Entry point for returning and new users.

**Layout**:
- Top: Passless logo + subtle tagline "Passwordless access made effortless".
- Main card: headline H1 "Welcome back" (if returning) or "Sign in with Passless".
- Buttons stack (vertical on mobile, horizontal on desktop) with large CTAs:
  1. Primary: "Use Passkey" (accent). Includes passkey icon.
  2. Secondary: "Register" (outline).
  3. Ghost text link: "Troubleshoot access" (opens modal with FAQs).
- Supporting text: 2 lines body copy describing secure login.
- Footer: "Need help?" link, language selector.

**States**:
- When "Use Passkey" clicked, show inline status chip transitioning Idle → Authenticating → Behavior Check → Success/Failure.
- Provide skeleton overlay to prevent double submissions.

**Accessibility**:
- Buttons full width, 56px height for thumb reach.
- Troubleshoot modal accessible with focus trap.

### 4.3 Page 2 – Register: Email Capture
**Purpose**: Start new registration.

**Layout**:
- Step indicator (1 of 3) pill at top of card.
- H1: "Let’s get you set up"
- Body text: "Enter your work email to continue."
- Form field: email input with envelope icon leading.
- Helper text: "We’ll send you a verification link if needed."
- Buttons bottom: Primary "Continue"; Secondary ghost "Back" to Welcome.

**States**:
- On submit, show loader spinner in button, disable input.
- Error message displayed below input (e.g., invalid domain) with danger color + icon.
- Success: transition to Create Passkey screen.

**Responsive**: On mobile, CTAs sticky at bottom with gradient overlay.

### 4.4 Page 3 – Create Passkey
**Purpose**: Trigger WebAuthn passkey creation.

**Layout**:
- Step indicator (2 of 3).
- H1: "Create your Passkey"
- Illustration: device biometric prompt.
- Body copy: "We’ll ask your device for Face ID, Touch ID, or Windows Hello."
- Primary CTA: "Create Passkey" (triggers navigator.credentials API).
- Secondary text link: "Use security key" (for hardware key, same modal).
- Inline security reassurance: list of 3 bullet points ("Passkey stays on your device", etc.).

**States**:
- Idle chip before click.
- On click: chip becomes "Authenticating" with spinner; overlay message "Check your device".
- Timeout state after 30s: error chip + message with "Try again" CTA.

**Accessibility**:
- Provide aria-live for prompt instructions.
- Allow keyboard triggering of CTA.

### 4.5 Page 4 – Add Secondary Passkey (Optional)
**Purpose**: Encourage multi-device resilience.

**Layout**:
- Step indicator (3 of 3) + optional badge.
- H1: "Add another device (optional)"
- Body: "Register a backup device now to avoid getting locked out."
- Card list of options: "Use another phone", "Use a security key", each with icon and description.
- Primary CTA: "Add another passkey" (accent). Secondary ghost: "Skip for now".
- Small reminder text about ability to manage devices later.

**States**:
- If user selects to add, re-use Create Passkey modal with context ("Backup device").
- On skip, show confirmation toast "You can add more devices later".

### 4.6 Page 5 – Login with Passkey
**Purpose**: Authenticate returning user.

**Layout**:
- H1: "Use your passkey"
- Body: "We’ll prompt your saved device now."
- Status chip row showing pipeline: Idle (grey) → Authenticating (accent) → Behavior Check (warning) → Success (green) or Fallback (warning).
- Illustration of secure lock.
- Buttons: Primary "Authenticate"; Secondary "Use different device" (opens QR pairing/instructions modal).
- Additional link: "Need another option?" leads to Fallback Challenge.

**States**:
- On success, auto-redirect to app.
- On failure > show error chip + message + CTA to fallback.
- Provide progress copy while Behavior Check runs: "Making sure everything looks good..."

### 4.7 Page 6 – Fallback Challenge
**Purpose**: Provide alternative verification paths.

**Layout**:
- H1: "We just need an extra check"
- Body: "Choose how you’d like to confirm it’s you."
- Card options (segmented control):
  1. **OTP Code** – description "We’ll text a 6-digit code to (•••) ••45" + "Change number" link.
  2. **Magic Link** – description "Send a secure link to user@domain.com".
- Each card has icon (shield + sms/mail) and radio selection.
- Primary CTA: "Send Code" or "Send Link" dynamic label.
- Secondary ghost: "Back to passkey".
- Provide timer text once sent ("Resend in 00:30").

**States**:
- Idle card until option chosen.
- Sending state: CTA shows spinner + "Sending...".
- Error: inline message per option ("We couldn’t send the SMS" + "Try again").

### 4.8 Page 7 – Verify OTP / Magic Link
**Purpose**: Confirm fallback verification.

**Layout**:
- H1: dynamic: "Enter your code" or "Check your email"
- Body: "Enter the 6-digit code" or "We’ll redirect you once you tap the link."
- For OTP: segmented input fields (6 boxes) with auto-focus and paste support. Provide alt text for screen readers (aria-label for each input).
- For Magic Link: show status card with spinner + message "Waiting for you to open the link" and option "I’m on this device" to complete inline.
- Provide secondary actions: "Resend code" (disabled until timer done), "Use a different method".
- CTA: "Continue" (enabled once code complete) or "I’ve clicked the link".
- Footer text: "Having trouble? Contact support".

**States**:
- Idle: code fields empty.
- Loading: spinner while verifying.
- Success: chip turns green with check, message "You’re verified! Redirecting...".
- Error: shake animation + message "Code didn’t match".

## 5. Admin Portal Experience (Enterprise SaaS)
### 5.1 Global Layout
- **Shell**: Persistent left sidebar (72px collapsed on mobile, 280px on desktop) with logo, nav sections, collapse toggle.
- **Top bar**: Right-aligned search, environment switcher (Production/Sandbox), notification bell, user avatar menu.
- **Content**: Scrollable main area with 24px padding (16px on mobile). Background gradient subtle.
- **Nav items**:
  1. Overview
  2. Risk Scoring
  3. Events
  4. Reports (optional)
  5. Users & Devices (optional)
  6. Settings
- Active nav item uses accent pill background `bg-sky-500/20` with accent border.

### 5.2 Admin Sign-in (Passkey)
- Full-screen card similar to end-user but with enterprise copy "Sign in to Passless Console".
- CTA: "Use Passkey" with company SSO assistance link.
- Provide fallback link "Having trouble? Request admin reset".
- States identical to end-user login.

### 5.3 Overview Dashboard
**Purpose**: Quick health snapshot.

**Layout**:
- **Header**: Page title "Overview", date range selector (default last 7 days), export button.
- **KPIs row** (4 cards):
  - Total Logins
  - Risky Logins Flagged
  - Fallback Rate
  - Average Behavior Score
  Each card: big number, 7d trend sparkline, delta indicator.
- **Charts**:
  - Area chart "Logins over time" (accent gradient) with passkey vs fallback segmented.
  - Donut chart "Verification methods".
- **Recent Activity Table**: columns for user, method, risk score, decision, timestamp. Row actions: view detail.
- **Sidebar widget** (right column on desktop): "Live status" (systems operational), "Policy reminders".

**States**:
- Empty state for new tenants with illustration + instructions to integrate API.
- Loading skeletons for KPI cards and charts.

### 5.4 Risk Scoring Page
**Layout**:
- Header: Title, timeframe filters, threshold slider (0–100) with value display.
- **Heatmap card**: grid of risk scores by geography/device/time; tooltip shows counts and risk reason.
- **Anomaly list**: cards summarizing top anomaly types (Impossible travel, Device mismatch, Suspicious IP).
- **Controls panel** (right):
  - Toggles for enabling behavior checks.
  - Input for auto-fallback threshold.
  - Save button (sticky bottom on mobile).
- Provide explanation tooltip for each control.

**States**:
- When adjusting threshold slider, preview indicator updates heatmap and displays "Projected impact" chip.
- Save success: toast "Risk policies updated".
- Error: show inline alert bar.

### 5.5 Events / Activity Log
**Layout**:
- Header: Title, filters (search by user/email, date picker, method, decision). Filter chips show applied filters.
- Action bar: Export CSV button, "Save view" dropdown.
- **Table** with columns: Timestamp, User, Method (Passkey/OTP/Link), Device, Location, Risk Score chip (color-coded), Decision (Allow/Challenge/Deny), Actions (View).
- Pagination at bottom (50 rows per page). Provide infinite scroll option toggle.

**States**:
- Loading state: skeleton rows.
- Empty results: message "No events match your filters" with button to reset filters.
- Error: inline banner with retry.

### 5.6 Event Detail
**Layout**:
- Breadcrumbs: Events → Event #ID.
- Header: Decision badge (Allow/Challenge/Deny) with icon, timestamp, user identity.
- Two-column layout on desktop:
  - **Left column (Session Overview)**: summary cards for authentication method, device, location map snippet, risk score gauge.
  - **Right column (Risk Factors)**: accordion list with reason, rule triggered, mitigation suggestions.
- **Timeline**: stepper showing event timeline (Passkey requested → Device verified → Behavior check → Final decision).
- Footer: Buttons "Create case" (integrations), "Download JSON".

**States**:
- Expand/collapse risk factors; highlight on hover.
- Provide copy for decision reason e.g., "Behavioral biometrics deviated by 24%".

### 5.7 Settings
**Layout**:
- Tabs across top: "Policies", "Fallback Methods", "API Keys", "Branding".
- **Policies Tab**: toggles for enabling passkey-only mode, fallback escalation logic, risk tolerance slider.
- **Fallback Methods Tab**: reorderable list of methods with drag handles; checkboxes for allowed methods (SMS, Email, Voice). Provide "Test fallback" CTA.
- **API Keys Tab**: table of keys with scopes, last used, buttons to revoke/regenerate (modal confirm with passwordless prompt).
- **Branding Tab**: upload logos (light/dark), choose accent color (color picker with accessible suggestions), preview card of end-user screen.
- Save/Cancel buttons sticky in bottom-right on desktop, bottom bar on mobile.

**States**:
- Unsaved changes indicator chip in tab.
- Form validations with inline error text.
- Success toast "Settings saved".

### 5.8 Optional Pages
- **Reports & Exports**: Scheduled report cards (Weekly summary, Risk anomalies). Each card with schedule toggles, download button, last sent timestamp.
- **User & Device Management**: searchable list of users, device count chips, actions to revoke passkeys. Modal for device detail (device name, last used, risk notes).

## 6. Responsive & Interaction Notes
- Mobile nav: collapsible drawer for sidebar, overlay with scrim `rgba(15,23,42,0.8)`.
- Dashboard cards stack vertically on small screens; charts become swipeable carousels.
- Tables on mobile use card layout with key metadata stacked and actions as inline buttons.
- Ensure sticky headers do not clip focus outlines.

## 7. Developer Handoff (React + Tailwind)
### 7.1 Suggested Folder Structure
```
src/
  components/
    buttons/PrimaryButton.tsx
    feedback/StatusChip.tsx
    layout/Card.tsx
    tables/EventTable.tsx
  pages/
    user/
      Welcome.tsx
      RegisterEmail.tsx
      CreatePasskey.tsx
      AddSecondary.tsx
      PasskeyLogin.tsx
      FallbackChallenge.tsx
      VerifyFallback.tsx
    admin/
      SignIn.tsx
      Dashboard.tsx
      RiskScoring.tsx
      Events.tsx
      EventDetail.tsx
      Settings.tsx
      Reports.tsx
      UsersDevices.tsx
  hooks/
    usePasskeyAuth.ts
    useCountdown.ts
  context/
    ThemeContext.tsx
    NotificationContext.tsx
```

### 7.2 Sample Components
**StatusChip.tsx**
```tsx
interface StatusChipProps {
  state: "idle" | "authenticating" | "behavior" | "success" | "error";
  label?: string;
}

const STATE_STYLES = {
  idle: "bg-indigo-500/20 text-indigo-200",\
  authenticating: "bg-sky-500/20 text-sky-200 animate-pulse",\
  behavior: "bg-amber-400/20 text-amber-200",\
  success: "bg-emerald-400/20 text-emerald-200",\
  error: "bg-rose-500/20 text-rose-200"
};

export const StatusChip = ({ state, label }: StatusChipProps) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${STATE_STYLES[state]}`}
    role="status"
    aria-live="polite"
  >
    <SpinnerIcon className={state === "authenticating" ? "size-3" : "hidden"} />
    {label ?? LABEL_COPY[state]}
  </span>
);
```

**PrimaryButton.tsx**
```tsx
export const PrimaryButton = ({ children, ...props }) => (
  <button
    className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-sky-400 px-6 text-base font-semibold text-slate-950 shadow-lg shadow-sky-900/40 transition hover:bg-sky-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/60 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
    {...props}
  >
    {children}
  </button>
);
```

### 7.3 Interaction Hooks
- `usePasskeyAuth` handles WebAuthn calls, updates status chips, exposes fallback triggers.
- `useCountdown` manages resend timers for OTP/magic link screens.
- Provide context provider for notifications to surface toasts uniformly.

### 7.4 Testing & QA Notes
- Ensure WebAuthn is feature-detected and gracefully degrade with fallback page.
- Write unit tests for forms and status state transitions.
- Include storybook stories for each component state (Idle/Authenticating/etc.).

## 8. Content & Localization
- All copy stored in JSON for localization: `en`, `es`, `fr` locales to start.
- Keep fallback methods description customizable for tenant-specific policies.
- Provide placeholders for company name (e.g., `{{company}}`).

## 9. Analytics & Telemetry Hooks
- Capture events: `passkey_start`, `passkey_success`, `passkey_failure`, `fallback_selected`, `otp_verified`, `magic_link_verified`.
- Admin portal analytics: track filter usage, threshold changes, exports.
- Ensure consent banner provided if required by region.

## 10. Security Messaging Considerations
- Show subtle lock icon + "Protected by Passless" label across flows.
- Avoid storing PII in local storage; rely on secure session tokens.
- Provide "Learn how Passless keeps you safe" link to docs.

