# Agent Instructions for my-kit-app

This document provides context, architectural decisions, and guidelines for AI agents working on this codebase.

## 1. Project Overview
**my-kit-app** is a real-time stock dashboard built with SvelteKit. It visualizes live stock data updates using Server-Sent Events (SSE).

### Key Features
*   **Real-time Updates**: Unidirectional data flow via `EventSource` from `/api/stocks-sse`.
*   **Dynamic UI**: Auto-sorting tables, localized flashing updates, and SVG sparklines.
*   **Headless Table**: Powered by `@tanstack/svelte-table` for logic, styled manually with TailwindCSS.

## 2. Technology Stack
*   **Framework**: SvelteKit (Svelte 5 Runes API).
*   **Language**: TypeScript.
*   **Styling**: TailwindCSS (v4 alpha).
*   **State Management**: Svelte 5 Runes (`$state`, `$derived`, `$effect`, `$props`).
*   **Data Fetching**: SSE (native `EventSource`).

## 3. Architecture & Patterns

### Directory Structure
*   `src/lib/components/`: Reusable UI components.
    *   `StockTable.svelte`: Main data table. Uses `{#snippet}` for cell rendering.
    *   `Sparkline.svelte`: SVG chart generation. **Crucial**: Requires `colorId` prop for unique gradient IDs.
    *   `CompanyLogo.svelte`: Handles image loading errors gracefully.
*   `src/routes/api/stocks-sse/`: Server-side endpoint generating mock stock updates.

### Development Rules for Agents

#### 1. Svelte 5 Syntax (MANDATORY)
*   **Props**: Use `let { propName }: PropType = $props();`. **DO NOT** use `export let`.
*   **State**: Use `let count = $state(0);`.
*   **Computed**: Use `let double = $derived(count * 2);`.
*   **Side Effects**: Use `$effect(() => { ... })`.

#### 2. Component Design
*   **Snippets over Subcomponents**: For small, repetitive internal UI chunks (like table cells), use `{#snippet name(args)}`.
*   **Clean Props**: Pass primitive data types where possible.
*   **Reusability**: `Sparkline` and `CompanyLogo` are intentionally generic. reuse them.

#### 3. Styling
*   Use Tailwind CSS utility classes.
*   Avoid standard CSS in `<style>` blocks unless absolutely necessary (e.g., globals).
*   Use `animate-pulse` or custom CSS animations for live data indicators.

## 4. Common Tasks & Workflows

### Adding a New Column to Report
1.  Update `Stock` interface in `src/lib/types.ts`.
2.  Update mock data generator in `src/lib/server/stocks.ts`.
3.  Add column definition to `columns` array in `StockTable.svelte`.
4.  If complex UI, create a new `{#snippet}` for the cell.

### Deployment
The project is configured for Vercel.
*   **Build**: `npm run build`
*   **Deploy**: `vercel --prod`
