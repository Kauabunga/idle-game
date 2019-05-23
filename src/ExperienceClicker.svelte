<script>
  export let rate;
  export let name;
  export let handleExperienceChange;
</script>

<style>
  
</style>



<h1>Experience {name} rate {rate}</h1>

<button on:click={() => handleExperienceChange(-10)}>-10</button>
<button on:click={() => handleExperienceChange(-5)}>-5</button>
<button on:click={() => handleExperienceChange(-1)}>-1</button>
<button on:click={() => handleExperienceChange(1)}>+1</button>
<button on:click={() => handleExperienceChange(5)}>+5</button>
<button on:click={() => handleExperienceChange(10)}>+10</button>

