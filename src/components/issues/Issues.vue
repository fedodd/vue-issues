<template>
  <table>
    <thead>
      <th class="issue-name">Задача</th>
      <th class="issue-comments">Комментарии
        <button @click="filterData(link + '&sort=comments')" >↓</button>
      </th>
      <th class="issue-status">Статус</th>
      <th class="">Создана
        <button>
          <button @click="filterData(link + '&sort=created_at')" >↓</button>
        </button>
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
     props: {'issuesData': Array, 'filterData': Function, 'link': String},
     components: {
      Issue
    }
  })
</script>


<style>
  table {
    border-collapse: collapse;
  }

  th, td {
    padding: 5px 15px 5px 5px;
  }

  tr:nth-child(2n) {
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

</style>
