<template>
  <div>
    <h2>Задача: {{issue.title}}</h2>
    <ul>
      <li>Создана: {{issue.created_at}}</li>
      <li>Комментариев:
        <a
          v-bind:href="issue.comments_url"
          target="_blank">{{issue.comments}}</a>
      </li>
      <li>Ссылка:
        <a
          v-bind:href="issue.html_url"
          target="_blank">{{issue.html_url}}</a>
      </li>
    </ul>
    <router-link to="/">Назад</router-link>
  </div>
</template>

<script>
  import Vue from "vue";
  import { mapGetters } from "vuex";

  export default Vue.extend({
    name: 'IssuePage',
    data: function() {
      return {
        issue: {},
      }
    },
    mounted() {
      const targetId = this.$route.params.id;
      this.issue = this.$store.getters.targetIssue(targetId);
    }
  })

</script>
