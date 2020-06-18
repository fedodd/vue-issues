<template>
  <div>
    <h2>Список открытых задач по репозеторию vue:</h2>
    <section v-if="errored">
      <p>Что-то пошло нет так, попробуйте перезагрузить страницу.</p>
    </section>
    <section v-else>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <label>
          Только задачи с комментариями
          <input
            type="checkbox"
            id="checkbox"
            v-model="filterChecked"
            v-on:change="filterData"
          />
        </label>
        <IssueTable
          v-bind:issues-data="filterChecked ? filteredIssues : issues"
          v-bind:getData="getData"
          v-bind:link="link"
        />
      </div>
      <Pagination v-bind:pageButtons="pageButtons" v-bind:getData="getData" />
    </section>
  </div>
</template>

<script lang="ts">
  import axios from 'axios';
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';
  import parse from 'github-parse-link';
  import IssueTable from '../components/issueTable/IssueTable';
  import Pagination from '../components/Pagination';

  export default Vue.extend({
    name: 'issueList',
    computed: {
      issues() {
        return this.$store.state.issues.issues;
      },
      filteredIssues() {
        return this.$store.state.issues.filteredIssues;
      },
    },

    data: function() {
      return {
        name: 'Список открытых задач по репозеторию vue:',
        // issues: [],
        pageButtons: {},
        link:
          'https://api.github.com/repositories/11730342/issues?state=open&per_page=20',
        linkParams: {},
        loading: true,
        errored: false,
        filterChecked: false,
      };
    },
    methods: {
      filterData: function(e) {
        this.$store.dispatch('filterIssues', this.filterChecked);
      },
      getData: function(link, params) {
        this.linkParams = { ...params };
        //make request function
        axios
          .get(link, {
            params: {
              ...params,
            },
          })
          .then((response) => {
            const { first, prev, next, last } = parse(response.headers.link);

            this.pageButtons = {
              'Перв.': first,
              'Пред.': prev,
              'След.': next,
              'Последн.': last,
            };
            this.link = response.config.url;
            this.issues = response.data;

            // just for train and for push data to issuePage
            this.$store.dispatch('pseudoFetchIssues', response.data);
            
            // make filter here to do it only one time
            this.$store.dispatch('filterIssues');
          })
          .catch((error) => {
            console.log(error);
            this.errored = true;
          })
          .finally(() => (this.loading = false));
      },
    },
    mounted() {
      this.getData(this.link);
      console.log(this.allIssues);
    },
    components: {
      IssueTable,
      Pagination,
    },
  });
</script>
