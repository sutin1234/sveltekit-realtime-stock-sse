# Changelog

## 1.0.2 (2026-01-04)

### Refactoring

- **Components**: Extracted `Sparkline` and `CompanyLogo` into reusable components.
- **StockTable**: Simplified table logic using Svelte 5 snippets and removed monolithic code.
- **Sparkline**: Fixed SVG rendering and hydration issues by ensuring unique gradient IDs.

## 1.0.1 (2026-01-04)

### Documentation

- **README**: Added detailed Features section.
- **Deployment**: Added comprehensive Vercel deployment guide (Dashboard & CLI).

## 1.0.0 (2026-01-04)

### Features

- **Real-time Stock Table**: Implemented live updates using Server-Sent Events (SSE).
- **Dynamic Sorting**: Auto-sorts stocks by price from high to low with smooth animations.
- **Visual Feedback**: visual cues (green/red flashes) for price sorting changes.
- **Company Logos**: Added real company logos with fallback mechanism.
