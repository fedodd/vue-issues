<template>
  <tr class="tr">
    <td class="td issue-name">
      <router-link v-bind:to="'/issues/' + issue.id">
        {{ issue.title }}
      </router-link>
    </td>
    <td class="td issue-status">{{ issue.state }}</td>
    <td class="td issue-comments">{{ issue.comments }}</td>
    <td class="td">{{ formatData(issue.created_at) }}</td>
  </tr>
</template>

<script>
  import Vue from 'vue';

  export default Vue.extend({
    name: 'Issue',
    props: ['issue'],
    methods: {
      formatData: function(date) {
        const fomattedDate = new Date(date);
        return fomattedDate.toLocaleDateString();
      },
    },
  });
</script>
