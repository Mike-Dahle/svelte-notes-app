import { writable } from 'svelte/store';

interface Note {
    id: number;
    title: string;
    contents: string;
    date: string;
    category: string;
    colorCategory: string;
}

const localStorageAvailable = typeof localStorage !== 'undefined';

const initialNotes: Note[] = localStorageAvailable ? JSON.parse(localStorage.getItem('notes') || '[]') : [];
export const notes = writable(initialNotes);

function saveNotes(notesData: Note[]) {
    if (localStorageAvailable) {
        localStorage.setItem('notes', JSON.stringify(notesData));
    }
}

export function addNote(newNote: Note) {
    notes.update(notesData => {
        const updatedNotes = [...notesData, newNote];
        saveNotes(updatedNotes);
        return updatedNotes;
    });
}

export function updateNote(updatedNote: Note) {
    notes.update(notesData => {
        const updatedNotes = notesData.map(note => (note.id === updatedNote.id ? updatedNote : note));
        saveNotes(updatedNotes);
        return updatedNotes;
    });
}

export function deleteNote(noteId: number) {
    notes.update(notesData => {
        const updatedNotes = notesData.filter(note => note.id !== noteId);
        saveNotes(updatedNotes);
        return updatedNotes;
    });
}
