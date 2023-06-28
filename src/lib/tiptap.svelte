<script>
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Placeholder from '@tiptap/extension-placeholder';
	import Link from '@tiptap/extension-link';
	import FixedMenu from './FixedMenu.svelte';
	let element;
	let editor;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				Placeholder.configure({
					placeholder: 'Share your perspective...'
				}),
				Link
			],
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div class="container">
	<div class="user-name">Comment as <a href="/">sebasisawesome</a></div>
	<div class="wrapper">
		<div class="element-wrapper" bind:this={element} />
		<FixedMenu {editor} />
	</div>
</div>

<style>
	.element-wrapper :global(.ProseMirror p.is-editor-empty:first-child::before) {
		color: #c9c9c9;
		content: attr(data-placeholder);
		float: left;
		height: 0;
		pointer-events: none;
	}
	.user-name {
		color: white;
		margin-bottom: 4px;
	}
	.user-name > a {
		color: rgb(105, 105, 255);
	}

	.wrapper {
		border: 1px solid #5c5c5c;
		max-height: 200px;
		display: inline-flex;
		flex-direction: column;
	}

	.wrapper:focus-within {
		border: 1px solid white;
	}

	.element-wrapper {
		padding: 10px;
		flex: 1 1 0%;
		resize: both;
		overflow: auto;
		color: white;
	}
	.element-wrapper :global(p:first-of-type) {
		margin-top: 0;
	}

	.element-wrapper :global(p:last-of-type) {
		margin-bottom: 0;
	}

	.element-wrapper > :global(.ProseMirror) {
		outline: 0;
		width: 400px;
		height: 100px;
	}
</style>
