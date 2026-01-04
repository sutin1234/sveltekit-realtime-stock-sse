<script lang="ts">
	import { createTanStackTable, flexRender } from '$lib/table.svelte';
	import type { Stock } from '$lib/types';
	import { getCoreRowModel, type ColumnDef, type TableOptions } from '@tanstack/table-core';
	import { flip } from 'svelte/animate';
	import CompanyLogo from './CompanyLogo.svelte';
	import Sparkline from './Sparkline.svelte';

	let { data }: { data: Stock[] } = $props();

	let prevPrices = $state<Record<string, number>>({});
	let flashColors = $state<Record<string, string>>({});

	// Effect to detect price changes and trigger flash
	$effect(() => {
		data.forEach((stock) => {
			const prevPrice = prevPrices[stock.ticker];
			if (prevPrice !== undefined && prevPrice !== stock.price) {
				const color = stock.price > prevPrice ? 'bg-emerald-100' : 'bg-red-100';
				flashColors[stock.ticker] = color;

				// Reset flash after a delay
				setTimeout(() => {
					flashColors[stock.ticker] = '';
				}, 600);
			}
			prevPrices[stock.ticker] = stock.price;
		});
	});

	const getPeClass = (pe: number | null) => {
		if (!pe) return 'bg-gray-50';
		if (pe > 50) return 'bg-orange-200';
		if (pe > 30) return 'bg-orange-100';
		return 'bg-orange-50';
	};

	const columns: ColumnDef<Stock>[] = [
		{ accessorKey: 'ticker', header: 'Ticker / Company' },
		{
			accessorKey: 'price',
			header: 'Price',
			cell: (info) =>
				`$${info.getValue<number>().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
		},
		{ accessorKey: 'marketCap', header: 'Market Cap', cell: (info) => `$${info.getValue()}` },
		{ accessorKey: 'ps', header: 'P/S' },
		{
			accessorKey: 'pe',
			header: 'P/E',
			cell: (info) => {
				const val = info.getValue() as number | null;
				return typeof val === 'number' ? val.toFixed(2) : 'n/a';
			}
		},
		{
			accessorKey: 'change1y',
			header: '% 1Y',
			cell: (info) => `${info.getValue<number>().toFixed(2)}%`
		},
		{ accessorKey: 'high52w', header: 'Δ 52w High', cell: (info) => `${info.getValue()}%` },
		{ accessorKey: 'priceHistory', header: 'Price Trend' }
	];

	const options = $derived<TableOptions<Stock>>({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getRowId: (row) => row.ticker
	});

	const table = $derived(createTanStackTable(() => options));
</script>

{#snippet tickerCell(row: any)}
	<CompanyLogo
		ticker={row.original.ticker}
		company={row.original.company}
		logo={row.original.logo}
	/>
{/snippet}

{#snippet change1yCell(row: any)}
	<div class="flex items-center gap-2">
		<div class="flex h-3 flex-1 items-center overflow-hidden rounded-full bg-gray-100">
			<div
				class="h-full transition-all duration-1000 {row.original.change1y > 0
					? 'bg-emerald-500'
					: 'bg-red-500'}"
				style="width: {Math.min(Math.abs(row.original.change1y), 100)}%"
			></div>
		</div>
		<span
			class="w-14 text-right font-black {row.original.change1y > 0
				? 'text-emerald-600'
				: 'text-red-600'}"
		>
			{row.original.change1y > 0 ? '+' : ''}{row.original.change1y.toFixed(2)}%
		</span>
	</div>
{/snippet}

{#snippet priceHistoryCell(row: any)}
	<Sparkline
		data={row.original.priceHistory}
		width={100}
		height={32}
		colorId={row.original.ticker}
	/>
{/snippet}

<div class="overflow-x-auto">
	<table class="w-full border-collapse text-[11px] whitespace-nowrap">
		<thead>
			{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
				<tr class="border-b-2 border-black font-bold tracking-wider text-gray-500 uppercase">
					{#each headerGroup.headers as header (header.id)}
						<th
							class="p-4
                            {header.id === 'ticker' ? 'text-left' : ''}
                            {['pe', 'ps', 'priceHistory'].includes(header.id) ? 'text-center' : ''}
                            {['price', 'marketCap', 'change1y', 'high52w'].includes(header.id)
								? 'text-right'
								: ''}
                            {header.id === 'pe' ? 'border-x border-gray-100' : ''}"
						>
							{#if !header.isPlaceholder}
								{flexRender(header.column.columnDef.header, header.getContext())}
							{/if}
						</th>
					{/each}
				</tr>
			{/each}
		</thead>

		<tbody>
			{#each table.getRowModel().rows as row, i (row.id)}
				<tr
					animate:flip={{ duration: 800 }}
					class="group border-b border-gray-100 transition-colors hover:bg-blue-50/30 {i % 2 === 0
						? 'bg-white'
						: 'bg-gray-100'}"
				>
					{#each row.getVisibleCells() as cell (cell.id)}
						<td
							class="p-4 transition-colors duration-500
							{cell.column.id === 'price' ? flashColors[row.original.ticker] || '' : ''}
							{cell.column.id === 'ticker' ? 'text-left' : ''}
                            {['pe', 'ps', 'priceHistory'].includes(cell.column.id)
								? 'text-center'
								: ''}
                            {['price', 'marketCap', 'change1y', 'high52w'].includes(cell.column.id)
								? 'text-right'
								: ''}
							{cell.column.id === 'ps' ? 'bg-orange-50/30 font-bold text-orange-800' : ''}
							{cell.column.id === 'pe' ? `border-x border-gray-100 font-bold ${getPeClass(row.original.pe)}` : ''}
							{cell.column.id === 'price' ? 'font-mono font-bold text-gray-900' : ''}
							{cell.column.id === 'marketCap' ? 'font-medium text-gray-500' : ''}
							{cell.column.id === 'high52w' ? 'font-bold text-gray-400 italic' : ''}"
						>
							{#if cell.column.id === 'ticker'}
								{@render tickerCell(row)}
							{:else if cell.column.id === 'change1y'}
								{@render change1yCell(row)}
							{:else if cell.column.id === 'priceHistory'}
								{@render priceHistoryCell(row)}
							{:else}
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
