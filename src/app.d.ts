type party_name =
    | "SPD"
    | "CDU"
    | "CSU"
    | "FDP"
    | "Grüne"
    | "AfD"
    | "Linke"
    | "fraktionslos";

type party = {
    name: party_name;
    color: string;
};

type member = {
    name: string;
    birth_year: number;
    party_name: party_name;
};

type point = {
    x: number;
    y: number;
};
