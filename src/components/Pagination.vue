<template>
  <div class="pagination">
    <button
      class="button"
      v-for="(link, buttonType) in pageButtons"
      v-bind:key="buttonType"
      v-bind:disabled="link === undefined"
      v-on:click="getData(link)"
    >
      {{ buttonType }}
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    getData: Function,
    pageButtons: Object
  }
});
</script>

<style>
.pagination {
  padding: 20px;
}
</style>
