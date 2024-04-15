<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';

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
<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">

	<svelte:fragment slot="sidebarLeft">
		<!-- Insert the list: -->
		<nav class="list-nav p-0 w-96">
			<div class="flex grow flex-col gap-y-5 overflow-y-auto border-r px-6">

				<div class="flex h-16 shrink-0 items-center">
					<div class="animate-pulse variant-soft-primary p-4 rounded-full">
						<img class="h-8 w-auto" src="post-it.png" alt="Paper icons created by Pixel perfect - Flaticon">
					</div>
				</div>

				<nav class="flex flex-1 flex-col">
				  <ul role="list" class="flex flex-1 flex-col gap-y-7">
					<li>
					  <ul role="list" class="-mx-2 space-y-1">
						<li>
						  <!-- Current: "bg-gray-50", Default: "hover:bg-gray-50" -->
						  <a href="#" class="block rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold  ">Homepage</a>
						</li>
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
							<ul class={categoryOpened ? `mt-1 pl-4` : `mt-1 pl-4 hidden`} id="sub-menu-1">
							  <li>
								<a href="#" class="hover:bg-gray-50 block border-l-2 border-primary-500 rounded-md py-2 pr-2 pl-9 text-sm leading-6  ">Personal</a>
							  </li>
							  <li>
								<a href="#" class="hover:bg-gray-50 block border-l-2 border-primary-500 rounded-md py-2 pr-2 pl-9 text-sm leading-6  ">Journaling</a>
							  </li>
							  <li>
								<a href="#" class="hover:bg-gray-50 block border-l-2 border-primary-500 rounded-md py-2 pr-2 pl-9 text-sm leading-6  ">Todo</a>
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
							<ul class={noteOpened ? `mt-1 pl-4` : `mt-1 pl-4 hidden`} id="sub-menu-2">
							  <li>
								<a href="#" class="hover:bg-gray-50 block border-l-2 border-primary-500 rounded-md py-2 pr-2 pl-9 text-sm leading-6  ">Herro</a>
							  </li>
							  <li>
								<a href="#" class="hover:bg-gray-50 block border-l-2 border-primary-500 rounded-md py-2 pr-2 pl-9 text-sm leading-6  ">Reeeeee</a>
							  </li>
							  <li>
								<a href="#" class="hover:bg-gray-50 block border-l-2 border-primary-500 rounded-md py-2 pr-2 pl-9 text-sm leading-6  ">Nononono</a>
							  </li>
							  <li>
								<a href="#" class="hover:bg-gray-50 block border-l-2 border-primary-500 rounded-md py-2 pr-2 pl-9 text-sm leading-6  ">Thank YOu</a>
							  </li>
							</ul>
						  </div>
						</li>
						<li>
						  <a href="#" class="hover:bg-gray-50 block rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold  ">Delete</a>
						</li>
						<li>
						  <a href="#" class="hover:bg-gray-50 block rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold  ">Edit</a>
						</li>
						<li>
						  <a href="#" class="hover:bg-gray-50 block rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold  ">SOmething</a>
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
