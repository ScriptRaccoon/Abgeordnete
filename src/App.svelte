<script lang="ts">
    import Footer from "./components/Footer.svelte";
    import Header from "./components/Header.svelte";
    import Visualization from "./components/Visualization.svelte";
</script>

<svelte:head>
    <title>Abgeordnete im Bundestag</title>
</svelte:head>

<div class="container">
    <Header />
    <Visualization />
    <Footer />
</div>
