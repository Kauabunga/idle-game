<script>
  export let rate;
  export let handleWorkersChange;
</script>

<style>
  
</style>


<h1>Worker rate {rate}</h1>

<button on:click={() => handleWorkersChange(-10)}>-10</button>
<button on:click={() => handleWorkersChange(-5)}>-5</button>
<button on:click={() => handleWorkersChange(-1)}>-1</button>
<button on:click={() => handleWorkersChange(1)}>+1</button>
<button on:click={() => handleWorkersChange(5)}>+5</button>
<button on:click={() => handleWorkersChange(10)}>+10</button>

