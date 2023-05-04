<script lang="ts">
    import Summary from "@/components/Summary.svelte";
    import Menu from "@/components/Menu.svelte";
    import Pie from "@/components/Pie.svelte";

    import { members } from "@/data/members";
    import { parties } from "@/data/parties";
    import { groups } from "@/data/groups";

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
        parties.map((party) => ({ name: party.name, count: 0 }))
    );

    $: sum = selected_members.length;

    $: distribution = counts.map((party) => party.count / sum);
</script>

<main>
    <Menu bind:selected_group />
    <Pie {distribution} />
    <Summary {counts} {sum} {selected_group} />
</main>
