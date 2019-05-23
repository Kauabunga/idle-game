<script>
  export let i;
  export let clicker;
  export let handleClick;
</script>

<style>
  h1 {
    color: purple;
  }
  .progress {
    height: 2px;
    background: red;
  }
</style>

<li>
  <button on:click={handleClick} id={clicker.id}>
     {i + 1}: {clicker.name} {clicker.count}
  </button>

  <div class="progress" style="width:{clicker.clickProgress * 100}%" />

</li>
