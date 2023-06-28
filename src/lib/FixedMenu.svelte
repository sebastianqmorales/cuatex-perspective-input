<script>
	export let editor;

	import { pushComments } from '$lib/comments.js';
	import boldIcon from '$lib/assets/bold-icon.svg';
	import linkIcon from '$lib/assets/link-icon.svg';
	import italicsIcon from '$lib/assets/italics-icon.svg';
	import bulletlistIcon from '$lib/assets/bullet-list-icon.svg';
	import numberlistIcon from '$lib/assets/number-list-icon.svg';

	function setLink() {
		const previousUrl = editor.getAttributes('link').href;
		// custom modal or dropdown should go here
		const url = window.prompt('URL', previousUrl);

		// cancelled
		if (url === null) {
			return;
		}

		// empty
		if (url === '') {
			editor.chain().focus().extendMarkRange('link').unsetLink().run();

			return;
		}

		// update link
		editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();

		// toggle link
	}
</script>

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
			<!-- <button
				on:click={() => editor.chain().focus().toggleLink({ href: setLink() }).run()}
				class:active={editor.isActive('link') ? 'is-active' : ''}
			>
				<img src={linkIcon} alt="Link" />
			</button> -->
			<button on:click={setLink} class:active={editor.isActive('link') ? 'is-active' : ''}>
				<img src={linkIcon} alt="Link" />
			</button>
		</div>
		<div class="left-side">
			<!-- only submit if there is a certain number of characters  -->
			<button
				class="submit"
				on:click={pushComments(editor.getJSON())}
				on:click={editor.commands.setContent('')}>submit</button
			>
		</div>
	</div>
{/if}

<style>
	.menu {
		background-color: #3f3f3f;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 10px;
		padding-right: 10px;
	}

	button {
		background-color: #3f3f3f;
		color: white;
		border: none;
		cursor: pointer;
		border-radius: 3px;

		padding-top: 4px;
	}
	button:hover {
		background-color: #575757;
	}

	button > img {
		transform: scale(0.9);
	}

	.is-active {
		background-color: #575757;
	}

	.submit {
		padding: 11px;
		font-size: 15px;
	}
	.submit:hover {
		background-color: #fd7b54;
		color: black;
	}
</style>
