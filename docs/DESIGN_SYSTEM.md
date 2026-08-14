# Project Kita — Design System

## 1. Brand Identity

**Product Name:** Project Kita

**Tagline:** Empower student entrepreneurs.

**Positioning:**
Project Kita is a modern school community marketplace that connects students and faculty entrepreneurs with buyers within their school community.

**Brand Personality:**

- Modern
- Community-driven
- Youthful
- Trustworthy
- Approachable
- Entrepreneurial

**Brand Philosophy:**

> Empower student entrepreneurs by giving them a trusted place to showcase, discover, and sell products and services within their school community.

Project Kita should feel like a marketplace built specifically for a school community rather than a generic e-commerce platform.

---

# 2. Design Principles

### Community First

The interface should emphasize people, relationships, and the school community rather than purely transactional shopping.

### Simple by Default

Users should be able to discover a product, understand the seller, and initiate a transaction with minimal friction.

### Trust Through Identity

Seller identity and school affiliation are important parts of the experience. Verified Student and Verified Faculty Seller indicators should be visible and consistent.

### Entrepreneurial

The interface should make student sellers feel like legitimate entrepreneurs. Listings, seller profiles, analytics, and storefronts should feel polished and professional.

### Modern Marketplace

Project Kita can take inspiration from established marketplaces such as Lazada in terms of discoverability, product organization, search, categories, and commerce patterns while maintaining its own minimalist visual identity.

### School-Centered

The experience should always feel like it belongs to one school community.

---

# 3. Visual Direction

Project Kita uses a **minimalist yet modern** visual language.

The interface should prioritize:

- Clean layouts
- Generous whitespace
- Strong typography
- Clear product imagery
- Simple navigation
- Subtle borders
- Soft surfaces
- Consistent spacing
- Restrained use of color
- Clear hierarchy

Avoid excessive:

- Gradients
- Decorative illustrations
- Heavy shadows
- Glassmorphism
- Rounded containers everywhere
- Excessive animations
- Visual clutter

The product should feel contemporary without becoming visually noisy.

---

# 4. Color System

The primary palette is inspired by **growth, opportunity, community, and trust**.

## Primary

**Deep Emerald**

`#087F5B`

Used for:

- Primary buttons
- Active navigation
- Important actions
- Brand elements
- Links
- Selected states

## Secondary

**Fresh Green**

`#20A36A`

Used for:

- Success states
- Positive indicators
- Seller verification
- Transaction completion
- Growth-related metrics

## Accent

**Soft Gold**

`#E9B949`

Used sparingly for:

- Featured listings
- Premium placement
- Achievement indicators
- Seller highlights
- Special promotions

Gold should never overpower the primary green identity.

## Background

**Warm White**

`#FAFAF8`

Used as the primary application background.

## Surface

**White**

`#FFFFFF`

Used for:

- Cards
- Panels
- Modals
- Forms
- Navigation surfaces

## Text

**Deep Charcoal**

`#171A19`

Primary text color.

## Secondary Text

**Muted Gray**

`#66706C`

Used for:

- Supporting information
- Metadata
- Descriptions
- Timestamps
- Secondary labels

## Border

**Light Gray**

`#E5E8E6`

Used for:

- Card borders
- Dividers
- Input borders
- Table separators

## Error

**Red**

`#D64545`

Used for:

- Validation errors
- Failed transactions
- Destructive actions
- Reported content

---

# 5. Typography

Typography should be clean, modern, and highly readable.

## Font Family

Use **Inter** as the primary typeface.

Fallback:

```text
Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

## Type Scale

### Display

Large promotional headings.

```text
48px
Line height: 1.1
Weight: 700
```

### H1

Page titles.

```text
36px
Line height: 1.2
Weight: 700
```

### H2

Major section headings.

```text
28px
Line height: 1.25
Weight: 700
```

### H3

Component and subsection headings.

```text
22px
Line height: 1.3
Weight: 600
```

### Body Large

Important supporting text.

```text
18px
Line height: 1.5
Weight: 400
```

### Body

Default text.

```text
16px
Line height: 1.5
Weight: 400
```

### Body Small

Supporting information.

```text
14px
Line height: 1.4
Weight: 400
```

### Caption

Metadata and timestamps.

```text
12px
Line height: 1.4
Weight: 500
```

---

# 6. Spacing

Use a consistent spacing scale based on multiples of 4px.

```text
4px   — xs
8px   — sm
12px  — md
16px  — lg
24px  — xl
32px  — 2xl
40px  — 3xl
48px  — 4xl
64px  — 5xl
80px  — 6xl
```

Prefer consistent spacing over arbitrary values.

---

# 7. Border Radius

Project Kita should use moderate rounding.

```text
4px   — Small controls
6px   — Inputs
8px   — Buttons
10px  — Cards
12px  — Larger surfaces
16px  — Featured sections
```

Avoid excessive pill-shaped containers unless they communicate a specific state such as:

- Category
- Status
- Verification
- Filter
- Badge

---

# 8. Shadows

Shadows should be subtle.

Avoid heavy floating-card effects.

Preferred approach:

```text
Border first
Shadow second
```

Cards should generally use a light border.

Elevated surfaces may use a subtle shadow to communicate hierarchy.

---

# 9. Layout

## Application Width

Use a centered responsive container.

```text
Maximum width: 1280px
```

Maintain comfortable horizontal padding on smaller screens.

## Desktop

Primary marketplace layout:

```text
Header
──────────────────────────────
Main Content
──────────────────────────────
Footer
```

Marketplace pages may use:

```text
Sidebar + Product Grid
```

## Mobile

Prioritize:

```text
Header
Search
Categories
Product Feed
Bottom Navigation
```

Navigation and primary actions should remain easily accessible with one hand.

---

# 10. Navigation

The primary navigation should remain simple.

Recommended global navigation:

```text
Marketplace
Messages
Orders
Favorites
Profile
```

For sellers:

```text
Dashboard
Listings
Orders
Messages
Analytics
```

For administrators:

```text
Dashboard
Users
Listings
Transactions
Reports
Categories
Settings
```

---

# 11. Marketplace Design

Project Kita's marketplace should borrow familiar e-commerce interaction patterns while maintaining a cleaner school-community identity.

## Product Card

Every product card should prioritize:

1. Product image
2. Product name
3. Price
4. Seller
5. Verification status
6. Optional location/availability

Example:

```text
┌──────────────────────────┐
│                          │
│      Product Image       │
│                          │
├──────────────────────────┤
│ Chocolate Cookies        │
│ ₱50                      │
│ Maria Santos             │
│ ✓ Verified Student Seller│
└──────────────────────────┘
```

## Product Images

Product imagery should be the dominant visual element of marketplace cards.

Use consistent aspect ratios.

Recommended:

```text
4:3
```

or

```text
1:1
```

Avoid inconsistent image dimensions within the same product grid.

---

# 12. Seller Identity

Seller identity is a core component of Project Kita.

Every seller should clearly communicate their school affiliation.

## Verification Badges

### Verified Student Seller

Use the label:

> ✓ Verified Student Seller

### Verified Faculty Seller

Use the label:

> ✓ Verified Faculty Seller

Verification indicators should use the project's green system.

Do not rely exclusively on color. Always include text or an icon.

---

# 13. Seller Profile

Seller profiles should feel like lightweight storefronts.

Recommended structure:

```text
Profile
    ↓
Verification
    ↓
Seller rating
    ↓
Transaction history
    ↓
About
    ↓
Listings
```

Important information:

- Name
- Profile image
- Verification status
- Seller rating
- Number of completed transactions
- About section
- Active listings

---

# 14. Buttons

Buttons should have clear hierarchy.

## Primary Button

Used for the most important action.

Examples:

```text
Create Listing
Contact Seller
Buy Now
Save Changes
```

Primary buttons use the Deep Emerald color.

## Secondary Button

Used for supporting actions.

Examples:

```text
Cancel
View Profile
Share
```

Use neutral surfaces with borders.

## Destructive Button

Used for:

```text
Delete
Report
Block
Reject
```

Use the error color sparingly.

---

# 15. Forms

Forms should be simple and focused.

Every input should have:

- Visible label
- Input field
- Optional helper text
- Validation feedback

Avoid placeholder text as the only form label.

Example:

```text
Product Name

[ Chocolate Chip Cookies                 ]

Describe your product

[ Fresh homemade cookies...              ]
```

---

# 16. Search

Search is a primary marketplace interaction.

The search interface should be highly visible.

Users should be able to search by:

- Product
- Service
- Seller
- Category

Search results should support:

- Sorting
- Category filtering
- Price filtering
- Availability filtering

---

# 17. Categories

Categories should be visually simple.

Initial categories:

```text
Food
Fashion & Accessories
School Supplies
Services
Digital & Creative
Electronics
Other
```

Categories may use icons but should never depend entirely on illustrations.

---

# 18. Listing Status

Listings may have states such as:

```text
Active
Sold Out
Draft
Archived
Removed
```

Status should be communicated using both text and visual indicators.

---

# 19. Feedback States

Every important action should provide clear feedback.

Examples:

```text
Success
Error
Warning
Loading
Empty
```

## Success

Example:

> Listing published successfully.

## Error

Example:

> Something went wrong. Please try again.

## Empty

Example:

> No listings found.

## Loading

Use skeleton loading rather than large generic spinners where possible.

---

# 20. Notifications

Notifications should prioritize useful marketplace activity.

Examples:

- New message
- Listing approved
- Listing rejected
- Order update
- Seller inquiry
- Transaction completed
- Report status
- Account verification

Notifications should be concise and actionable.

---

# 21. Messaging

Messaging should feel lightweight and direct.

The purpose is primarily to facilitate transactions.

Example:

```text
Buyer
"Hi! Is this still available?"

Seller
"Yes! You can pick it up tomorrow."

Buyer
"Great. I'll meet you at the library."
```

Avoid unnecessary social-network features in the initial version.

---

# 22. Transaction Experience

The initial marketplace should support transactions without requiring integrated payments.

The platform facilitates:

```text
Discover
    ↓
Contact
    ↓
Agree
    ↓
Meet / Deliver
    ↓
Complete
```

The interface should clearly communicate that payment and physical fulfillment may occur outside the platform during the initial phase.

---

# 23. Featured Listings

Featured listings should use the Soft Gold accent sparingly.

Example:

```text
★ Featured
```

Featured content should remain visually consistent with regular listings while receiving slightly stronger visual emphasis.

Do not allow featured listings to overwhelm organic marketplace results.

---

# 24. Seller Dashboard

The seller dashboard should emphasize actionable business information.

Key metrics:

```text
Active Listings
Views
Inquiries
Completed Transactions
```

Future metrics may include:

```text
Revenue
Conversion Rate
Popular Products
Listing Performance
```

The dashboard should feel approachable enough for a student entrepreneur who may have no prior business experience.

---

# 25. Admin Interface

The admin interface should prioritize clarity and operational efficiency.

Important functions:

- User management
- Listing moderation
- Category management
- Transaction monitoring
- Reports
- Seller verification
- Platform settings

Admin interfaces may use denser layouts than the consumer marketplace.

---

# 26. Responsive Design

Project Kita must support:

```text
Mobile
Tablet
Desktop
```

The mobile experience is particularly important because the primary users are students.

Design mobile-first for:

- Marketplace browsing
- Search
- Messaging
- Listing creation
- Orders
- Seller management

---

# 27. Accessibility

Project Kita should follow accessible design principles.

Requirements:

- Sufficient color contrast
- Keyboard navigation
- Visible focus states
- Semantic HTML
- Descriptive labels
- Accessible form errors
- Alt text for meaningful images
- Do not communicate information through color alone

Interactive elements should have comfortable touch targets.

---

# 28. Iconography

Use a consistent outline icon system.

Icons should:

- Be simple
- Be recognizable
- Use consistent stroke weight
- Support the text rather than replace it

Recommended icon library:

**Lucide Icons**

Avoid mixing multiple icon styles.

---

# 29. Imagery

Product imagery should feel authentic and community-driven.

Prioritize:

- Real student products
- Real seller photos
- Campus environments
- Authentic product photography

Avoid excessive stock photography.

The marketplace should feel like:

> "People from my school actually made and sell these things."

---

# 30. Motion

Animations should be subtle and functional.

Use motion for:

- Page transitions
- Modal opening
- Dropdowns
- Toast notifications
- Loading states
- Button feedback
- Favorite interactions

Avoid decorative animations that distract from marketplace activity.

Recommended transition duration:

```text
150–250ms
```

---

# 31. Brand Voice

Project Kita's copy should be:

- Friendly
- Clear
- Encouraging
- Concise
- Community-oriented

Avoid overly corporate language.

Prefer:

> "Start selling"

over:

> "Create a merchant account"

Prefer:

> "Discover what your school community is selling."

over:

> "Browse available marketplace inventory."

Prefer:

> "You're ready to start selling."

over:

> "Your seller registration has been successfully completed."

---

# 32. Brand Messaging

Primary message:

> **Empower student entrepreneurs.**

Supporting message:

> **Discover, support, and sell within your school community.**

Community message:

> **Built for your school. Powered by its people.**

Seller message:

> **Turn your ideas and skills into something people can buy.**

Buyer message:

> **Discover products and services from people in your school community.**

---

# 33. Design Tokens

The implementation should centralize design values rather than hardcoding them throughout the application.

Example token structure:

```text
colors
├── primary
├── secondary
├── accent
├── background
├── surface
├── text
├── muted
├── border
├── success
└── error

spacing
├── xs
├── sm
├── md
├── lg
├── xl
└── 2xl

radius
├── sm
├── md
├── lg
└── xl

typography
├── display
├── h1
├── h2
├── h3
├── body
├── small
└── caption
```

All major UI components should consume these tokens.

---

# 34. Component Principles

Reusable components should be created for recurring patterns.

Core components include:

```text
Button
Input
Textarea
Select
Badge
Avatar
Card
ProductCard
SellerCard
CategoryCard
Modal
Drawer
Dropdown
Toast
Tabs
Pagination
SearchBar
Filter
Rating
VerificationBadge
ListingStatus
EmptyState
LoadingState
```

Components should remain composable and avoid unnecessary business logic.

---

# 35. Product Experience Principle

Every screen should answer three questions quickly:

1. **What can I do here?**
2. **What information do I need?**
3. **What should I do next?**

Project Kita should always prioritize clarity over decoration.

The ultimate design goal is:

> **Make school commerce feel simple, trustworthy, and community-driven.**
