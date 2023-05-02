<script lang="ts">
    import { groups } from "../data/groups";
    export let selected_group: group;
</script>

<p id="choice">Wähle eine Altersgruppe aus.</p>

<menu aria-describedby="choice">
    {#each groups as group}
        <button
            role="option"
            aria-selected={group === selected_group}
            class:active={selected_group === group}
            on:click={() => {
                selected_group = group;
            }}
        >
            {@html group.label}
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
        background-color: cornflowerblue;
        color: white;
    }
</style>
