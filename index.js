//buttons ajouter,modal(annuler,x)

const ajoutModal = document.querySelector('#ajouterBtn')
const pop = document.querySelector('#modal')
const annuler = document.querySelector('.btn-annuler')
const croix = document.querySelector('.btn-croix')
const placedCounter = document.querySelector('#placedCounter')
const compteur = document.querySelector('.compteur')
const modalTitle = document.querySelector('#modal h5')
const submitBtn = document.querySelector('.btn-ajouter')
let editingId = null


ajoutModal.addEventListener('click', () => {
    pop.classList.add('open-modal')
})

croix.addEventListener('click', () => {
    pop.classList.remove('open-modal')
})

annuler.addEventListener('click', () => {
    pop.classList.remove('open-modal')
})


//players list
const playerList = document.querySelector('.playerList')
const nom = document.querySelector('#name')
const number = document.querySelector('#num')


nom.addEventListener('input', validateName)
number.addEventListener('input', validateNbr)

const form = document.querySelector('form')
const err_form = document.querySelector('#err_form')
const players = [];

const zones = [];
const STORAGE_KEY='tachkila_players'

const posteType = {
    GB: 'gardien',
    DG: 'defenseur', DC: 'defenseur', DD: 'defenseur',
    MG: 'milieu', MC: 'milieu', MD: 'milieu',
    BU: 'Attaquant'
}

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const posts = document.querySelectorAll('input[name="poste"]')

    let playerPost;
    for (const post of posts) {
        if (post.checked) {
            playerPost = post.value;
            break;
        }
    }


    const errPost = document.querySelector('#errpost')
    if (!playerPost) {
        errPost.textContent = "Il faut sélectionner un poste";
        errPost.className = "mssg text-red-600 text-xs";
        return;
    } else {
        errPost.textContent = "";
    }


    validateName();
    validateNbr();


    err_form.textContent = "";
    const messages = document.querySelectorAll('.mssg')
    let hasError = false;
    messages.forEach(mssg => {
        if (mssg.textContent.trim() !== "") {
            hasError = true;
        }
    });

    if (hasError) {
        err_form.textContent = "Veuillez corriger les erreurs avant d'ajouter.";
        err_form.className = "mssg text-red-600 mt-2 text-xs";
        return;
    }

    if (editingId !== null) {
        const player = players.find(p => p.id === editingId)
        if (player.post !== playerPost && player.zone !== null) {
            player.zone = null
        }
        player.name = nom.value
        player.post = playerPost
        player.number = number.value
        saveToStorage();
        displayList();
        displayTerrain();
        updateCounters();
        EditModal();
        pop.classList.remove('open-modal');
        return;
    }


    const playerInfo = {
        id: Date.now(),
        name: nom.value,
        post: playerPost,
        number: number.value,
        zone: null
    }

    players.push(playerInfo);

    saveToStorage();
    displayList();
    displayTerrain();
    updateCounters();
    // compteur.textContent = `${players.length} joueur(s)`;

    form.reset();
    pop.classList.remove('open-modal');
})


function validateName() {
    const mssg_err = document.querySelector('#errName')
    const nm = nom.value.trim()

    if (nm === "") {
        mssg_err.textContent = "le champ ne peut pas etre vide  ";
        mssg_err.className="mssg text-red-600 text-xs"
    } else if (!/^[A-Za-z]{3,}$/.test(nm)) {
        mssg_err.textContent = 'il faut saisi au moins 3 lettre alphabetique';
        mssg_err.className="mssg text-red-600 text-xs"
    } else {
        mssg_err.textContent = '';

    }
}

function validateNbr() {
    const mssg_err = document.querySelector('#errNb')
    const nbr = number.value.trim()
    if (nbr === "") {
        mssg_err.textContent = "le champ ne peut pas etre vide";
        mssg_err.className="mssg text-red-600 text-xs"
    } else if (!/^(0?[1-9]|[1-9][0-9])$/.test(nbr)) {
        mssg_err.textContent = "le nombre doit etre entre 1 et 99"
        mssg_err.className="mssg text-red-600 text-xs"
    } else if (players.some(p => Number(p.number) === Number(nbr))) {
        mssg_err.textContent = "ce numero est deja utilise"
        mssg_err.className = "mssg text-red-600 text-xs"
    } else { mssg_err.textContent = ''; }
}



function saveToStorage(){
    localStorage.setItem(STORAGE_KEY,JSON.stringify(players))
}

function LoadFromStorage(){
    const saved=localStorage.getItem(STORAGE_KEY)
    if(saved){
        const list=JSON.parse(saved)
        list.forEach(p=>players.push(p))
    }
}

function EditModal() {
    editingId = null
    form.reset()
    document.querySelectorAll('.mssg').forEach(m => { m.textContent = "" })
    modalTitle.textContent = "Ajouter Un joueur"
    submitBtn.textContent = "Ajouter"
}

function editPlayer(player) {
    EditModal()
    editingId = player.id
    nom.value = player.name
    number.value = player.number
    const radio = document.querySelector('input[name="poste"][value="' + player.post + '"]')
    if (radio) radio.checked = true
    pop.classList.add('open-modal')
}

function deletePlayer(player) {
    const index = players.indexOf(player)
    players.splice(index, 1)

    saveToStorage();
    displayList();
    displayTerrain();
    updateCounters();
}


function placePlayer(player, value) {
    if (value === "") {
        player.zone = null

        saveToStorage();
        displayList();
        displayTerrain();
        updateCounters();
        return
    }
    const zoneId = Number(value)
    const zone = zones[zoneId]

    if (zone.poste !== player.post || players.some(p => p.zone === zoneId && p.id !== player.id)) {

        saveToStorage();
        displayList();
        displayTerrain();
        updateCounters();
        return
    }

    player.zone = zoneId

    saveToStorage();
    displayList();
    displayTerrain();
    updateCounters();
}


function createSelect(player) {
    const select = document.createElement("select")
    select.classList.add("bg-slate-700", "text-xs", "rounded", "mt-1", "cursor-pointer")

    const optBanc = document.createElement("option")
    optBanc.value = ""
    optBanc.textContent = "Sur le banc"
    select.append(optBanc)

    zones.forEach(zone => {
        if (zone.poste === player.post) {
            const opt = document.createElement("option")
            opt.value = zone.id
            opt.textContent = zone.name
            if (players.some(p => p.zone === zone.id && p.id !== player.id)) {
                opt.disabled = true
                opt.textContent = zone.name + " (occupée)"
            }
            select.append(opt)
        }
    })

    select.value = player.zone === null ? "" : String(player.zone)
    select.addEventListener("change", () => { placePlayer(player, select.value) })
    return select
}


function createCard(playerInfo) {
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



function displayList() {
    playerList.innerHTML = ""
    players.forEach(player => { createCard(player) })
}

function displayTerrain() {
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
function updateCounters() {
    compteur.textContent = `${players.length} joueur(s)`
    // const placed = players.filter(p => p.zone !== null).length
    // placedCounter.textContent = "Joueurs placés : " + placed + " / 11"
}

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.terrain')
    cells.forEach(cell => {
        const label = cell.textContent.trim()
        if (label !== "") {
            zones.push({
                id: zones.length,
                label: label,
                name: label,
                poste: posteType[label],
                cell: cell
            })
        }
    })

    zones.forEach(zone => {
        const memes = zones.filter(z => z.label === zone.label)
        if (memes.length > 1) { zone.name = zone.label + " " + (memes.indexOf(zone) + 1) }
    })

    LoadFromStorage()
    saveToStorage();
    displayList();
    displayTerrain();
    updateCounters();
})
