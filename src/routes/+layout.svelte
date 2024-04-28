<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { navigate } from 'svelte-routing';
	import { addNote, categories, notes, deleteNote, addCategory, deleteCategory, updateCategory, findTagById } from '../stores/notes';
	import { Modal, getModalStore, Toast, getToastStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent, ModalStore, ToastSettings, ToastStore } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { get } from 'svelte/store';

	initializeStores();
			
	const modalStore = getModalStore();
	const toastStore = getToastStore();


	const addCategoryModal: ModalSettings = {
		type: 'prompt',
		// Data
		title: 'Add Category',
		body: 'Enter the name of the category you would like to add.',
		// Populates the input value and attributes
		value: 'Homework',
		valueAttr: { type: 'text', minlength: 3, maxlength: 10, required: true },
		// Returns the updated response value
		response: (r: string) => {
			const newCategory = {
				id: get(categories).length + 1,
				name: r,
			};
			categories.update((c) => [...c, newCategory]);
			const categoryAdded: ToastSettings = {
				message: 'Category added successfully.',
				timeout: 3000,
				background: 'bg-success-500',
			};
			toastStore.trigger(categoryAdded);
			console.log(categories);
		},
	};

	function handleEditCategory(catId: number) {
		const editCategoryModal: ModalSettings = {
			type: 'prompt',
			title: 'Edit Category',
			body: 'Enter the new name of the category.',
			value: get(categories).find((c) => c.id === catId)?.name || '',
			valueAttr: { type: 'text', minlength: 3, maxlength: 10, required: true },
			response: (r: string) => {
				const updatedCategory = {
					id: catId,
					name: r,
				};
				updateCategory(updatedCategory);
				const categoryUpdated: ToastSettings = {
					message: 'Category updated successfully.',
					timeout: 3000,
					background: 'bg-success-500',
				};
				toastStore.trigger(categoryUpdated);
			},
		};
		modalStore.trigger(editCategoryModal);
	}					

	let categoryOpened = false;
	let noteOpened = false;

	function toggleCategory() {
		categoryOpened = !categoryOpened;
	}

	function toggleNote() {
		noteOpened = !noteOpened;
	}

	function createNote() {
		const newNote = {
			id: Date.now(),
			title: 'New Note',
			contents: '',
			date: new Date().toISOString(),
			category: 0,
			colorCategory: 0,	
		};
		addNote(newNote);
		navigate(`/edit/${newNote.id}`);
	}

	function viewNote(noteId: number) {
		navigate(`/view/${noteId}`);
	}

	function handleDelete(noteId: number) {
			const confirmDelete: ModalSettings = {
			type: 'confirm',
			title: 'Delete Note',
			body: 'Are you sure you wish to proceed?',
			response: (r: boolean) => {
				if (r) {
					deleteNote(noteId);
					const noteDeleted: ToastSettings = {
						message: 'Note deleted successfully.',
						timeout: 3000,
						background: 'bg-success-500',
					};
					toastStore.trigger(noteDeleted);
				}
			},
		};
		modalStore.trigger(confirmDelete);
	}

</script>

<Toast />
<Modal />
<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 shadow-md w-80 p-4">

	<svelte:fragment slot="sidebarLeft">
		<nav class="list-nav p-0 w-full">
			<div class="flex grow flex-col gap-y-5 overflow-y-auto px-6">

				<div class="flex h-16 shrink-0 items-center">
					<div class="animate-pulse variant-soft-primary p-4 rounded-full">
						<img class="h-8 w-auto" src="/post-it.png" alt="Paper icons created by Pixel perfect - Flaticon">
					</div>
				</div>

				<div class="flex gap-2 justify-between">
					<button class="btn btn-sm variant-filled-primary font-bold grow" on:click={createNote}>
						<span class="material-symbols-outlined text-sm">
						add
						</span>
						Note
					</button><button class="btn btn-sm variant-filled-primary font-bold" on:click={() => modalStore.trigger(addCategoryModal)}>
						<span class="material-symbols-outlined text-sm">
						add
						</span> 
						Category
					</button>
				</div>

				<nav class="flex flex-1 flex-col">
				  <ul role="list" class="flex flex-1 flex-col gap-y-7">
					<li>
					  <ul role="list" class="-mx-2 space-y-1">
						<li>
						  <button class="block w-full rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold" on:click={() => navigate('/')}>Homepage</button>
						</li>
						<hr>
						<li>
						  <div>
							<button type="button" class="hover:bg-gray-50 flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold  " aria-controls="sub-menu-1" aria-expanded="false" on:click={toggleCategory}>
							  <svg class={categoryOpened ? `rotate-90 text-gray-500 h-5 w-5 shrink-0` : `text-gray-400 h-5 w-5 shrink-0`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
								<path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
							  </svg>
							  Categories
							</button>
							<ul class={categoryOpened ? `mt-1 pl-4 w-full` : `mt-1 pl-4 w-full hidden`} id="sub-menu-1">
								{#each $categories as category}
								<li class="flex items-center justify-between" id={`${category.id}`}>
									<p class="block rounded-none w-full border-l-2 border-secondary-500 py-2 pr-2 pl-9 text-sm leading-6">{category.name}</p>
									<div class="flex">
										<button class="btn btn-icon variant-filled-warning" on:click={() => handleEditCategory(category.id)}><span class="material-symbols-outlined">edit</span></button>
										<button class="btn btn-icon variant-filled-error" on:click={() => deleteCategory(category.id)}><span class="material-symbols-outlined">delete</span></button>
									</div>
								  </li>
								{/each}
								{#if $categories.length === 0}
									<li>
										<button class="block rounded-none w-full border-l-2 border-secondary-500 py-2 pr-2 pl-9 text-sm leading-6" disabled>No Categories Yet</button>
									</li>
								{/if}
							</ul>
						  </div>
						</li>
						<li>
						  <div>
							<button type="button" class="hover:bg-gray-50 flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold  " aria-controls="sub-menu-2" aria-expanded="false" on:click={toggleNote}>
							  <svg class={noteOpened ? `rotate-90 text-gray-500 h-5 w-5 shrink-0` : `text-gray-400 h-5 w-5 shrink-0`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
								<path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
							  </svg>
							  Notes
							</button>
							<ul class={noteOpened ? `mt-1 w-full` : `mt-1 w-full hidden`} id="sub-menu-2">
								{#each $notes as note}
								<li class="flex items-center justify-between pl-2 hover:cursor-pointer">
									<button class="p-0" on:click={() => viewNote(note.id)}>
										<div class="w-2 h-2 rounded-full" style="background-color: {findTagById(note.colorCategory)};"></div>
										<span class="line-clamp-1">{note.title}</span>
										<div class="flex">
											<button class="btn btn-icon rounded-full variant-filled-warning" on:click|stopPropagation={() => navigate(`/edit/${note.id}`)}><span class="material-symbols-outlined">edit</span></button>
											<button class="btn btn-icon rounded-full variant-filled-error" on:click={() => handleDelete(note.id)}><span class="material-symbols-outlined">delete</span></button>
										</div>
									</button>
								  </li>
								{/each}
								{#if $notes.length === 0}
									<li>
										<button class="hover:bg-gray-50 block w-full font-light border-l-2 border-primary-500 rounded-md py-2 pr-2 pl-2 text-sm leading-6" disabled><span class="line-clamp-1">No Notes Yet</span></button>
									</li>
								{/if}
							</ul>
						  </div>
						</li>
						<hr>
						<li>
								<select class="select variant-form-material my-2" name="" id="">
									<option value="" disabled selected>Filter:</option>
									{#each $categories as cat}
										<option value={cat.id}>{cat.name}</option>
									{/each}
								</select>
								
						</li>
					  </ul>
					</li>
				  </ul>
				</nav>
			  </div>			  
		</nav>
		<!-- --- -->
	</svelte:fragment>

	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">My Notes</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
				<p>Created by Mike Dahle</p>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://www.linkedin.com/in/mike-dahle-ab352022a/"
					target="_blank"
					rel="noreferrer"
				>
					My LinkedIn
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/Mike-Dahle"
					target="_blank"
					rel="noreferrer"
				>
					My GitHub
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
