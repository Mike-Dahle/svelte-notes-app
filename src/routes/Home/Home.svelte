<script lang="ts">
	import { navigate } from 'svelte-routing';
	import { addNote } from '../../stores/notes';

    function createNote() {
		const newNote = {
			id: Date.now(),
			title: 'New Note',
			contents: '',
			date: new Date().toISOString(),
			category: 0,
			colorCategory: 0	
		};
		addNote(newNote);
		navigate(`/edit/${newNote.id}`);
	}
</script>

<div class="flex flex-col items-center justify-center relative">
    <div class="card shadow-md p-4 mt-16 flex flex-col items-center gap-2 z-10">
        <h1 class="h1">Svelte Notes</h1>
        <p>Simple note taking app built with Svelte <a href="https://github.com/Mike-Dahle" target="_blank" class="anchor">by Mike Dahle</a></p>
        <button class="btn btn-sm variant-filled-primary font-bold"on:click={createNote} type='button'>
            <span class="material-symbols-outlined text-sm">
            add
            </span> 
            New Note
        </button>
    </div>
<!--     <div class="w-full absolute top-0 left-0">
        <script type="module" src="https://unpkg.com/@splinetool/viewer@1.0.99/build/spline-viewer.js"></script>
        <spline-viewer url="https://prod.spline.design/xD0QBiCcWQ15oHgc/scene.splinecode"></spline-viewer>
    </div> -->
</div>