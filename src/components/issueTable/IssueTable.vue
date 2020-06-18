<template>
  <table class="table">
    <thead class="thead">
      <th class="th issue-name">Задача</th>
      <th class="th issue-status">Ста&shy;тус</th>
      <th class="th issue-comments">
        Ком&shy;мент.
        <div class="issue-buttonWrapper">
          <button
            class="button is__filter"
            v-bind:class="{
              is__toggled: sortComments.dir === 'asc',
              is__active: sortComments.isActive,
            }"
            @click="sortCommentsHandler()"
          ></button>
        </div>
      </th>
      <th class="th issue-created">
        Создана
        <div class="issue-buttonWrapper">
          <button
            class="button is__filter"
            v-bind:class="{
              is__toggled: sortCreated.dir === 'asc',
              is__active: sortCreated.isActive,
            }"
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
  import Vue from 'vue';
  import Issue from './issue/Issue';

  export default Vue.extend({
    name: 'IssueTable',
    data: function() {
      return {
        sortComments: {
          dir: 'desc',
          isActive: false,
        },
        sortCreated: {
          dir: 'asc',
          isActive: true,
        },
      };
    },
    props: {
      issuesData: Array,
      getData: Function,
      link: String,
    },
    methods: {
      sortCommentsHandler: function() {
        this.getData(this.link, {
          sort: 'comments',
          direction: this.sortComments.dir,
        });
        this.sortComments.isActive = true;
        this.sortCreated.isActive = false;
        this.sortComments.dir =
          this.sortComments.dir === 'desc' ? 'asc' : 'desc';
      },
      sortCreatedHandler: function() {
        this.getData(this.link, {
          sort: 'created_at',
          direction: this.sortCreated.dir,
        });
        this.sortComments.isActive = false;
        this.sortCreated.isActive = true;
        this.sortCreated.dir = this.sortCreated.dir === 'desc' ? 'asc' : 'desc';
      }
    },
    components: {
      Issue,
    },
  });
</script>

<style>
  .table {
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
    max-width: 500px;
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
      padding: 4px 5px 4px 2px;
    }

    .th {
      vertical-align: bottom;
    }
  }
</style>
