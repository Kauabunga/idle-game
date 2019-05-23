<script>
  export let i;
  export let count;
  export let clicker;
  export let handleClick;
  export let handleBuy;
</script>

<style>
  .root {
    height: 96px;
    width: 100%;
    display: flex;
  }

  .left {
    width: 96px;   
  }

  .right {
    flex-grow: 1;
  }
  

  .left button {
    width: 96px;
    height: 96px;
  }

  .right button {
    height: 48px;
    width: 100%;
  }

  .progress {
    height: 48px;
    background: red;
  }

</style>

<div class="root">
  <div class="left">
    <button on:click={handleClick}> {count } </button>
  </div>

  <div class="right">
    <div class="progress" style="width:{clicker.clickProgress * 100}%" />
    <button on:click={handleBuy}>Buy 1x {clicker.name} </button>
  </div>

</div>
