<template>
    <div>
      <button @click="getData(link)">Загрузить</button>
      <section v-if="errored">
        <p>Что-то пошло нет так, попробуйте перезагрузить страницу.</p>
      </section>
      <section v-else>
        <div v-if="loading">Loading...</div>
        <Issues v-else
          v-bind:issues-data="issues"
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
  import parse from 'github-parse-link';
  import Issues from '../components/issues/Issues';
  import Pagination from "../components/Pagination";


  export default Vue.extend({
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
            this.issues = response.data
          })
          .catch(error => {
            console.log(error);
            this.errored = true;
          })
          .finally(() => (this.loading = false));
      },
      getIssue: function(targetId) {
        const targetIssue = this.issues.find(elem => elem.id === targetId)
        return targetIssue;
      }
    },
    // mounted() {
    //   this.getData(this.link);
    // },
    components: {
      Issues,
      Pagination
    }
  });
</script>
