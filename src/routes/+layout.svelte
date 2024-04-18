<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { navigate, Link } from 'svelte-routing';

	let categoryOpened = false;
	let noteOpened = false;

	function toggleCategory() {
		categoryOpened = !categoryOpened;
	}

	function toggleNote() {
		noteOpened = !noteOpened;
	}



</script>

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 w-64 p-4">

	<svelte:fragment slot="sidebarLeft">
		<!-- Insert the list: -->
		<nav class="list-nav p-0 w-64">
			<div class="flex grow flex-col gap-y-5 overflow-y-auto border-r px-6">

				<div class="flex h-16 shrink-0 items-center">
					<div class="animate-pulse variant-soft-primary p-4 rounded-full">
						<img class="h-8 w-auto" src="post-it.png" alt="Paper icons created by Pixel perfect - Flaticon">
					</div>
				</div>

				<div class="flex gap-2 justify-between">
					<button class="btn btn-sm variant-filled-primary font-bold grow">
						<span class="material-symbols-outlined text-sm">
						add
						</span>
						Note
					</button><button class="btn btn-sm variant-filled-primary font-bold">
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
						  <!-- Current: "bg-gray-50", Default: "hover:bg-gray-50" -->
						  <button class="block w-full rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold  ">Homepage</button>
						</li>
						<hr>
						<li>
						  <div>
							<button type="button" class="hover:bg-gray-50 flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold  " aria-controls="sub-menu-1" aria-expanded="false" on:click={toggleCategory}>
							  <!-- Expanded: "rotate-90 text-gray-500", Collapsed: "text-gray-400" -->
							  <svg class={categoryOpened ? `rotate-90 text-gray-500 h-5 w-5 shrink-0` : `text-gray-400 h-5 w-5 shrink-0`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
								<path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
							  </svg>
							  Categories
							</button>
							<!-- Expandable link section, show/hide based on state. -->
							<ul class={categoryOpened ? `mt-1 pl-4 w-full` : `mt-1 pl-4 w-full hidden`} id="sub-menu-1">
							  <li class="flex items-center justify-between">
								<p class="block rounded-none w-full border-l-2 border-secondary-500 py-2 pr-2 pl-9 text-sm leading-6  ">Personal</p>
								<div class="flex">
									<button class="btn btn-icon variant-filled-warning"><span class="material-symbols-outlined">edit</span></button>
									<button class="btn btn-icon variant-filled-error"><span class="material-symbols-outlined">delete</span></button>
								</div>
							  </li>
							</ul>
						  </div>
						</li>
						<li>
						  <div>
							<button type="button" class="hover:bg-gray-50 flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold  " aria-controls="sub-menu-2" aria-expanded="false" on:click={toggleNote}>
							  <!-- Expanded: "rotate-90 text-gray-500", Collapsed: "text-gray-400" -->
							  <svg class={noteOpened ? `rotate-90 text-gray-500 h-5 w-5 shrink-0` : `text-gray-400 h-5 w-5 shrink-0`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
								<path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
							  </svg>
							  Notes
							</button>
							<!-- Expandable link section, show/hide based on state. -->
							<ul class={noteOpened ? `mt-1 pl-4 w-full` : `mt-1 pl-4 w-full hidden`} id="sub-menu-2">
							  <li class="flex items-center justify-between">
								<button class="hover:bg-gray-50 block w-full font-bold border-l-2 border-primary-500 rounded-md py-2 pr-2 pl-9 text-sm leading-6"><span class="line-clamp-1">My note is so awesome and cool and stuff.</span></button>
								<div class="flex">
									<button class="btn btn-icon rounded-full variant-filled-warning"><span class="material-symbols-outlined">edit</span></button>
									<button class="btn btn-icon rounded-full variant-filled-error"><span class="material-symbols-outlined">delete</span></button>
								</div>
							  </li>
							</ul>
						  </div>
						</li>
						<hr>
						<li>
						  <select class="select variant-form-material my-2" name="" id="">
							<option value="" disabled selected>Filter By:</option>
							<option value="1">Personal</option>
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
