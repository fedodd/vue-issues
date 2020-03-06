<template>
  <table>
    <thead>
      <th>Задача</th>
      <th>Комментарии</th>
      <th>Статус</th>
    </thead>
    <Issue v-for="issue in issuesData" v-bind:key="issue.id" v-bind:issue="issue"/>
  </table>
</template>

<script>
  import Vue from "vue";
  import Issue from "./issue/Issue";


  export default Vue.extend({
    name: 'Issues',
     props: {'issuesData': {
       type: Array
     }},
     components: {
      Issue
    }
  })
</script>
