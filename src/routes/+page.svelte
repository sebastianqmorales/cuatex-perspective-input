<script>
	import Tiptap from '../lib/tiptap.svelte';
	import { commentsArray } from '$lib/comments.js';
	import { generateHTML } from '@tiptap/html';
	import StarterKit from '@tiptap/starter-kit';

	let output = generateHTML(commentsArray[0], [StarterKit]);
</script>

<h1>perspective input for Cuatex</h1>

<Tiptap />
<pre>
	<code>{output}</code>
</pre>

<style>
	h1 {
		color: white;
	}
	code {
		color: white;
	}
</style>
