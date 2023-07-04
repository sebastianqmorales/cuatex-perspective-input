<script>
	export let editor;

	import linkIcon from '$lib/assets/link-icon.svg';

	let show = false;
	let menu = null;

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

		userProfile = await getUserProfile();

		// add events when element is added to the DOM
		document.addEventListener('click', handleOutsideClick, false);
		document.addEventListener('keyup', handleEscape, false);

		// remove events when element is removed from the DOM
		return () => {
			document.removeEventListener('click', handleOutsideClick, false);
			document.removeEventListener('keyup', handleEscape, false);
		};
	});
</script>

<!-- <button
				on:click={() => editor.chain().focus().toggleLink({ href: setLink() }).run()}
				class:active={editor.isActive('link') ? 'is-active' : ''}
			>
				<img src={linkIcon} alt="Link" />
			</button> -->
<button on:click={setLink} class:active={editor.isActive('link') ? 'is-active' : ''}>
	<img src={linkIcon} alt="Link" />
</button>
