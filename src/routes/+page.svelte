<script lang="ts">
	import { ErrorBoundary, StockTable } from '$lib';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Use SSE for live updates
	let currentStocks = $state(data.initialStocks);
	let connectionStatus = $state<'CONNECTING' | 'OPEN' | 'CLOSED'>('CONNECTING');

	$effect(() => {
		const eventSource = new EventSource('/api/stocks-sse');

		eventSource.onopen = () => {
			connectionStatus = 'OPEN';
		};

		eventSource.onmessage = (event) => {
			const newStocks = JSON.parse(event.data);
			currentStocks = newStocks;
		};

		eventSource.onerror = (error) => {
			console.error('SSE Error:', error);
			if (eventSource.readyState === EventSource.CLOSED) {
				connectionStatus = 'CLOSED';
			} else {
				connectionStatus = 'CONNECTING';
			}
		};

		return () => {
			eventSource.close();
			connectionStatus = 'CLOSED';
		};
	});
	// Sort by price descending (High -> Low)
	let sortedStocks = $derived([...(currentStocks ?? [])].sort((a, b) => b.price - a.price));
</script>

<div class="min-h-screen bg-gray-50 p-4 md:p-8">
	<div
		class="mx-auto max-w-6xl overflow-hidden rounded-sm border border-gray-200 bg-white p-6 font-sans shadow-2xl"
	>
		<header class="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
			<h1 class="text-4xl font-black tracking-tighter text-gray-900 uppercase italic">
				J.P. Morgan's Top Picks 2026
			</h1>
			<div
				class="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-600 ring-1 ring-emerald-200"
			>
				<div class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></div>
				SSE CONNECTED
			</div>
		</header>

		<ErrorBoundary title="Table Error Detected">
			{#if !currentStocks}
				<div class="animate-pulse space-y-4">
					<div class="h-10 w-full rounded-sm bg-gray-100"></div>
					{#each Array(6) as _}
						<div class="h-16 w-full rounded-sm bg-gray-50"></div>
					{/each}
				</div>
			{:else}
				<StockTable data={sortedStocks} />
			{/if}
		</ErrorBoundary>

		<footer
			class="mt-8 flex items-center justify-between border-t border-gray-100 pt-6 text-[10px] font-bold tracking-widest text-gray-400 uppercase"
		>
			<div class="flex items-center gap-2">
				<div class="h-4 w-4 rounded-sm bg-blue-600 shadow-sm shadow-blue-200"></div>
				<span>BY LIN @SPECULATOR_IO</span>
			</div>
			<div class="flex gap-4">
				<span
					>API STATUS: <span
						class={connectionStatus === 'OPEN' ? 'text-emerald-500' : 'text-amber-500'}
						>{connectionStatus === 'OPEN' ? 'LIVE STREAM' : connectionStatus}</span
					></span
				>
				<span class="text-gray-300">|</span>
				<span>JANUARY 1, 2026</span>
			</div>
		</footer>
	</div>
</div>

<style>
	:global(body) {
		background-color: #f3f4f6;
	}
</style>
