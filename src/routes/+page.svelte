<script>
	import Tiptap from '../lib/tiptap.svelte';
	import CommentStyling from '$lib/commentStyling.svelte';
</script>

<h1>perspective input for Cuatex</h1>

<div class="homePage">
	<Tiptap />
	<CommentStyling />
</div>

<style>
	.homePage {
		display: flex;
		flex-direction: column;
		gap: 40px;
		padding: 60px;

		align-items: center;
	}
	h1 {
		color: white;
	}
</style>
