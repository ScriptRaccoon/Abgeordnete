// The following script needs to be executed on the Wikipedia page
// https://de.wikipedia.org/wiki/Liste_der_Mitglieder_des_Deutschen_Bundestages_%2820._Wahlperiode%29
// to print the list of all members of the German Bundestag.
// The output is saved in the file members.ts (as of May 2023).
// The TypeScript compiler validates the data for us.

function generate_members() {
    const table = document.querySelectorAll("table")[2];
    const rows = table.querySelectorAll("tr");

    let members = [];

    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].querySelectorAll("td");

        const name = cells[1].innerText.trim();
        const birth_year = parseInt(cells[2].innerText.trim());
        const party_name = normalize_party(cells[3].innerText.trim());

        const member = { name, birth_year, party_name };

        members.push(member);
    }

    document.body.innerText = JSON.stringify(members);

    function normalize_party(party) {
        if (party.includes("(CDU)")) return "CDU";
        if (party.includes("(CSU)")) return "CSU";
        if (party.includes("fraktionslos")) return "fraktionslos";
        return party;
    }
}

generate_members();
