
<template>
  <div class="holder">
    <h1>
      {{name}}
    </h1>
    <button v-on:click="getData(link)">Загрузить</button>
    <!-- <ol>
      <li v-for="issue in issues" v-bind:key="issue.id">
        {{ issue.title }}
      </li>
    </ol> -->
    <Issues
      v-bind:issues-data="issues"
      v-bind:filterData="getData"
      v-bind:link="link"
      ></Issues>
    <Pagination
      v-bind:pageLinks="pageLinks"
      v-bind:getData="getData"/>
  </div>
</template>

<script lang="ts">
  import axios from 'axios';
  import Vue from "vue";
  import parse from 'github-parse-link';
  import Issues from './components/issues/Issues';
  import Pagination from "./components/Pagination";


  export default Vue.extend({
    data: function() {
      return {
        name: 'Список открытых задач по репозеторию vue:',
        issues: [],
        pageLinks: {},
        link: 'https://api.github.com/repositories/11730342/issues?state=open&per_page=20',
        // linkParams: {
        //   state: "open",
        //   sort: "comments",
        //   page: 1,
        //   per_page: 20
        // }
      }
    },
    methods: {
      getData: function (link) {
        async function getIssue(callback) {

          try {
            const response = await axios.get(link);
            callback(response);

          } catch (error) {
            console.error(error);
          }
        }
        getIssue((response) => {
          const {first, prev, next, last} = parse(response.headers.link);
          this.pageLinks = {first, prev, next, last};
          console.log('callback', response.config);
          this.link = response.config.url
          this.issues = response.data
        });

        function updateQuery(response) {

        }
      },
    },
    components: {
      Issues,
      Pagination
    }
  });
</script>


<style>
h1 {
  color: white;
  background-color: black;
  width: max-content;
  max-width: 80wv;
}

.holder {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
