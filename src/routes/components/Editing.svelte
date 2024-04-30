<script lang='ts'>
    import { onMount, onDestroy } from 'svelte';
    import { navigate } from 'svelte-routing';
    import { findNoteById, updateNote, categories, tags, findTagById, deleteTag, addTag } from '../../stores/notes';
    import type { Note } from '../../stores/notes';
    import { marked } from 'marked';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

    export let id: string;

    let note: Note | null = null;
    let title = '';
    let contents = '';
    let category: number
    let colorCategory: number

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

    async function save() {
        if (note !== null) {
            contents = await marked(contents);
            
            updateNote({
                ...note,
                title,
                contents,
                category,
                colorCategory
            });
        }
        navigate('/');
    }

    let tagsVisible = false;

    const showTags = () => {
        tagsVisible = !tagsVisible;
    }

    const updateTag = (tagId: number) => {
        colorCategory = tagId;
        showTags();
    }
  
    $: currentTag = note !== null ? $tags.find(tag => tag.id === note?.colorCategory)?.color : '';
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
            <label for="tags" class="pt-4">
                Tag:
                <div id="tags" class="p-2 relative">
                    <button class="btn btn-icon btn-icon-sm variant-filled" style="background-color: {currentTag}" type="button" on:click={showTags}></button>
                        <ul class={`absolute top-15 left-0 rounded-md variant-filled-tertiary p-2 ${tagsVisible ? 'block' : 'hidden'}`}>
                            {#each $tags as tag}
                                <li class="w-full flex items-center justify-center gap-4 mb-2">
                                    <input class="input" type="color" bind:value={tag.color} />
                                    <button on:click|stopPropagation={() => updateTag(tag.id)} class="btn btn-icon btn-icon-sm" type="button">
                                        <span class="material-symbols-outlined hover:text-green-400">check_circle</span>
                                    </button>
                                    <button type="button" on:click|stopPropagation={() => deleteTag(tag.id)} class="btn btn-icon btn-icon-sm"><span class="material-symbols-outlined hover:text-red-400">delete</span></button>
                                </li>
                            {/each}
                            <li class="w-full flex items-center justify-center">
                                <button class="btn btn-icon btn-icon-sm variant-filled" type="button" on:click|stopPropagation={() => addTag()}>
                                    <span class="material-symbols-outlined">add</span>
                                </button>
                            </li>
                        </ul>
                    
                </div>
            </label>
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
