export let editingId = null

export function initModal() {
    const ajoutModal = document.querySelector('#ajouterBtn')
    const pop = document.querySelector('#modal')
    const annuler = document.querySelector('.btn-annuler')
    const croix = document.querySelector('.btn-croix')

    if (ajoutModal) {
        ajoutModal.addEventListener('click', () => {
            pop.classList.add('open-modal')
        })
    }

    if (croix) {
        croix.addEventListener('click', () => {
            pop.classList.remove('open-modal')
        })
    }

    if (annuler) {
        annuler.addEventListener('click', () => {
            pop.classList.remove('open-modal')
        })
    }

}

export function EditModal() {
    const modalTitle = document.querySelector('#modal h5')
    const submitBtn = document.querySelector('.btn-ajouter')
    editingId = null
    form.reset()
    document.querySelectorAll('.mssg').forEach(m => { m.textContent = "" })
    modalTitle.textContent = "Ajouter Un joueur"
    submitBtn.textContent = "Ajouter"
}

