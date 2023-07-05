<script>
	export let editor;

	import linkIcon from '$lib/assets/link-icon.svg';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';

	let show = false;
	let menu;

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

	onMount(async () => {
		const handleOutsideClick = (event) => {
			if (show && !menu.contains(event.target)) {
				show = false;
			}
		};

		const handleEscape = (event) => {
			if (show && event.key === 'Escape') {
				show = false;
			}
		};

		// add events when element is added to the DOM
		document.addEventListener('click', handleOutsideClick, false);
		document.addEventListener('keyup', handleEscape, false);

		// remove events when element is removed from the DOM
		return () => {
			document.removeEventListener('click', handleOutsideClick, false);
			document.removeEventListener('keyup', handleEscape, false);
		};
	});

	function handleLink(event) {
		const formData = new FormData(event.target);
		const data = {};

		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}

		// editor.commands.setLink({ href: data.link });
		editor.chain().focus().extendMarkRange('link').toggleLink({ href: data.link }).run();
		editor
			.chain()
			.focus()
			.command(({ tr }) => {
				// manipulate the transaction
				tr.insertText(data.title);

				return true;
			})
			.run();
		return console.log(data);
	}
</script>

<!-- <button
				on:click={() => editor.chain().focus().toggleLink({ href: setLink() }).run()}
				class:active={editor.isActive('link') ? 'is-active' : ''}
			>
				<img src={linkIcon} alt="Link" />
			</button> -->
<div class="wrapper" bind:this={menu}>
	<button on:click={() => (show = !show)}>
		<img src={linkIcon} alt="Link" />
	</button>
	{#if show}
		<div
			class="dropdown-container"
			in:scale={{ duration: 100, start: 0.95 }}
			out:scale={{ duration: 75, start: 0.95 }}
		>
			<!-- Think about using a dialog for handling data from the form -->
			<form on:submit|preventDefault={handleLink} method="" action="">
				<div class="input">
					<label for="title">Text:</label>
					<input type="text" name="title" placeholder="Name of link" />
				</div>
				<div class="input">
					<label for="link">Link:</label>
					<input type="text" name="link" placeholder="Link" />
				</div>
				<input type="submit" value="insert" />
				<!-- <button on:click={setLink} class:active={editor.isActive('link') ? 'is-active' : ''}>
					Insert
				</button> -->
			</form>
		</div>
	{/if}
</div>

<style>
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

	.dropdown-container {
		position: absolute;
		/* right: 0; */
		padding-top: 0.5rem;
		padding-bottom: 1rem;
		padding-left: 1rem;
		padding-right: 1rem;
		margin-top: 0.25rem;
		/* border: 1px solid #1d1d1d; */
		background-color: #3f3f3f;
		box-shadow: 0px 4px 3px rgb(17, 17, 17);
		border-radius: 0.25rem;

		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	label {
		color: white;
	}
</style>
