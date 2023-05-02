<script lang="ts">
    export let selected_age_index: number;
    const age_indices = [2, 3, 4, 5, 6, 7, 8];
</script>

<p id="choice">Wähle eine Altersgruppe aus.</p>

<menu aria-describedby="choice">
    {#each age_indices as index}
        <button
            role="option"
            aria-selected={index === selected_age_index}
            class:active={selected_age_index === index}
            on:click={() => {
                selected_age_index = index;
            }}
        >
            {10 * index}&ndash;{10 * index + 9}
        </button>
    {/each}
</menu>

<style>
    menu {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        padding-block: 1rem;
    }
    button {
        font-family: inherit;
        font-size: inherit;
        color: inherit;
        border: none;
        padding: 0.5rem;
        border-radius: 0.25rem;
        cursor: pointer;
    }

    button.active {
        background-color: skyblue;
    }
</style>
