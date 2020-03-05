
<template>
  <div>
    <h1>
      {{name}}
    </h1>
    <button v-on:click="getData">Загрузить</button>
    <ol>
      <li v-for="issue in issues" v-bind:key="issue.id">
        {{ issue.title }}
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
  import axios from 'axios';
  import Vue from "vue";

  export default Vue.extend({
    data: function() {
      return {
        name: 'Список открытых задач по репозеторию vue:',
        issues: []
      }
    },
    methods: {
      getData: function (e) {
        async function getIssue(callback) {
          try {
            const response = await axios.get('https://api.github.com/repos/vuejs/vue/issues', {
              params: {
                state: "open",
                sort: "comments"
              }
            });
            callback(response.data);

          } catch (error) {
            console.error(error);
          }
        }

        getIssue((data) => this.issues = data);
      }
    }
  });
</script>


<style>
h1 {
  color: white;
  background-color: black;
}
</style>
