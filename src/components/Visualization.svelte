<script lang="ts">
    import { members } from "../data/members";
    import { parties } from "../data/parties";

    import Summary from "./Summary.svelte";
    import Menu from "./Menu.svelte";
    import Pie from "./Pie.svelte";

    const current_year = 2023;

    let selected_age_index = 2;

    $: selected_members = members.filter((member) =>
        fits_to_age_index(member, selected_age_index)
    );

    function fits_to_age_index(member: member, index: number) {
        const age = current_year - member.birth_year;
        return age >= 10 * index && age < 10 * (index + 1);
    }

    $: counts = selected_members.reduce(
        (prev, member) => {
            const index = parties.findIndex(
                (p) => p.name === member.party_name
            );
            if (index >= 0) prev[index].count++;
            return prev;
        },
        parties.map((p) => ({ ...p, count: 0 }))
    );

    $: sum = counts.reduce((prev, party) => prev + party.count, 0);

    $: distribution = counts.map((party) => party.count / sum);
</script>

<Menu bind:selected_age_index />

<Pie {distribution} />

<Summary {counts} {sum} {selected_age_index} />
