<script lang="ts">
    import { members } from "../data/members";
    import { parties } from "../data/parties";

    import Summary from "./Summary.svelte";
    import Menu from "./Menu.svelte";
    import Pie from "./Pie.svelte";
    import { groups } from "../data/groups";

    const current_year = 2023;

    let selected_group: group = groups[0];

    $: selected_members = members.filter((member) =>
        fits_in_group(member, selected_group)
    );

    function fits_in_group(member: member, group: group) {
        const age = current_year - member.birth_year;
        return age >= group.min && age <= group.max;
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

<Menu bind:selected_group />

<Pie {distribution} />

<Summary {counts} {sum} {selected_group} />
