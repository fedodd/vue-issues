<template>
  <div>
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
        issues: [...this.$store.getters.allIssues],
        sortReverse: false
      }
    },
    methods: {
      sort: function () {
        if (this.sortReverse) {
          //need to create one sort function with params and replace params in dif calls
          this.issues.sort((b, a) => {
            const aTitle = a.title.toLowerCase();
            const bTitle = b.title.toLowerCase()
            if (aTitle > bTitle) {
              return 1;
            } else if (aTitle < bTitle) {
              return -1;
            }
            return 0;
          })
        } else {
          this.issues.sort((a, b) => {
            const aTitle = a.title.toLowerCase();
            const bTitle = b.title.toLowerCase()
            if (aTitle > bTitle) {
              return 1;
            } else if (aTitle < bTitle) {
              return -1;
            }
            return 0;
          })
        }


        this.sortReverse = !this.sortReverse;


      },
      filter: function() {
        const filteredIssues = this.issues.filter(elem => elem.comments > 0);
        this.issues = filteredIssues;
      }
    },
    mounted() {
      console.log('mounted');

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
