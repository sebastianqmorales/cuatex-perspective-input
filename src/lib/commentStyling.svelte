<script>
	import { commentsArray } from '$lib/comments.js';
	import { generateHTML } from '@tiptap/html';
	import StarterKit from '@tiptap/starter-kit';

	// loop through commentsArray or figure out how to handle multiple comments, etc
</script>

{#each commentsArray as comment}
	<div class="perspectiveContainer">
		<div class="perspectiveContainer__details">
			<div class="perspectiveContainer__userName">sebasisawesome</div>
			<div class="perspectiveContainer__date">10 min ago</div>
		</div>
		<div class="perspectiveContainer__content">
			{@html comment}
		</div>
	</div>
{/each}

<style>
	.perspectiveContainer {
		color: white;
		border: 1px solid rgb(77, 76, 76);
		width: 600px;
		padding: 10px;
	}

	.perspectiveContainer__details {
		display: flex;
		gap: 10px;
	}

	.perspectiveContainer__content > :global(*) {
		margin-top: 10px;
		margin-bottom: 10px;
		margin-left: 0px;
		margin-right: 0px;
	}
</style>
