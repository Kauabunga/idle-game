<script>
  import Clicker from "./Clicker.svelte";

  export let name;
  export let gameStore;
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<h1>Hello {name}! {$gameStore.tFrame}</h1>

{#each $gameStore.clickers as clicker, i}
  <Clicker {i} {clicker} handleClick={() => gameStore.handleClick(clicker)} />
{/each}
