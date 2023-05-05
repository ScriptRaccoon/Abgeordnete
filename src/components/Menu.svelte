<script lang="ts">
    import { groups } from "@/data/groups";
    export let selected_group: group;
</script>

<p>Wähle eine Altersgruppe aus.</p>

<div role="listbox" class="menu" aria-label="Altersgruppe">
    {#each groups as group}
        <button
            role="option"
            aria-selected={group === selected_group}
            class:selected={selected_group === group}
            on:click={() => {
                selected_group = group;
            }}
        >
            {@html group.label}
        </button>
    {/each}
</div>

<style>
    .menu {
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
        padding-block: 0.4rem;
        border-radius: 0.25rem;
        cursor: pointer;
        width: 4.25rem;
    }

    button:focus-visible {
        outline: 0.1rem solid var(--primary-color);
        outline-offset: 0.1rem;
    }

    button.selected {
        background-color: var(--primary-color);
        color: white;
    }
</style>
