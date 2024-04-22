import { writable, readable } from 'svelte/store';

export interface Note {
    id: number;
    title: string;
    contents: string;
    date: string;
    category: string;
    colorCategory: string;
}

export interface Category {
    id: number;
    name: string;  
}

const initialNotes: Note[] = [];
export const notes = writable(initialNotes);

export function addNote(newNote: Note) {
    notes.update(notesData => [...notesData, { ...newNote }]);
}

export function updateNote(updatedNote: Note) {
    notes.update(notesData => {
        const index = notesData.findIndex(note => note.id === updatedNote.id);
        if (index !== -1) {
            const updatedNotes = [...notesData];
            updatedNotes[index] = updatedNote;
            return updatedNotes;
        }
        return notesData;
    });
}

export function deleteNote(noteId: number) {
    notes.update(notesData => {
        return notesData.filter(note => note.id !== noteId);
    });
}

export function findNoteById(noteId: number) {
    return readable<Note | null>(null, set => {
        const unsubscribe = notes.subscribe(notesData => {
            const foundNote = notesData.find(note => note.id === noteId);
            set(foundNote || null);
        });
        return unsubscribe;
    });
}
