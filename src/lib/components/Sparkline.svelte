<script lang="ts">
	interface Props {
		data: number[];
		width?: number;
		height?: number;
		colorId: string;
	}

	let { data, width = 100, height = 32, colorId }: Props = $props();

	let min = $derived(Math.min(...data));
	let max = $derived(Math.max(...data));
	let diff = $derived(max - min || 1);

	let isUp = $derived(data.length > 0 ? data[data.length - 1] >= data[0] : true);
	let color = $derived(isUp ? '#10b981' : '#ef4444');

	let points = $derived(
		data.length > 0
			? data
					.map((p, i) => {
						const x = (i / (data.length - 1)) * width;
						const y = height - ((p - min) / diff) * height;
						return `${x},${y}`;
					})
					.join(' ')
			: `0,${height} ${width},${height}`
	);
</script>

<div class="flex justify-center">
	<svg {width} {height} class="overflow-visible">
		<defs>
			<linearGradient id={colorId} x1="0%" y1="0%" x2="0%" y2="100%">
				<stop offset="0%" stop-color={color} stop-opacity="0.2" />
				<stop offset="100%" stop-color={color} stop-opacity="0" />
			</linearGradient>
		</defs>

		{#if data.length > 1}
			<path
				d={`M0,${height} ${points
					.split(' ')
					.map((p) => `L${p}`)
					.join(' ')} L${width},${height} Z`}
				fill={`url(#${colorId})`}
			/>

			<polyline
				{points}
				fill="none"
				stroke={color}
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		{/if}
	</svg>
</div>
