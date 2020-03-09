<template>
  <table class="table">
    <thead class="thead">
      <th class="th issue-name">Задача</th>
      <th class="th issue-status">Статус</th>
      <th class="th issue-comments">Комментарии
        <button
          class="button is__filter"
          v-on:click="sortData('comments')" ></button>
      </th>
      <th class="th issue-created">Создана
        <button
          class="button is__filter"
          v-on:click="sortData('created_at')" ></button>
      </th>
    </thead>
    <Issue v-for="issue in issuesData" v-bind:key="issue.id" v-bind:issue="issue"/>
  </table>
</template>

<script>
  import Vue from "vue";
  import Issue from "./issue/Issue";


  export default Vue.extend({
    name: 'Issues',
    props: {
      'issuesData': Array,
      'getData': Function,
      'link': String
    },
    methods: {
      sortData: function (sortType) {
        console.log(this.link, sortType);

        this.getData(this.link, {sort: sortType});
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
