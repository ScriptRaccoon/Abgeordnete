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

type group = {
    label: string;
    min: number;
    max: number;
};
