
<template>
  <div class="holder">
    <router-view/>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
  });
</script>



<style>

  body {
    font-family: Arial, Helvetica, sans-serif;
  }

  h1 {
    width: max-content;
    max-width: 80vw;
  }

  .holder {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .button {
    background-color: darkmagenta;
    color: white;
    border: none;
    border-radius: 2px;
    padding: 5px;
    margin-right: 20px;
    transition: .3s;
    outline: none;
  }

  .button:hover {
    cursor: pointer;
    box-shadow: 2px 3px 5px 1px rgba(0,0,0,0.75);
  }

  .button:hover:disabled {
    cursor:not-allowed;
    box-shadow: none;
  }

  .button:last-child {
    margin-right: 0;
  }

  .button:disabled {
    background-color: grey;
    color: lightgrey;
  }

  .button.is__sort {
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border: 10px solid transparent;
    border-top-color: darkmagenta;
    background-color: transparent;
    padding: 0;
    opacity: .5;
  }

  .button.is__sort:hover {
    box-shadow: none;
    opacity: 1;
  }

  .button.is__sort.is__active {
    opacity: 1;
  }

  .button.is__sort.is__reverse {
    top: -10px;
    transform: rotate(180deg);
  }

    @media (max-width: 400px) {
    h1 {
      font-size: 1.2em;
      width: 100%;
      padding: 5px;
    }
    .holder {
      margin: 5px;
    }
  }


</style>
