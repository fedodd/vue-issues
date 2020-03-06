<template>
  <div class="pagination">
    <button
      class="button"
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

  .pagination {
    padding:20px;
  }


</style>
