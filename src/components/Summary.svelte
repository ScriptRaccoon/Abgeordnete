<script lang="ts">
    export let sum: number;
    export let party_data_list: party_data[];
    export let selected_group: group;
</script>

{#key selected_group.min}
    <section aria-label="Zusammenfassung" aria-live="polite">
        <p>
            In der Altersgruppe
            <strong>{@html selected_group.label}</strong>
            teilen sich <strong>{sum}</strong> Abgeordnete wie folgt auf:
        </p>
        <ul>
            {#each party_data_list as party}
                {@const percent = Math.round(party.percent * 100)}
                <li>
                    {party.name}: <strong>{party.count}</strong>
                    ({percent}%)
                </li>
            {/each}
        </ul>
    </section>
{/key}

<style>
    section {
        padding-block: 1rem;
        font-size: 1.2rem;
    }
    ul {
        margin-top: 0.5rem;
        margin-left: 1.5rem;
    }
</style>
