const initial_players = [
    { name: "Thibaut Courtois", number: 1, post: "Gardien", age: 20, sitaitions: "En Forme" },
    { name: "Achraf Hakimi", number: 2, post: "Défenseur", age: 20, sitaitions: "En Forme" },
    { name: "Sergio Ramos", number: 4, post: "Défenseur", age: 20, sitaitions: "En Forme" },
    { name: "Virgil van Dijk", number: 5, post: "Défenseur", age: 20, sitaitions: "En Forme" },
    { name: "Marcelo", number: 12, post: "Défenseur", age: 20, sitaitions: "En Forme" },
    { name: "Luka Modrić", number: 10, post: "Milieu", age: 20, sitaitions: "En Forme" },
    { name: "Kevin De Bruyne", number: 17, post: "Milieu", age: 20, sitaitions: "En Forme" },
    { name: "Jude Bellingham", number: 22, post: "Milieu", age: 20, sitaitions: "En Forme" },
    { name: "Lionel Messi", number: 30, post: "Attaquant", age: 20, sitaitions: "En Forme" },
    { name: "Kylian Mbappé", number: 7, post: "Attaquant", age: 20, sitaitions: "En Forme" },
    { name: "Cristiano Ronaldo", number: 9, post: "Attaquant", age: 20, sitaitions: "En Forme" },
    { name: "Cristiano", number: 20, post: "Milieu", age: 20, sitaitions: "En Forme" }
];
export const postes = {
    GB: "Gardien",
    DEF: "Défenseur",
    MIL: "Milieu",
    ATT: "Attaquant"
};
const key = "my_key";

export function setitems(users) {
    localStorage.setItem(key, JSON.stringify(users));
}
function getitems() {
    const saved_players = localStorage.getItem(key);
    return saved_players ? JSON.parse(saved_players) : initial_players;
}
export let list_of_players = getitems();
export const regexofnumber = /^([1-9]|[1-9][0-9])$/;
export const regex_nom = /^[A-Za-zÀ-ÿ ]{3,30}$/;
export const colors = {
    "Gardien": "border-l-yellow-500!",
    "Défenseur": "border-l-blue-500!",
    "Milieu": "border-l-green-500!",
    "Attaquant": "border-l-red-500!"
};

export const border_by_pos = {
    GB: "border-yellow-400!",
    DG: "border-blue-400!", DC1: "border-blue-400!", DC2: "border-blue-400!", DD: "border-blue-400!",
    MG: "border-green-400!", MC1: "border-green-400!", MC2: "border-green-400!", MD: "border-green-400!",
    BU1: "border-red-400!", BU2: "border-red-400!"
};

export const all_box_borders = [
    "border-yellow-400!",
    "border-blue-400!",
    "border-green-400!",
    "border-red-400!"
];

export const posible_posts = {
    "Gardien": ["GB"],
    "Défenseur": ["DG", "DC1", "DC2", "DD"],
    "Milieu": ["MG", "MC1", "MC2", "MD"],
    "Attaquant": ["BU1", "BU2"]
};
export const matchs = [];