<script lang='ts'>
    import { onMount, onDestroy } from 'svelte';
    import { findNoteById } from '../../stores/notes';
    import type { Note } from '../../stores/notes';
    import { marked } from 'marked';
  
    export let id: string;
  
    let htmlContent = '';

    onMount(async () => {
        findNoteById(+id).subscribe(foundNote => {
            note = foundNote;
        });
    });

    let note: Note | null = null;
</script>

<main class="flex flex-col p-6 w-3/4 max-w-[1240px] mx-auto gap-4 mt-6">
    <h1 class="h1">{note?.title}</h1>

    <style>
.markdown-body {
  line-height: 1.5;
  font-size: 16px;
  color: #24292e;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
}

.markdown-body h1 {
  font-size: 2em;
}

.markdown-body h2 {
  font-size: 1.5em;
}

.markdown-body h3 {
  font-size: 1.25em;
}

.markdown-body h4 {
  font-size: 1em;
}

.markdown-body h5 {
  font-size: 0.875em;
}

.markdown-body h6 {
  font-size: 0.85em;
  color: #6a737d;
}

.markdown-body p {
  margin-top: 0;
  margin-bottom: 16px;
}

.markdown-body ul,
.markdown-body ol {
  padding-left: 20px;
}

.markdown-body li {
  margin-bottom: 8px;
}


.markdown-body a {
  color: #0366d6;
  text-decoration: none;
}

.markdown-body a:hover {
  text-decoration: underline;
}

.markdown-body img {
  max-width: 100%;
  box-sizing: content-box;
  background-color: #fff;
}

.markdown-body table {
  display: block;
  width: 100%;
  overflow: auto;
  margin-bottom: 16px;
  border-spacing: 0;
  border-collapse: collapse;
}

.markdown-body table tr {
  background-color: #fff;
  border-top: 1px solid #c6cbd1;
}

.markdown-body table th,
.markdown-body table td {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}

.markdown-body table th {
  font-weight: 600;
}

.markdown-body blockquote {
  margin: 0;
  padding-left: 1em;
  border-left: 0.25em solid #dfe2e5;
}

.markdown-body hr {
  border-bottom-color: #eee;
}

    </style>
    
    <div class="markdown-body bg-white shadow-md p-4">{@html note?.contents}</div>
    
</main>
