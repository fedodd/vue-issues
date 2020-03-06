<template>
  <div>
    <button
      v-for="(link, buttonType) in pageLinks"
      v-bind:key="buttonType"
      v-bind:disabled="link===undefined"
      @click="getData(link)" >{{buttonType}}</button>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    props: {
      'getData': Function,
      'pageLinks': Object
    }
  });
</script>


<style>
  button {
    background-color: black;
    color: white;
    border: none;
    padding: 5px;
    margin-right: 20px;
  }

  button:last-child {
    margin-right: 0;
  }

  button:disabled {
    background-color: grey;
    color: lightgrey;
  }

</style>
