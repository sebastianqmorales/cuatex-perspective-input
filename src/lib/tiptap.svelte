<script>
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Placeholder from '@tiptap/extension-placeholder';
	import Link from '@tiptap/extension-link';

	import { pushComments } from '$lib/comments.js';
	import boldIcon from '$lib/assets/bold-icon.svg';
	import italicsIcon from '$lib/assets/italics-icon.svg';
	import bulletlistIcon from '$lib/assets/bullet-list-icon.svg';
	import numberlistIcon from '$lib/assets/number-list-icon.svg';
	export let props;
	let element;
	let editor;
	let commentContent;
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

	function pushContent() {
		commentContent = editor.getHTML();
		return pushComments(String(commentContent));
	}
</script>

<div class="container">
	<div class="user-name">Comment as <a href="/">sebasisawesome</a></div>
	<div class="wrapper">
		<div class="element-wrapper" bind:this={element} />
		<form method="POST" on:submit|preventDefault>
			<fieldset>
				{#if editor}
					<div class="menu">
						<div class="right-side">
							<button
								on:click={() => console.log && editor.chain().focus().toggleBold().run()}
								disabled={!editor.can().chain().focus().toggleBold().run()}
								class={editor.isActive('bold') ? 'is-active' : ''}
							>
								<img src={boldIcon} alt="Bold" />
							</button>
							<button
								on:click={() => editor.chain().focus().toggleItalic().run()}
								disabled={!editor.can().chain().focus().toggleItalic().run()}
								class={editor.isActive('italic') ? 'is-active' : ''}
							>
								<img src={italicsIcon} alt="Italics" />
							</button>
							<button
								on:click={() => editor.chain().focus().toggleBulletList().run()}
								class={editor.isActive('bulletList') ? 'is-active' : ''}
							>
								<img src={bulletlistIcon} alt="Bullet List" />
							</button>
							<button
								on:click={() => editor.chain().focus().toggleOrderedList().run()}
								class={editor.isActive('orderedList') ? 'is-active' : ''}
							>
								<img src={numberlistIcon} alt="Numbered List" />
							</button>
						</div>
						<input
							class="commentInput__radio-button-input commentInput__radio-button--agreeing"
							id={`commentType_agreeing`}
							value="agreeing"
							type="radio"
							name="comment_type"
						/>
						<label
							class="commentInput__radio-button-label commentInput__radio-button-label--agreeing"
							for={`commentType_agreeing`}
						>
							Agreeing
						</label>
						<input
							class="commentInput__radio-button-input commentInput__radio-button--neutral"
							id={`commentType_neutral`}
							value="neutral"
							type="radio"
							name="comment_type"
							checked
						/>
						<label
							class="commentInput__radio-button-label commentInput__radio-button-label--neutral"
							for={`commentType_neutral`}
						>
							Neutral
						</label>
						<input
							class="commentInput__radio-button-input commentInput__radio-button--disagreeing"
							id={`commentType_disagreeing`}
							value="disagreeing"
							type="radio"
							name="comment_type"
						/>
						<label
							class="commentInput__radio-button-label commentInput__radio-button-label--disagreeing"
							for={`commentType_disagreeing`}
						>
							Disagreeing
						</label>
						<div class="left-side">
							<!-- only submit if there is a certain number of characters  -->
							<input
								class="submit"
								type="submit"
								placeholder="submit"
								on:click={props.pushContent}
								on:click={editor.commands.setContent('')}
							/>
						</div>
					</div>
				{/if}
			</fieldset>
		</form>
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
