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

    $: sum = selected_members.length;

    function fits_in_group(member: member, group: group) {
        const age = current_year - member.birth_year;
        return age >= group.min && age <= group.max;
    }

    $: party_data_list = selected_members
        .reduce(
            (list, member) => {
                const index = parties.findIndex(
                    (party) => party.name === member.party_name
                );
                if (index >= 0) list[index].count++;
                return list;
            },
            parties.map((party) => ({ ...party, count: 0 }))
        )
        .map((data) => ({ ...data, percent: data.count / sum }));
</script>

<main>
    <Menu bind:selected_group />
    <Pie {party_data_list} />
    <Summary {party_data_list} {sum} {selected_group} />
</main>
