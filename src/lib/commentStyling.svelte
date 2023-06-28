<script>
	import { commentsArray } from '$lib/comments.js';
	import { generateHTML } from '@tiptap/html';
	import StarterKit from '@tiptap/starter-kit';

	// loop through commentsArray or figure out how to handle multiple comments, etc
	let output = generateHTML(commentsArray[1], [StarterKit]);
</script>

<pre>
	<code>{output}</code>
</pre>
<div class="div">
	{@html output}
</div>

<style>
	div {
		color: white;
	}
	code {
		color: white;
	}
</style>
