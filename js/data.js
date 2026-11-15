const initial_players = [
    { name: "samiya", number: 1, post: "Gardien", age: 20, sitiations: "En Forme" },
    { name: "maroua", number: 2, post: "Défenseur", age: 20, sitiations: "En Forme" },
    { name: "zaynab", number: 4, post: "Défenseur", age: 20, sitiations: "En Forme" },
    { name: "mohssin", number: 5, post: "Défenseur", age: 20, sitiations: "En Forme" },
    { name: "salma", number: 12, post: "Défenseur", age: 20, sitiations: "En Forme" },
    { name: "messi", number: 10, post: "Milieu", age: 20, sitiations: "En Forme" },
    { name: "katrina", number: 17, post: "Milieu", age: 20, sitiations: "En Forme" },
    { name: "Jude", number: 22, post: "Milieu", age: 20, sitiations: "En Forme" },
    { name: "hassan", number: 30, post: "Attaquant", age: 20, sitiations: "En Forme" },
    { name: "Kylian ", number: 7, post: "Attaquant", age: 20, sitiations: "En Forme" },
    { name: "Cristiano Ronaldo", number: 9, post: "Attaquant", age: 20, sitiations: "En Forme" },
    { name: "firdaws", number: 20, post: "Milieu", age: 20, sitiations: "En Forme" }
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
    return JSON.parse(localStorage.getItem(key)) || initial_players;
}

export let list_of_players = getitems();

export const regexofnumber = /^([1-9]|[1-9][0-9])$/;
export const regex_nom = /^[A-Za-zÀ-ÿ ]{3,30}$/;
