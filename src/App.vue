<template>
  <div class="holder">
    <router-view />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({});
</script>

<style>
  body {
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
  }

  h1 {
    width: max-content;
    max-width: 70vw;
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
    transition: 0.3s;
    outline: none;
  }

  .button:hover {
    cursor: pointer;
    box-shadow: 2px 3px 5px 1px rgba(0, 0, 0, 0.75);
  }

  .button:hover:disabled {
    cursor: not-allowed;
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
    position: relative;
    bottom: 10px;
    margin-bottom: -10px;
    opacity: 0.3;
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border: 10px solid transparent;
    border-bottom-color: darkmagenta;
    background-color: transparent;
    padding: 0;
  }

  .button.is__filter.is__active {
    opacity: 1;
  }

  .is__filter.is__toggled {
    transition: 0.3s;
    bottom: 0;
    transform: rotate(180deg);
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
