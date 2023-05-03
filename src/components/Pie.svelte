<script lang="ts">
    import { tweened } from "svelte/motion";
    import { cubicInOut } from "svelte/easing";
    import { fade } from "svelte/transition";

    import { parties } from "../data/parties";
    import { partial_sums } from "../utils";

    export let distribution: number[] = [];

    let mouse: {
        x: number | null;
        y: number | null;
    } = { x: null, y: null };

    let selected_party_index: number | null = null;

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

    function show_tooltip(e: MouseEvent, index: number) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        selected_party_index = index;
    }

    function hide_tooltip() {
        mouse.x = null;
        mouse.y = null;
        selected_party_index = null;
    }

    $: console.log($cumulative_percentages);
</script>

{#if selected_party_index !== null}
    <div
        transition:fade={{ duration: 150 }}
        class="tooltip"
        style="left: {mouse.x + 5}px; top: {mouse.y + 5}px"
    >
        {parties[selected_party_index].name}
        {Math.round(distribution[selected_party_index] * 100)}%
    </div>
{/if}

<section aria-label="Kuchendiagramm" aria-hidden="true">
    <svg viewBox="-1 -1 2 2">
        {#each distribution as _, index}
            {@const start_percent = $cumulative_percentages[index]}
            {@const end_percent = $cumulative_percentages[index + 1] ?? 1}
            {#if end_percent > start_percent}
                {@const start_point = get_point(start_percent)}
                {@const end_point = get_point(end_percent)}
                {@const flag = end_percent - start_percent > 0.5 ? 1 : 0}
                {@const party = parties[index]}
                <path
                    on:mousemove={(e) => show_tooltip(e, index)}
                    on:mouseleave={hide_tooltip}
                    d="M 0 0
                   L {start_point.x} {start_point.y}
                   A 1 1 0 {flag} 1 {end_point.x} {end_point.y}"
                    fill={party.color}
                />
            {/if}
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

    .tooltip {
        position: absolute;
        z-index: 10;
        background-color: white;
        padding: 0.5rem;
        border-radius: 0.25rem;
        box-shadow: 0rem 0rem 1rem #0005;
    }
</style>
