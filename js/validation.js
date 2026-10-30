

export function validateName() {
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

export function validateNbr() {
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