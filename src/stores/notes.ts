import { writable, readable, get } from 'svelte/store';

export interface Note {
    id: number;
    title: string;
    contents: any;
    date: string;
    category: number;
    colorCategory: number;
}

export interface Category {
    id: number;
    name: string;  
}

export interface Tag {
    id: number;
    color: string;
}

const initialNotes: Note[] = [];
export const notes = writable(initialNotes);

const initialCategories: Category[] = [
    { id: 0, name: 'Uncategorized'},
    { id: 1, name: 'Personal' },
    { id: 2, name: 'Work' },
    { id: 3, name: 'Ideas' },
    { id: 4, name: 'Todos' }
];
export const categories = writable(initialCategories);

const initialTags: Tag[] = [
    { id: 0, color: '#ffffff' },
    { id: 1, color: '#d10000' },
    { id: 2, color: '#ff6622' },
    { id: 3, color: '#ffda21' },
    { id: 4, color: '#33dd00' },
    { id: 5, color: '#1133cc' },
    { id: 6, color: '#220066' },
    { id: 7, color: '#330044' }
];

export const tags = writable(initialTags);

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

export function filterNotes(category: number, date: string) {
   //filter by category or date

}

export function addCategory(newCategory: Category) {
    categories.update(categoriesData => [...categoriesData, { ...newCategory }]);
}

export function updateCategory(updatedCategory: Category) {
    categories.update(categoriesData => {
        const index = categoriesData.findIndex(category => category.id === updatedCategory.id);
        if (index !== -1) {
            const updatedCategories = [...categoriesData];
            updatedCategories[index] = updatedCategory;
            return updatedCategories;
        }
        return categoriesData;
    });
}

export function deleteCategory(categoryId: number) {
    categories.update(categoriesData => {
        return categoriesData.filter(category => category.id !== categoryId);
    });
}

export function addTag() {
    tags.update(tagsData => [...tagsData, { id: tagsData.length, color: "#ffffff"}]);
}

export function updateTag(updatedTag: Tag) {
    tags.update(tagsData => {
        const index = tagsData.findIndex(tag => tag.id === updatedTag.id);
        if (index !== -1) {
            const updatedTags = [...tagsData];
            updatedTags[index] = updatedTag;
            return updatedTags;
        }
        return tagsData;
    });
}

export function deleteTag(tagId: number) {
    tags.update(tagsData => {
        return tagsData.filter(tag => tag.id !== tagId);
    });
}

export function findTagById(tagId: number): string | null {
    const tagsData = get(tags);
    const foundTag = tagsData.find(tag => tag.id === tagId);
    return foundTag ? foundTag.color : null;
}