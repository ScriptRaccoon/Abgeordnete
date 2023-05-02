<script lang="ts">
    import { tweened } from "svelte/motion";
    import { cubicInOut } from "svelte/easing";

    import { parties } from "../data/parties";
    import { partial_sums } from "../utils";

    export let distribution: number[] = [];

    const tween_options = { duration: 750, easing: cubicInOut };

    const cumulative_percentages = tweened(
        new Array(distribution.length).fill(0),
        tween_options
    );

    $: {
        const relevant_numbers = distribution.slice(0, distribution.length - 1);
        $cumulative_percentages = partial_sums(relevant_numbers);
    }

    function get_point(percent: number): point {
        const x = Math.cos(percent * 2 * Math.PI);
        const y = Math.sin(percent * 2 * Math.PI);
        return { x, y };
    }
</script>

<section aria-label="Kuchendiagramm" aria-hidden="true">
    <svg viewBox="-1 -1 2 2">
        {#each distribution as _, index}
            {@const start_percent = $cumulative_percentages[index]}
            {@const end_percent = $cumulative_percentages[index + 1] ?? 1}
            {@const start_point = get_point(start_percent)}
            {@const end_point = get_point(end_percent)}
            {@const flag = end_percent - start_percent > 0.5 ? 1 : 0}
            <path
                d="M 0 0
                   L {start_point.x} {start_point.y}
                   A 1 1 0 {flag} 1 {end_point.x} {end_point.y}"
                fill={parties[index].color}
            />
        {/each}

        <circle cx="0" cy="0" r="0.25" fill="white" />
    </svg>
</section>

<style>
    section {
        padding-block: 1rem;
        max-width: 24rem;
        margin-inline: auto;
    }

    svg {
        transform: rotate(-90deg);
    }
</style>
