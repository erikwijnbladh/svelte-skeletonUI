<script lang="ts">
	import '../app.postcss';
	import {
		AppShell,
		AppBar,
		AppRail,
		AppRailTile,
		AppRailAnchor,
		LightSwitch
	} from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';

	initializeStores();
	let currentTile: number = 0;
</script>

<!-- App Shell -->
<AppShell scrollbarGutter="stable">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a class="btn btn-sm variant-ghost-surface" href="/">
					<strong class="text-xl">R/B/Y Pokedex</strong>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://twitch.tv/yorks_"
					target="_blank"
					rel="noreferrer"
				>
					Twitch
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://open.spotify.com/user/erikwijnbladh?si=b9af7c8895d44c0e"
					target="_blank"
					rel="noreferrer"
				>
					Spotify
				</a>
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- <svelte:fragment slot="sidebarLeft"> -->
	<!-- <AppRail class=""> -->
	<!-- <svelte:fragment slot="lead"> -->
	<!-- <AppRailAnchor href="/">(icon)</AppRailAnchor> -->
	<!-- </svelte:fragment> -->
	<!-- --- -->
	<!-- <AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1"> -->
	<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
	<!-- <span>Tile 1</span> -->
	<!-- </AppRailTile> -->
	<!-- <AppRailTile bind:group={currentTile} name="tile-2" value={1} title="tile-2"> -->
	<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
	<!-- <span>Tile 2</span> -->
	<!-- </AppRailTile> -->
	<!-- <AppRailTile bind:group={currentTile} name="tile-3" value={2} title="tile-3"> -->
	<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
	<!-- <span>Tile 3</span> -->
	<!-- </AppRailTile> -->
	<!-- --- -->
	<!-- <svelte:fragment slot="trail"> -->
	<!-- <AppRailAnchor href="/" target="_blank" title="Account">(icon)</AppRailAnchor> -->
	<!-- </svelte:fragment> -->
	<!-- </AppRail> -->
	<!-- </svelte:fragment> -->
	<!-- Page Route Content -->
	<div class="max-w-4xl mx-auto py-20">
		<slot />
	</div>
	<!-- <svelte:fragment slot="footer">
		<div class="flex flex-row justify-center">
			<p>Built width</p>
			<p>1</p>
			<p>1</p>
		</div>
	</svelte:fragment> -->
</AppShell>
