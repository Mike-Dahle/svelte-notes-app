# Svelte Notes app by Mike Dahle

### Welcome to my notes app built with Sveltekit!

The point of this app is to allow users to create and organize notes. 

Requirements for this app are as follows:
1. Allow users to create new notes with a title and content.
2. Users can edit the title and content of existing notes.
3. Users can delete unwanted notes.
4. Users can create text categories.
5. Users can assign notes to specific categories.
6. User can view notes
7. Allow users to edit categories
8. Allow users to delete categories
9. User can filter notes by date
10. User can mark notes with custom color tag
11. User can create new color tags
12. User can Edit tag
13. User can Delete tag
14. User Can filter notes by category
15. Markdown support

## Tech stack

- [SvelteKit](https://svelte.dev)
- [Skeleton](https://www.skeleton.dev)
- [Tailwind](https://tailwindcss.com)
- [Typescript](https://www.typescriptlang.org)
- [Marked](https://www.npmjs.com/package/marked)

If you would like to make your own project with the same tech-stack, the easies way is to use this CLI

```bash

npm create skeleton-app@latest my-skeleton-app
#	- Enable Typescript when prompted (recommended)
cd my-skeleton-app
						
```

## App structure

To understand how I have set up my app, you can first look to my root +page.svelte in here I have set up a svelte router to handle the navigation between the different functionalities of my app.

```ts
<main>
	<Router>
		<Route path='/'>
			<Home />
		</Route>
		<Route path='/edit/:id' let:params>
			<Editing id={params.id}/>
		</Route>
		<Route path='/view/:id' let:params>
			<Viewing id={params.id}/>
		</Route>
	</Router>
</main>
```

This allows me to load in the different parts of my app into the main +page by passing the id of a note as the params to the relative component.

### Stores

I have most of the functionality of the actual notes located within my stores file. This is where all of my CRUD type operations happen. As well as where I *store* all of the data for the notes and categories.

![Notes Store](/static/notesStore.png)

### Layout

In this app I thought it would be easiest for the user if I were to create a sidebar layout that handles all of the routing and major functions of the app. You will find how I have structured this in my +layout.svelte file.

![Sidebar](/static/sidebar.png)

### Components

I then have 3 components that handle different parts of the app. There is a Home, Editing, and Viewing component that each performs a different function.

**Home.svelte** simply offers more of a landing page to the user and is somewhere I can route them to if they have no where else to go.

**Editing.svelte** Is where the user is taken for most of the apps functionality. This is where they are routed to when they create a new note and also where they go if they want to edit an existing note.

**Viewing.svelte** Lastly, this component offers the user a place to view their notes. It also has the ability to take markdown and convert it into HTML elements. 

## Thank you for taking the time to check out my project!