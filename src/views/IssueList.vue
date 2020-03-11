<template>
    <div>
      <h2>Список открытых задач по репозеторию vue:</h2>
      <section v-if="errored">
        <p>Что-то пошло нет так, попробуйте перезагрузить страницу.</p>
      </section>
      <section v-else>
        <div v-if="loading">Loading...</div>

        <IssueTable v-else
          v-bind:issues-data="this.$store.getters.allIssues"
          v-bind:getData="getData"
          v-bind:link="link" />
        <Pagination
          v-bind:pageButtons="pageButtons"
          v-bind:getData="getData"/>
      </section>
    </div>
</template>

<script lang="ts">
  import axios from 'axios';
  import Vue from "vue";
  import { mapGetters, mapActions } from "vuex";
  import parse from 'github-parse-link';
  import IssueTable from '../components/issueTable/IssueTable';
  import Pagination from "../components/Pagination";


  export default Vue.extend({
    name: "issueList",
    computed: mapGetters(['allIssues']),

    data: function() {
      return {
        name: 'Список открытых задач по репозеторию vue:',
        issues: [],
        pageButtons: {},
        link: 'https://api.github.com/repositories/11730342/issues?state=open&per_page=20',
        linkParams: {},
        loading: true,
        errored: false
      }
    },

    methods: {
      //mapActions('pseudoFetchIssues'),
      getData: function (link, params) {
        this.linkParams = {...params};
        //make request function
        axios
          .get(link, {params: {
              ...params
            }
          })
          .then(response => {
            const {first, prev, next, last} = parse(response.headers.link);

            this.pageButtons = {
              'Перв.': first,
              'Пред.': prev,
              'След.': next,
              'Последн.': last};
            this.link = response.config.url
            this.issues = response.data;

            // just for train and for push data to issuePage
            this.$store.dispatch('pseudoFetchIssues', response.data)
          })
          .catch(error => {
            console.log(error);
            this.errored = true;
          })
          .finally(() => (this.loading = false));
      }
    },
    mounted() {
      this.getData(this.link);
    },
    components: {
      IssueTable,
      Pagination
    }
  });
</script>
