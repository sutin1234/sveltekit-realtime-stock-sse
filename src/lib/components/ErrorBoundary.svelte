<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		title = 'Component Error Detected',
		retryLabel = 'Retry Connection'
	}: {
		children: Snippet;
		title?: string;
		retryLabel?: string;
	} = $props();
</script>

{#snippet failed(error: Error, reset: () => void)}
	<div
		class="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-red-200 bg-red-50 p-12 text-center"
	>
		<div class="mb-4 rounded-full bg-red-100 p-3 text-red-600">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-8 w-8"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
				/>
			</svg>
		</div>
		<h3 class="mb-2 text-lg font-bold tracking-tighter text-red-900 uppercase italic">
			{title}
		</h3>
		<p class="mb-6 max-w-md text-sm text-red-700">{error.message}</p>
		<button
			onclick={reset}
			class="rounded-sm bg-black px-6 py-2 text-[10px] font-black tracking-widest text-white uppercase transition-transform hover:scale-105 active:scale-95"
		>
			{retryLabel}
		</button>
	</div>
{/snippet}

<svelte:boundary {failed}>{@render children()}</svelte:boundary>
