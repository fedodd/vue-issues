<template>
  <tr>
    <td>{{issue.title}}</td>
    <td>{{issue.comments}}</td>
    <td>{{issue.state}}</td>
  </tr>
</template>

<script>
  import Vue from "vue";

  export default Vue.extend({
    name: 'Issue',
     props:['issue']
  })
</script>
