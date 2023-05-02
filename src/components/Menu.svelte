<script lang="ts">
    import { groups } from "../data/groups";
    export let selected_group: group;

    let selected_index: number = 0;

    $: {
        selected_group = groups[selected_index];
    }
</script>

<label for="menu">Wähle eine Altersgruppe aus.</label>

<select id="menu" bind:value={selected_index}>
    {#each groups as group, index}
        <option value={index}>
            {@html group.label}
        </option>
    {/each}
</select>

<style>
    select {
        padding: 0.2rem;
        font-family: inherit;
        font-size: inherit;
        border: 0.1rem solid #aaa;
        border-radius: 0.25rem;
    }
    select:focus {
        border-color: steelblue;
        outline: none;
    }
</style>
