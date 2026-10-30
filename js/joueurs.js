import {
    players,
    saveToStorage,
    LoadFromStorage,
    STORAGE_KEY
} from './stockage.js';

import {
    posteType
} from './initial_data.js';

import {
    EditModal,
} from './interface.js';

export const playerList = document.querySelector('.playerList')
export const zones = [];


export function createCard(playerInfo) {
    const container = document.createElement("div")
    container.classList.add("flex", "w-full", "min-h-10", "gap-20", "text-center", "border", "border-green-600", "mt-2")
    if (playerInfo.zone !== null) { container.classList.add("opacity-50") }

    const info_container = document.createElement("div")
    info_container.classList.add("flex", "gap-2", "align-center", "justify-between")

    const nbr_container = document.createElement("span")
    nbr_container.textContent = (playerInfo.number)
    nbr_container.classList.add("rounded-full", "border", "border-yellow-500", "text-center")

    const nomPost_container = document.createElement("div")
    nomPost_container.classList.add('flex', 'flex-col', "justify-center", "items-start")

    const nom_container = document.createElement("p")
    nom_container.classList.add('font-bold')
    nom_container.textContent = (playerInfo.name)

    const post_container = document.createElement("p")
    post_container.textContent = (playerInfo.post)

    const btn_mod = document.createElement("button")
    const btn_dlt = document.createElement("button")


    const img_modifier = document.createElement("img")
    img_modifier.src = "https://img.icons8.com/material-sharp/24/pencil--v2.png"


    const img_supprimer = document.createElement("img")
    img_supprimer.src = "https://img.icons8.com/material-rounded/24/waste.png"

    btn_mod.append(img_modifier)
    btn_dlt.append(img_supprimer)

    btn_mod.addEventListener('click', () => {
        editPlayer(playerInfo)
    })
    btn_dlt.addEventListener('click', () => {
        deletePlayer(playerInfo)
    })

    const select = createSelect(playerInfo)

    nomPost_container.append(nom_container, post_container, select)
    info_container.append(nbr_container, nomPost_container, btn_mod, btn_dlt)
    container.append(info_container)
    playerList.append(container)
}


export function editPlayer(player) {
    EditModal()
    editingId = player.id
    nom.value = player.name
    number.value = player.number
    const radio = document.querySelector('input[name="poste"][value="' + player.post + '"]')
    if (radio) radio.checked = true
    pop.classList.add('open-modal')
}

export function displayList() {
    playerList.innerHTML = ""
    players.forEach(player => { createCard(player) })
}

export function displayTerrain() {
    zones.forEach(zone => {
        const player = players.find(p => p.zone === zone.id)
        zone.cell.textContent = ""
        if (player) {
            const num = document.createElement("p")
            num.textContent = player.number
            const nm = document.createElement("p")
            nm.classList.add("text-xs", "font-normal")
            nm.textContent = player.name
            zone.cell.append(num, nm)
        } else {
            zone.cell.textContent = zone.label
        }
    })
}
export function updateCounters() {
    const compteur = document.querySelector('.compteur')
    
    compteur.textContent = `${players.length} joueur(s)`
    // const placed = players.filter(p => p.zone !== null).length
    // placedCounter.textContent = "Joueurs placés : " + placed + " / 11"
}

export function deletePlayer(player) {
    const index = players.indexOf(player)
    players.splice(index, 1)

    saveToStorage();
    displayList();
    displayTerrain();
    updateCounters();
}




