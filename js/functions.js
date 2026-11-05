import {
    list_of_players,
    setitems,
    regexofnumber,
    regex_nom,
    colors,
    border_by_pos,
    posible_posts,
} from "./data.js";
console.log(list_of_players)

const all = document.querySelector(".form_general_player");
const select_template = all.querySelector(".select-group").cloneNode(true);
all.querySelector(".player-card").remove();

const edit_modal = document.querySelector("#modifier");
const edit_name = document.querySelector("#edit-player");
const edit_age = document.querySelector("#age_modif")

const edit_number = document.querySelector("#edit-numberofplayer");
const edit_submit = document.querySelector("#btn-edit-submit");
const edit_error_name = document.querySelector(".edit-error-msg-name");
const edit_error_number = document.querySelector(".edit-msg-number");
const edit_post_buttons = edit_modal.querySelectorAll(".edit-btn-post");
const close_edit_buttons = edit_modal.querySelectorAll(".modifier-close-btn");
const btn_sitiations = document.querySelectorAll(".btn_sitiation")
const bt_sitiation_edit = document.querySelectorAll(".bt_sitiation")
export const input_search = document.querySelector("#search")
export const choice_search = document.querySelectorAll(".choice_s")
const msg_sitiation = document.querySelector(".msg-sitiation")
const edit_error_age = document.querySelector(".edit-msg-age");

let joueur_en_modification = null;
let post_edit = "";
let sitiation = "";
let sitiation_edit = "";
const orange = "bg-[oklch(66.6%_0.179_58.318)]";
choice_search.forEach(function (btn) {
    if (btn.textContent.trim() === "tous") {
        btn.classList.add("bg-green-500")
    }
})
export function manipilation_color(classe) {

    classe.forEach(function (btn) {

        btn.addEventListener("click", function () {
            classe.forEach(function (btn) {
                btn.classList.remove("bg-green-500")
            })
            btn.classList.add("bg-green-500")
        })
    })
}
manipilation_color(choice_search)

for (let i = 0; i < close_edit_buttons.length; i++) {
    close_edit_buttons[i].addEventListener("click", function () {
        edit_modal.setAttribute("hidden", "");
    });
}
for (let i = 0; i < edit_post_buttons.length; i++) {
    edit_post_buttons[i].addEventListener("click", function () {
        for (let j = 0; j < edit_post_buttons.length; j++) {
            edit_post_buttons[j].classList.remove(orange);
        }
        edit_post_buttons[i].classList.add(orange);
        post_edit = edit_post_buttons[i].textContent.trim();
    });
}
export function show_message(message, error = false) {
    const success = document.querySelector("#msg-success");
    const p = success.querySelector("p");

    p.textContent = message;
    p.classList.remove("bg-green-500", "bg-red-500");
    p.classList.add(error ? "bg-red-500" : "bg-green-500");

    success.removeAttribute("hidden");
    setTimeout(function () {
        success.setAttribute("hidden", "");
    }, 1500);
}
function compter_joueurs() {
    const compteur = document.querySelector(".length");
    if (compteur) {
        compteur.textContent = list_of_players.length;
    }

    const aucun = document.querySelector("#auc");
    if (aucun) {
        if (list_of_players.length === 0) {
            aucun.removeAttribute("hidden");
        } else {
            aucun.setAttribute("hidden", "");
        }
    }

}
function colorer_carte(carte, div_number, poste) {
    carte.classList.remove("border-l-yellow-500!", "border-l-blue-500!", "border-l-green-500!", "border-l-red-500!");
    div_number.classList.remove("border-l-yellow-500!", "border-l-blue-500!", "border-l-green-500!", "border-l-red-500!");

    carte.classList.add("border-l-4!", colors[poste]);
    div_number.classList.add("border-l-4!", colors[poste]);
}
function couleur_fond(poste) {
    if (poste === "Gardien") return "bg-yellow-400/50!";
    if (poste === "Défenseur") return "bg-blue-400/50!";
    if (poste === "Milieu") return "bg-green-400/50!";
    return "bg-red-400/50!";
}

function vider_position(player) {
    if (!player.position_choisie) {
        return;
    }

    const position = document.querySelector('[data-position="' + player.position_choisie + '"]');

    if (position) {
        position.querySelector("p").textContent = "Libre";
        position.classList.remove(
            "bg-yellow-400/50!",
            "bg-blue-400/50!",
            "bg-green-400/50!",
            "bg-red-400/50!",
            "border",
            "border-yellow-400!",
            "border-blue-400!",
            "border-green-400!",
            "border-red-400!"
        );
        position.classList.add("border-2", "border-dashed", "border-white/40");
    }

    player.position_choisie = "";
}

function mettre_position(player, pos) {
    const position = document.querySelector('[data-position="' + pos + '"]');
    const paragraphe = position.querySelector("p");

    if (paragraphe.textContent.trim() !== "Libre") {
        show_message("Cette position est déjà occupée.", true);
        return false;
    }

    if (!posible_posts[player.post].includes(pos)) {
        show_message("This player cannot play in this position", true);
        return false;
    }

    vider_position(player);

    position.classList.remove("border-dashed", "border-white/40");
    position.classList.add("border-2", "border", border_by_pos[pos], couleur_fond(player.post));
    paragraphe.textContent = player.number + "  " + player.name;
    player.position_choisie = pos;
    setitems(list_of_players);

    return true;
}

function ouvrir_suppression(player, carte) {
    const modal = document.querySelector("#modal-delete");

    document.querySelector("#delete-message").textContent = "Voulez-vous supprimer " + player.name + " ?";
    modal.removeAttribute("hidden");

    document.querySelector("#cancel-delete").onclick = function () {
        modal.setAttribute("hidden", "");
    };

    document.querySelector("#confirm-delete").onclick = function () {
        vider_position(player);

        const index = list_of_players.indexOf(player);
        list_of_players.splice(index, 1);

        carte.remove();
        setitems(list_of_players);
        compter_joueurs();
        modal.setAttribute("hidden", "");
        show_message(player.name + " removed successfully");
    };
}
bt_sitiation_edit.forEach(function (btn) {
    btn.addEventListener("click", function () {
        bt_sitiation_edit.forEach(function (b) {
            b.classList.remove("bg-green-400");
        });
        btn.classList.add("bg-green-400");
        sitiation_edit = btn.textContent.trim();
    });
});
function ouvrir_modification(player) {
    joueur_en_modification = player;
    post_edit = player.post;
    sitiation_edit = player.sitiations;

    edit_name.value = player.name;
    edit_number.value = player.number;
    edit_age.value = player.age;


    bt_sitiation_edit.forEach(function (btn) {
        btn.classList.remove("bg-green-400");

        if (btn.textContent.trim() === player.sitiations) {
            btn.classList.add("bg-green-400");
        }
    });


    edit_error_name.textContent = "";
    edit_error_number.textContent = "";
    edit_error_age.textContent = "";


    for (let i = 0; i < edit_post_buttons.length; i++) {
        edit_post_buttons[i].classList.remove(orange);

        if (edit_post_buttons[i].textContent.trim() === player.post) {
            edit_post_buttons[i].classList.add(orange);
        }
    }
    edit_modal.removeAttribute("hidden");
}

function creer_select(player) {
    const select_group = select_template.cloneNode(true);
    const select = select_group.querySelector("select");

    if (player.position_choisie) {
        select.value = player.position_choisie;
    } else {
        select.value = "banc";
    }

    select.addEventListener("change", function () {
        if (select.value === "banc") {
            vider_position(player);
            setitems(list_of_players);
        } else {
            const ok = mettre_position(player, select.value);

            if (!ok) {
                if (player.position_choisie) {
                    select.value = player.position_choisie;
                } else {
                    select.value = "banc";
                }
            }
        }
    });

    return select_group;
}

export function creer_carte(player) {
    const carte = document.createElement("div");
    carte.classList.add("player-card");
    carte.dataset.playerNumber = player.number;

    const div_parent = document.createElement("div");
    div_parent.classList.add("player-info");

    const players_all = document.createElement("div");

    const ligne = document.createElement("div");
    ligne.classList.add("flex", "gap-6");

    const div_number = document.createElement("div");
    div_number.classList.add("player-number");
    const nmb = document.createElement("h2");
    nmb.textContent = player.number;
    div_number.append(nmb);

    const div_details = document.createElement("div");
    div_details.classList.add("player-details");

    const nom = document.createElement("strong");
    nom.textContent = player.name;
    const sitiation = document.createElement("div")
    const sitiation_afich = document.createElement("p")
    if (player.sitiations.trim() === "Blessé") {
        sitiation_afich.textContent = player.sitiations
        sitiation_afich.classList.add(
            "bg-red-500/15", "text-red-400", "border", "border-red-500/40",
            "rounded", "px-2", "py-0.5", "text-xs", "font-semibold"
        );
        sitiation.append(sitiation_afich)
    }
    const post = document.createElement("p");
    post.textContent = player.post;

    const ligne_nom = document.createElement("div");
    ligne_nom.classList.add("flex", "items-center", "gap-2");
    ligne_nom.append(nom, sitiation);
    ligne_nom.classList.add("flex", "place-content-between", "gap-2");
    div_details.append(ligne_nom, post, creer_select(player));

    ligne.append(div_number, div_details);
    players_all.append(ligne);
    div_parent.append(players_all);
    carte.append(div_parent);

    colorer_carte(carte, div_number, player.post);
    if (player.sitiations === "Blessé") {
        carte.classList.add("opacity-50");

        const select = carte.querySelector("select");
        select.disabled = true;
        select.value = "banc";
        select.classList.add("cursor-not-allowed");
    }
    return carte;
}
export function show(player) {
    const carte = creer_carte(player);
    all.append(carte);
    compter_joueurs();
}

edit_submit.addEventListener("click", function () {
    if (!joueur_en_modification) {
        return;
    }

    const nom = edit_name.value.trim();
    const numero = Number(edit_number.value);

    const age_joueur = Number(edit_age.value);
    const age_valide = age_joueur >= 15 && age_joueur <= 50;


    const nom_valide = regex_nom.test(nom);
    const numero_valide = regexofnumber.test(edit_number.value);

    let numero_utilise = false;
    for (let i = 0; i < list_of_players.length; i++) {
        if (list_of_players[i].number === numero && list_of_players[i] !== joueur_en_modification) {
            numero_utilise = true;
        }
    }

    if (nom_valide) {
        edit_error_name.textContent = "";
    } else {
        edit_error_name.textContent = "Veuillez saisir un nom valide.";
    }
    edit_error_age.textContent = age_valide ? "" : "Âge invalide (15 à 50).";
    if (!numero_valide) {
        edit_error_number.textContent = "Numéro invalide. Saisissez un numéro entre 1 et 99.";
    } else if (numero_utilise) {
        edit_error_number.textContent = "Numéro déjà utilisé.";
    } else {
        edit_error_number.textContent = "";
    }

    if (!nom_valide || !numero_valide || numero_utilise || !age_valide || post_edit === "") {
        return;
    }

    const carte = document.querySelector('.player-card[data-player-number="' + joueur_en_modification.number + '"]');

    if (post_edit !== joueur_en_modification.post) {
        vider_position(joueur_en_modification);
        if (carte) {
            carte.querySelector("select").value = "banc";
        }
    }

    joueur_en_modification.name = nom;
    joueur_en_modification.number = numero;
    joueur_en_modification.post = post_edit;
    joueur_en_modification.age = age_joueur;
    joueur_en_modification.sitiations = sitiation_edit;

    if (carte) {
        carte.dataset.playerNumber = numero;
        carte.querySelector(".player-number h2").textContent = numero;
        carte.querySelector(".player-details strong").textContent = nom;
        carte.querySelector(".player-details p").textContent = post_edit;
        colorer_carte(carte, carte.querySelector(".player-number"), post_edit);
    }

    if (joueur_en_modification.position_choisie) {
        const position = document.querySelector('[data-position="' + joueur_en_modification.position_choisie + '"]');
        if (position) {
            position.querySelector("p").textContent = numero + "  " + nom;
        }
    }

    setitems(list_of_players);
    edit_modal.setAttribute("hidden", "");

    const rand = document.querySelector("#rand");
    if (rand) {
        rand.innerHTML = "";
        for (const p of list_of_players) {
            rand.append(creer_carte_effectif(p));
        }
    }

    joueur_en_modification = null;
    post_edit = "";
    show_message(nom + " Edited successfully");
});
const styles_effectif = {
    Gardien: { court: "GB", bordure: "border-l-yellow-400", cercle: "border-yellow-400 text-yellow-400", badge: "bg-yellow-400/15 text-yellow-300" },
    Défenseur: { court: "DEF", bordure: "border-l-blue-500", cercle: "border-blue-500 text-blue-400", badge: "bg-blue-500/15 text-blue-300" },
    Milieu: { court: "MIL", bordure: "border-l-green-500", cercle: "border-green-500 text-green-400", badge: "bg-green-500/15 text-green-300" },
    Attaquant: { court: "ATT", bordure: "border-l-red-500", cercle: "border-red-500 text-red-400", badge: "bg-red-500/15 text-red-300" }
};

function creer_bouton_effectif(contenu, hover) {
    const bouton = document.createElement("button");
    bouton.type = "button";
    bouton.innerHTML = contenu;
    bouton.className =
        "flex h-9 w-9 items-center justify-center rounded-lg border border-slate-600 " +
        "text-sm text-slate-300 cursor-pointer transition hover:bg-slate-700 " + hover;
    return bouton;
}

export function creer_carte_effectif(player) {
    const style = styles_effectif[player.post];

    const carte = document.createElement("div");
    carte.className =
        " relative flex flex-col gap-5 rounded-xl border border-slate-700 border-l-4 " +
        "bg-slate-800/60 p-5 transition hover:-translate-y-1 hover:bg-slate-800 " +
        style.bordure;

    const cercle = document.createElement("div");
    cercle.className =
        "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 " +
        "text-xl font-bold " + style.cercle;
    cercle.textContent = player.number;

    const nom = document.createElement("strong");
    nom.className = "text-lg font-bold text-white";
    nom.textContent = player.name;

    const badge = document.createElement("span");
    badge.className = "w-fit rounded px-2 py-0.5 text-xs font-semibold " + style.badge;
    badge.textContent = style.court;
    const ages = document.createElement("div")
    let agg = document.createElement("p")
    agg.textContent = `Age: ${player.age} ans`
    ages.append(agg)
    const infos = document.createElement("div");
    infos.className = "flex flex-col gap-1";
    infos.append(nom, badge, ages);
    const haut = document.createElement("div");
    haut.className = "flex items-center gap-4";
    haut.append(cercle, infos);
    const bas = document.createElement("div");
    const all_crude = document.createElement("div")
    all_crude.className = "flex justify-end gap-2";
    bas.className = "flex place-content-between flex-wrap";
    const sitiation = document.createElement("div")
    const sitiation_afich = document.createElement("p")
    sitiation_afich.textContent = player.sitiations
    if (sitiation_afich.textContent === "En Forme") { sitiation_afich.classList.add("bg-green-500", "rounded-sm", "p-1") }
    else if (sitiation_afich.textContent === "Blessé") { sitiation_afich.classList.add("bg-red-500", "rounded-sm", "p-1") }

    sitiation.append(sitiation_afich)

    const btn_edit = document.createElement("button");
    btn_edit.type = "button";
    btn_edit.textContent = "✏️";
    btn_edit.classList.add("cursor-pointer");
    btn_edit.addEventListener("click", function () {
        ouvrir_modification(player);
    });
    const btn_remove = document.createElement("button");
    btn_remove.type = "button";
    btn_remove.innerHTML = '<i class="fa-solid fa-trash"></i>';
    btn_remove.classList.add("cursor-pointer", "hover:text-red-500", "transition-colors");
    btn_remove.addEventListener("click", function () {
        ouvrir_suppression(player, carte);
    });
    const capitan_ = document.createElement("button");
    capitan_.type = "button";
    capitan_.innerHTML = "C";
    capitan_.classList.add("cursor-pointer", "text-white", "bg-pink-500", "w-5.5", "rounded-sm", "transition-colors", "h-6", "mt-1");

    capitan_.addEventListener("click", function () {
        for (const p of list_of_players) {
            p.capitan = "";
        }
        player.capitan = "capitan";
        setitems(list_of_players);

        const rand = document.querySelector("#rand");
        rand.innerHTML = "";
        for (const p of list_of_players) {
            rand.append(creer_carte_effectif(p));
        }
    });

    all_crude.append(capitan_, btn_edit, btn_remove)
    bas.append(sitiation, all_crude)
    if (player.capitan === "capitan") {
        const badge_capitan = document.createElement("div");
        badge_capitan.className =
            "absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center " +
            "rounded-full bg-purple-500 text-white text-xs font-bold";
        carte.classList.add("border-t-purple-500", "border-b-purple-500", "border-r-purple-500", "border-4")

        badge_capitan.textContent = "C";
        carte.append(badge_capitan);
    }
    carte.append(haut, bas);
    return carte;
}

export function add() {
    const btnajouter = document.querySelectorAll(".ajout-btn");
    const formajout = document.querySelector("#ajout");
    const name_ = document.querySelector("#player");
    const number = document.querySelector("#numberofplayer");
    const age = document.querySelector("#age");
    const error_name = document.querySelector(".error-msg-name");
    const error_number = document.querySelector(".msg-number");
    const error_age = document.querySelector(".msg-age");
    const btn_sub = document.querySelector("#btn-submit");
    const boutons_post = document.querySelectorAll(".btn-post");
    const rand = document.querySelector("#rand");

    let post = "";

    btnajouter.forEach(function (btn) {
        btn.addEventListener("click", function () {
            formajout.toggleAttribute("hidden");
        });
    });

    boutons_post.forEach(function (btn) {
        btn.addEventListener("click", function () {
            boutons_post.forEach(function (b) {
                b.classList.remove(orange);
            });
            btn.classList.add(orange);
            post = btn.textContent.trim();
        });
    });
    btn_sitiations.forEach(function (btn) {
        btn.addEventListener("click", function () {
            btn_sitiations.forEach(function (b) {
                b.classList.remove("bg-green-400");
            });
            btn.classList.add("bg-green-400");
            sitiation = btn.textContent.trim();
        });
    });
    btn_sub.addEventListener("click", function (event) {
        event.preventDefault();

        const nom = name_.value.trim();
        const numero = Number(number.value);
        const age_joueur = Number(age.value);


        const nom_valide = regex_nom.test(nom);
        const numero_valide = regexofnumber.test(number.value);
        const age_valide = age_joueur >= 15 && age_joueur <= 50;

        let numero_utilise = false;
        for (let i = 0; i < list_of_players.length; i++) {
            if (list_of_players[i].number === numero) {
                numero_utilise = true;
            }
        }

        error_name.textContent = nom_valide ? "" : "Veuillez saisir un nom valide.";
        error_age.textContent = age_valide ? "" : "Âge invalide (15 à 50).";
        if (!sitiation) {
            msg_sitiation.classList.remove("hidden")
        }
        else {
            msg_sitiation.classList.add("hidden")
        }
        if (!numero_valide) {
            error_number.textContent = "Numéro invalide. Saisissez un numéro entre 1 et 99.";
        } else if (numero_utilise) {
            error_number.textContent = "Numéro déjà utilisé.";
        } else {
            error_number.textContent = "";
        }

        if (!nom_valide || !numero_valide || numero_utilise || !age_valide || post === "" || sitiation === "") {
            return;
        }

        const player = { name: nom, number: numero, post: post, age: age_joueur, sitiations: sitiation };

        list_of_players.push(player);
        setitems(list_of_players);
        rand.append(creer_carte_effectif(player));

        name_.value = "";
        number.value = "";
        age.value = "";
        post = "";
        boutons_post.forEach(function (b) {
            b.classList.remove(orange);
        });

        formajout.setAttribute("hidden", "");
        show_message(nom + " added successfully");
    });
}