<script lang="ts">
    export let selected_age_index: number = 2;
    export let sum: number = 0;
    export let counts: {
        name: party_name;
        count: number;
        color: string;
    }[] = [];
</script>

<section aria-label="Zusammenfassung" aria-live="polite">
    <p>
        In der Altersgruppe
        {10 * selected_age_index}&ndash;{selected_age_index * 10 + 9}
        teilen sich {sum} Abgeordnete wie folgt auf:
    </p>
    <ul>
        {#each counts as entry}
            {@const percent = Math.round((entry.count / sum) * 100)}
            <li>
                {entry.name}: <span class="count">{entry.count}</span>
                ({percent}%)
            </li>
        {/each}
    </ul>
</section>

<style>
    section {
        margin-block: 1rem 2rem;
        font-size: 1.2rem;
    }
    ul {
        margin-top: 0.5rem;
        margin-left: 1.5rem;
    }
    .count {
        font-weight: bold;
    }
</style>
