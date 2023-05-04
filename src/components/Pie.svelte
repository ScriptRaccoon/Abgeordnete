<script lang="ts">
    import { tweened } from "svelte/motion";
    import { cubicInOut } from "svelte/easing";
    import { fade } from "svelte/transition";

    import { partial_sums } from "@/utils";

    export let party_data_list: party_data[] = [];

    let mouse: {
        x: number | null;
        y: number | null;
    } = { x: null, y: null };

    let selected_party: party_data | null = null;

    const cumulative_distribution = tweened(
        new Array(party_data_list.length + 1).fill(0),
        { duration: 750, easing: cubicInOut }
    );

    $: {
        const distribution = party_data_list.map((party) => party.percent);
        $cumulative_distribution = partial_sums(distribution);
    }

    function get_point(percent: number): point {
        const x = Math.cos(percent * 2 * Math.PI - Math.PI / 2);
        const y = Math.sin(percent * 2 * Math.PI - Math.PI / 2);
        return { x, y };
    }

    function show_tooltip(e: MouseEvent, party: party_data) {
        const top = window.pageYOffset || document.documentElement.scrollTop;
        mouse.x = e.clientX;
        mouse.y = e.clientY + top;
        selected_party = party;
    }

    function hide_tooltip() {
        mouse.x = null;
        mouse.y = null;
        selected_party = null;
    }
</script>

{#if selected_party !== null}
    <div
        transition:fade={{ duration: 150 }}
        class="tooltip"
        style="left: {mouse.x + 5}px; top: {mouse.y + 5}px"
    >
        {selected_party.name}
        {Math.round(selected_party.percent * 100)}%
    </div>
{/if}

<section aria-label="Kuchendiagramm" aria-hidden="true">
    <svg viewBox="-1 -1 2 2">
        {#each party_data_list as party, index}
            {@const start_percent = $cumulative_distribution[index]}
            {@const end_percent = $cumulative_distribution[index + 1]}
            {#if end_percent > start_percent}
                {@const start_point = get_point(start_percent)}
                {@const end_point = get_point(end_percent)}
                {@const flag = end_percent - start_percent > 0.5 ? 1 : 0}
                <path
                    on:mousemove={(e) => show_tooltip(e, party)}
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

    .tooltip {
        position: absolute;
        z-index: 10;
        background-color: white;
        padding: 0.5rem;
        border-radius: 0.25rem;
        box-shadow: 0rem 0rem 1rem #0005;
    }
</style>
