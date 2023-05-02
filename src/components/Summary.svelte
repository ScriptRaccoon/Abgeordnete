<script lang="ts">
    export let selected_group: group;
    export let sum: number;
    export let counts: {
        name: party_name;
        count: number;
        color: string;
    }[];
</script>

{#key selected_group.min}
    <section aria-label="Zusammenfassung" aria-live="polite">
        <p>
            In der Altersgruppe
            <span class="strong">{@html selected_group.label}</span>
            teilen sich <span class="strong">{sum}</span> Abgeordnete wie folgt auf:
        </p>
        <ul>
            {#each counts as entry}
                {@const percent = Math.round((entry.count / sum) * 100)}
                <li>
                    {entry.name}: <span class="strong">{entry.count}</span>
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
