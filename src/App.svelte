<script>
  import Clicker from "./Clicker.svelte";
  import ExperienceWorker from "./ExperienceWorker.svelte";
  import ExperienceClicker from "./ExperienceClicker.svelte";

  export let name;
  export let gameStore;

  export let handleWorkersChange;

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

<h1>Hello {name}! {currentState.timePretty}</h1>

<h2>Workers {Math.floor(currentState.resources.workers)}</h2>

<h3>Wood {currentState.resources.area01}</h3>

{#each currentState.clickers as clicker, i}
  <Clicker
    {i}
    {clicker}
    count={Math.floor(currentState.resources[clicker.id])}
    handleClick={() => gameStore.handleClick(clicker)}
    handleBuy={() => gameStore.handleBuy(clicker)} />
{/each}

<ExperienceWorker rate={currentState.multiplier.workers} {handleWorkersChange} />

<br/>

{#each currentState.clickers as clicker, i}
<ExperienceClicker rate={currentState.multiplier[clicker.id]} name={clicker.name} handleExperienceChange={gameStore.handleMultiplier(clicker.id)} />
{/each}

<br/>
<br/>

<pre>{JSON.stringify(currentState, null, 2)}</pre>