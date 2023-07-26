<script>
	import Tiptap from '../lib/tiptap.svelte';
	import CommentStyling from '$lib/commentStyling.svelte';

	function pushComments(str) {
		commentsArray.push(str);
		return console.log(commentsArray);
	}
	let commentsArray = ['<p>tests <strong>does this still work? </strong></p>'];
</script>

<h1>perspective input for Cuatex</h1>

<div class="homePage">
	<Tiptap props={pushComments} />
	<CommentStyling {commentsArray} />
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
