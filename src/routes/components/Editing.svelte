<script lang='ts'>
    import { onMount, onDestroy } from 'svelte';
    import { navigate } from 'svelte-routing';
    import { findNoteById, updateNote, categories} from '../../stores/notes';
    import type { Note } from '../../stores/notes';

    export let id: string;

    let note: Note | null = null;
    let title = '';
    let contents = '';
    let category: number
    let colorCategory = '';

    const unsubscribe = findNoteById(+id).subscribe(foundNote => {
        note = foundNote;
        if (note !== null) {
            title = note.title;
            contents = note.contents;
            category = note.category;
            colorCategory = note.colorCategory;
        }
    });

    onDestroy(() => {
        unsubscribe();
    });

    function goBack() {
        navigate('/');
    }

    function save() {
        if (note !== null) {
            updateNote({
                ...note,
                title,
                contents,
                category,
                colorCategory
            });
        }
        navigate('/');
        console.log(note);
    }

    function handleReset() {
        if (note !== null) {
            note.colorCategory = '#ffffff';
        }
    }

    $: currentCat = note !== null ? $categories.find(cat => cat.id === note?.category)?.name : '';
</script>

{#if note !== null}
<div class="flex flex-col p-6 w-3/4 max-w-[1240px] mx-auto">
    <h1 class="h1">
        Editing {title}
    </h1>

    <form on:submit|preventDefault={save} class="form variant-outline-surface shadow-md p-4 flex flex-col gap-4 mt-6">
        <section class="flex items-center gap-2">
            <label class="w-3/4" for="name"> Title:
                <input
                    class="input variant-form-material"
                    id="name"
                    type="text"
                    bind:value={title}
                />
            </label>
            <label for="color">
                Tag:
                <div class="grid grid-cols-[auto_1fr] gap-2">
                    <input class="input" name="color" type="color" bind:value={colorCategory} />
                    <input class="input variant-form-material" name="color" type="text" bind:value={colorCategory} readonly tabindex="-1" />
                </div>
            </label>
            <button class="flex items-center justify-center pt-6" on:click={handleReset}>
                <span class="material-symbols-outlined">
                    restart_alt
                </span>
            </button>
            <label for="category"> Category:
                <select class="input" name="category" id="category" bind:value={category}>
                    <option value={note.category} selected disabled>{currentCat}</option>
                    {#each $categories as cat}
                        <option value={cat.id}>{cat.name}</option>
                    {/each}
                </select>
            </label>            
        </section>
        <section>
            <label for="content">
                Content:
                <textarea
                    class="textarea variant-form-material"
                    id="content"
                    rows="10"
                    bind:value={contents}
                />
            </label>
        </section>
        <div class="w-full flex items-center justify-end">
            <button class="btn variant-filled" type="submit">
                Save Note
            </button>
        </div>
    </form>
</div>
{:else}
    <div class="flex flex-col items-center justify-center relative">
        <div class="card shadow-md p-4 mt-16 flex flex-col items-center gap-2 z-10">
            <h1 class="h1">No Notes 🥲</h1>
            <p>To create a note click the <b>"+ Note"</b> button.</p>
        </div>
    </div>
{/if}
