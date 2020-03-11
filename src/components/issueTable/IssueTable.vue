<template>
  <div>
    <label>Только задачи с комментариями
      <input
        type="checkbox"
        id="checkbox"
        v-model="filterChecked"
        v-on:change="filter"
        >
    </label>
    <table class="table">
      <thead class="thead">
        <th class="th issue-name">Задача
          <button
            class="button is__filter"
            @click="sort()" ></button>
        </th>
        <!-- <th class="th issue-status">Статус</th> -->
        <th class="th issue-comments">Комментарии
          <button
            class="button is__filter"
            @click="getData(link, {sort: 'comments'})" ></button>
        </th>
        <th class="th issue-created">Создана
          <button
            class="button is__filter"
            @click="getData(link, {sort:'created_at'})" ></button>
        </th>
      </thead>
      <Issue v-for="issue in issues" v-bind:key="issue.id" v-bind:issue="issue"/>
    </table>
  </div>
</template>

<script>
  import Vue from "vue";
  import Issue from "./issue/Issue";


  export default Vue.extend({
    name: 'IssueTable',
    props: {
      'getData': Function,
      'link': String
    },
    data: function() {
      return {
        sortReverse: false,
        filterChecked: false
      }
    },
    computed: {
      issues: {
        get: function () {
          console.log('i am in get');
          return this.$store.getters.allIssues
        },
        set: function (filtered) {

          //const filtered = this.$store.getters.allIssues.filter(elem => elem.comments > 0);
          console.log('i am in set', filtered);
          //this.issues = filtered;
          //return filtered;
        }
      }
    },
    methods: {
      sort: function () {
        this.$store.dispatch('sortIssues', this.sortReverse)
        this.sortReverse = !this.sortReverse;
      },
      filter: function() {
        console.log(this.issues, this.filterChecked);
        this.filterChecked ?
        this.issues = this.issues.filter(elem => elem.comments > 0) : null;
      }
    },
    components: {
      Issue
    }
  })
</script>


<style>
  .table {
    margin: 5px;
    border-collapse: collapse;
    max-width: 100%;
  }

  .th, .td {
    padding: 5px 15px 5px 5px;
  }

  .tr:nth-child(2n+1) {
    background-color: #efefef;
  }

  .issue-name {
    max-width: 400px;
  }

  .issue-comments {
    text-align: right;
  }

  .issue-status {
    text-align: center;
  }

  .issue-created {
    text-align: right;
  }

  @media (max-width: 400px) {
    .th, .td {
      font-size: 0.8em;
      padding: 2px 5px 2px 2px;
    }

    .th {
      word-break: break-all;
      vertical-align: baseline;
    }
  }

</style>
