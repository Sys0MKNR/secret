<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import Login from './lib/Login.svelte'
  // import Main from './lib/Main.svelte'
  import { store } from './lib/store'

  let loggedIn

  const unsubscribe = store.subLoggedIn((value) => {
    loggedIn = value
  })

  onMount(async () => {
    await store.init()
  })

  onDestroy(unsubscribe)
</script>

<main class="w-screen h-screen bg-main">
  {#if loggedIn}
    {#await import('./lib/Main.svelte') then Main}
      <Main.default />
    {/await}
  {:else}
    <Login />
  {/if}
</main>

<style>
</style>
