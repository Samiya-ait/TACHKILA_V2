import { list_of_players } from "./data.js";
import { creer_carte_effectif } from "./functions.js";
import { add } from "./functions.js";
import { input_search } from "./functions.js";
import { choice_search } from "./functions.js";
import { postes } from "./data.js";
import { setitems } from "./data.js";

const rand = document.querySelector("#rand");
setitems(list_of_players);

choice_search.forEach(function (btn) {
    btn.addEventListener("click", function () {
        rand.innerHTML = "";
        if (btn.textContent.trim() === "tous") {
            for (const player of list_of_players) {
                rand.append(creer_carte_effectif(player));
            }
            return;
        }
        else {
            for (const player of list_of_players) {
                if (player.post.trim() === postes[btn.textContent.trim()]) {
                    rand.append(creer_carte_effectif(player))
                }
            }
        }

    })
})

input_search.addEventListener("input", function () {
    rand.innerHTML = "";
    const text = input_search.value.trim().toLowerCase();
    if (text !== "")
        for (const p of list_of_players) {
            if (p.name.trim().toLowerCase().includes(text)) {
                rand.append(creer_carte_effectif(p));
            }
        }
    else {
        for (const p of list_of_players) {
            rand.append(creer_carte_effectif(p));
        }
    }
})
for (const player of list_of_players) {
    rand.append(creer_carte_effectif(player))

}

add();