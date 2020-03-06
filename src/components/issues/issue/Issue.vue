<template>
  <tr>
    <td class="issue-name">{{issue.title}}</td>
    <td class="issue-comments">{{issue.comments}}</td>
    <td class="issue-status">{{issue.state}}</td>
    <td class="">{{issue.created_at}}</td>
  </tr>
</template>

<script>
  import Vue from "vue";

  export default Vue.extend({
    name: 'Issue',
     props:['issue']
  })
</script>
