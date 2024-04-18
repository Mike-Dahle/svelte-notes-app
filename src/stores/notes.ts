import { writable } from "svelte/store"

interface Note {
    id: number
    title: string
    contents: string
    date: string
    category: string
    color: string
}

export interface Notes {
    contents: Note[]
}

export const DEFAULT_NOTE = {
    contents: [] as Note[],
}

const notes = writable<Notes>(DEFAULT_NOTE, (set) => {
    const savedNotes = (() => {
        const localStorageNotes = localStorage.getItem("notes");

        if (!localStorageNotes) {
            return DEFAULT_NOTE;
        }
        try {
            return JSON.parse(localStorageNotes)
        } catch {
            console.log("Error parsing notes from local storage");
            localStorage.setItem("notes", JSON.stringify(DEFAULT_NOTE));
            return DEFAULT_NOTE;
        }
    })();
    
    set(savedNotes)
})

notes.subscribe((value) => {
    localStorage.setItem("notes", JSON.stringify(value));
})

export default notes;