import {
    list_of_players,
    setitems,
    regexofnumber,
    regex_nom,
} from "./data.js";


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
const gray = "bg-slate-600";

for (let i = 0; i < close_edit_buttons.length; i++) {
    close_edit_buttons[i].addEventListener("click", function () {
        edit_modal.hidden=true;
    });
}
//edt post click botton color
for (let i = 0; i < edit_post_buttons.length; i++) {
    edit_post_buttons[i].addEventListener("click", function () {
        for (let j = 0; j < edit_post_buttons.length; j++) {
            edit_post_buttons[j].classList.remove(gray);
        }
        edit_post_buttons[i].classList.add(gray);
        post_edit = edit_post_buttons[i].textContent.trim();
    });
}
//mssg of removed ,added,edited succseefully 
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

//delete a card ... ive read it
function ouvrir_suppression(player, carte) {
    const modal = document.querySelector("#modal-delete");

    document.querySelector("#delete-message").textContent = "Voulez-vous supprimer " + player.name + " ?";
    modal.hidden=false;

    document.querySelector("#cancel-delete").onclick = () =>{
        modal.hidden=true;
    };

    document.querySelector("#confirm-delete").onclick = ()=> {
        
        const index = list_of_players.indexOf(player);
        list_of_players.splice(index, 1);

        carte.remove();
        setitems(list_of_players);
     
        modal.hidden=true;
        show_message(player.name + " removed successfully");
    };
}

bt_sitiation_edit.forEach(btn=> {
    btn.addEventListener("click",  ()=> {
        bt_sitiation_edit.forEach(b=> {
            b.classList.remove("bg-green-700");
        });
        btn.classList.add("bg-green-700");
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

    bt_sitiation_edit.forEach(btn=> {  
        btn.classList.remove("bg-green-700");

        if (btn.textContent.trim() === player.sitiations) {
            btn.classList.add("bg-green-700");
        }
    });

    edit_error_name.textContent = "";
    edit_error_number.textContent = "";
    edit_error_age.textContent = "";
     //color of post buttons
    for (let i = 0; i < edit_post_buttons.length; i++) {
        edit_post_buttons[i].classList.remove(gray);

        if (edit_post_buttons[i].textContent.trim() === player.post) {
            edit_post_buttons[i].classList.add(gray);
        }
    }
    edit_modal.hidden=false;
}

edit_submit.addEventListener("click",  () =>{
    if (!joueur_en_modification) {
        return;
    }

    const nom = edit_name.value.trim();
    const numero = Number(edit_number.value);

    const age_joueur = Number(edit_age.value);
    const age_valide = age_joueur >= 15 && age_joueur <= 55;


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


export function creer_carte_effectif(player) {
    const style = styles_effectif[player.post];

    const carte = document.createElement("div");
    carte.className =
        " relative flex flex-col gap-5 rounded-xl border border-slate-700 border-l-4 "  
        +style.bordure;

    const cercle = document.createElement("div");
    cercle.className =
        "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 " +
        "text-xl font-bold " 
        + style.cercle;

    cercle.textContent = player.number;

    const nom = document.createElement("strong");
    nom.className = "text-lg font-bold text-white";
    nom.textContent = player.name;

    const badge = document.createElement("span");
    badge.className = "w-fit rounded px-2 py-0.5 text-xs font-semibold "
     + style.badge;
    badge.textContent = style.court;

    const ages = document.createElement("div")
    let agg = document.createElement("p")
    agg.textContent = `Age: ${player.age} ans`
    agg.classList.add("text-white")
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
    if (sitiation_afich.textContent === "En Forme") { sitiation_afich.classList.add("bg-green-400", "rounded-sm","ml-2") }
    else if (sitiation_afich.textContent === "Blessé") { sitiation_afich.classList.add("bg-red-400", "rounded-sm","ml-2") }

    sitiation.append(sitiation_afich)

    const btn_edit = document.createElement("button");
    btn_edit.type = "button";
    btn_edit.textContent = "✏️";
    btn_edit.classList.add("cursor-pointer");
    btn_edit.addEventListener("click",  () =>{
        ouvrir_modification(player);
    });
    const btn_remove = document.createElement("button");
    btn_remove.type = "button";
    btn_remove.innerHTML = '<i class="fa-solid fa-trash"></i>';
    btn_remove.classList.add("cursor-pointer");
    btn_remove.addEventListener("click",  ()=> {
        ouvrir_suppression(player, carte);
    });


    const capitan_ = document.createElement("button");
    capitan_.type = "button";
    capitan_.innerHTML = "C";
    capitan_.classList.add("cursor-pointer", "text-white", "bg-orange-300", "w-5.5", "rounded-sm", "transition-colors", "h-6", "mt-1");

    

    all_crude.append(capitan_, btn_edit, btn_remove)
    bas.append(sitiation, all_crude)
    
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
                b.classList.remove(gray);
            });
            btn.classList.add(gray);
            post = btn.textContent.trim();
        });
    });
    btn_sitiations.forEach(function (btn) {
        btn.addEventListener("click", function () {
            btn_sitiations.forEach(function (b) {
                b.classList.remove("bg-green-700");
            });
            btn.classList.add("bg-green-700");
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
            b.classList.remove(gray);
        });

        formajout.setAttribute("hidden", "");
        show_message(nom + " added successfully");
    });
}