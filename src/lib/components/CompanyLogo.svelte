<script lang="ts">
	let { ticker, company, logo }: { ticker: string; company: string; logo: string } = $props();

	let hasError = $state(false);
</script>

<div class="flex items-center gap-3">
	{#if !hasError}
		<img
			src={logo}
			alt={ticker}
			class="h-8 w-8 rounded-sm bg-white object-contain p-0.5 shadow-sm transition-transform group-hover:scale-110"
			onerror={() => (hasError = true)}
		/>
	{:else}
		<div
			class="flex h-8 w-8 items-center justify-center rounded-sm bg-gray-900 font-bold text-white shadow-sm transition-transform group-hover:scale-110"
		>
			{ticker[0]}
		</div>
	{/if}
	<div>
		<div class="text-xs font-black tracking-tight">{ticker}</div>
		<div class="text-[9px] font-medium text-gray-400 uppercase">
			{company}
		</div>
	</div>
</div>
