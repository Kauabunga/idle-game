<script>
  export let i;
  export let clicker;
  export let handleClick;
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<li>
  <button on:click={handleClick} id={clicker.id}>
     {i + 1}: {clicker.name} {clicker.count}
  </button>
</li>
