export const players = [];
export const STORAGE_KEY='tachkila_players'

export function saveToStorage(){
    localStorage.setItem(STORAGE_KEY,JSON.stringify(players))
}

export function LoadFromStorage(){
    const saved=localStorage.getItem(STORAGE_KEY)
    if(saved){
        const list=JSON.parse(saved)
        list.forEach(p=>players.push(p))
    }
}