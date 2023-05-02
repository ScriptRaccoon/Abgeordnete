<script lang="ts">
    import Header from "./components/Header.svelte";
    import Visualization from "./components/Visualization.svelte";
</script>

<svelte:head>
    <title>Abgeordnete im Bundestag</title>
</svelte:head>

<Header />

<main>
    <Visualization />
</main>

<style>
    main {
        padding-inline: 1rem;
        max-width: 32rem;
        margin-inline: auto;
    }
</style>
