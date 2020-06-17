<template>
  <table class="table">
    <thead class="thead">
      <th class="th issue-name">Задача</th>
      <th class="th issue-status">Статус</th>
      <th class="th issue-comments">
        Комментарии
        <div class="issue-buttonWrapper">
          <button
            class="button is__filter"
            v-bind:class="{ is__toggled: sortCommentsDir === 'asc' }"
            @click="sortCommentsHandler()"
          ></button>
        </div>
      </th>
      <th class="th issue-created">
        Создана
        <div class="issue-buttonWrapper">
          <button
            class="button is__filter"
            v-bind:class="{ is__toggled: sortCreatedDir === 'asc' }"
            @click="sortCreatedHandler()"
          ></button>
        </div>
      </th>
    </thead>
    <Issue
      v-for="issue in issuesData"
      v-bind:key="issue.id"
      v-bind:issue="issue"
    />
  </table>
</template>

<script>
import Vue from "vue";
import Issue from "./issue/Issue";

export default Vue.extend({
  name: "IssueTable",
  data: function() {
    return {
      sortCommentsDir: "desc",
      sortCreatedDir: "desc"
    };
  },
  props: {
    issuesData: Array,
    getData: Function,
    link: String
  },
  methods: {
    sortCommentsHandler: function() {
      this.getData(this.link, {
        sort: "comments",
        direction: this.sortCommentsDir
      });
      this.sortCommentsDir = this.sortCommentsDir === "desc" ? "asc" : "desc";
    },
    sortCreatedHandler: function() {
      this.getData(this.link, {
        sort: "created_at",
        direction: this.sortCreatedDir
      });
      this.sortCreatedDir = this.sortCreatedDir === "desc" ? "asc" : "desc";
    }
  },
  components: {
    Issue
  }
});
</script>

<style>
.table {
  margin: 5px;
  border-collapse: collapse;
  max-width: 100%;
}

.th,
.td {
  padding: 5px 15px 5px 5px;
}

.th {
  position: relative;
}

.tr:nth-child(2n + 1) {
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

.issue-buttonWrapper {
  position: relative;
  display: inline-block;
}

@media (max-width: 400px) {
  .th,
  .td {
    font-size: 0.8em;
    padding: 2px 5px 2px 2px;
  }

  .th {
    word-break: break-all;
    vertical-align: baseline;
  }
}
</style>
