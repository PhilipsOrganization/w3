<script lang="ts">
	export let size = 3;
	export let highlightFirst = false;

	$: gap = (size * 2) / 3;
	$: width = size * 4 + gap;
</script>

<svg {width} height="12 " viewBox="0 0 {width} 10" fill="none" xmlns="http://www.w3.org/2000/svg">
	<ellipse fill={highlightFirst ? '#FF7700' : '#434343'} cx={size} cy={size} rx={size} ry={size} />
	<ellipse fill="#434343" cx={size * 3 + gap} cy={size} rx={size} ry={size} />
</svg>
