<script>
  import Clicker from "./Clicker.svelte";

  export let name;
  export let gameStore;

  export let state = {};
  let currentState = state
  
  const unsubscribe = gameStore.subscribe(state => {
    currentState = state;
  })
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<h1>Hello {name}! {currentState.tFrame}</h1>

<h2>Workers {Math.floor(currentState.resources.workers)}</h2>


<h3>Wood {currentState.resources.area01}</h3>

{#each currentState.clickers as clicker, i}
  <Clicker
    {i}
    {clicker}
    count={currentState.resources[clicker.id]}
    handleClick={() => gameStore.handleClick(clicker)}
    handleBuy={() => gameStore.handleBuy(clicker)} />
{/each}
