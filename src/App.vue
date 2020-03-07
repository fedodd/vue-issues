
<template>
  <div class="holder">
    <h1>
      {{name}}
    </h1>


    <IssueTable
      v-if="issues.length"
      v-bind:issues-data="issues"
      v-bind:filterData="getData"
      v-bind:link="link"
      ></IssueTable>
    <Pagination
      v-bind:pageButtons="pageButtons"
      v-bind:getData="getData"/>
  </div>
</template>

<script lang="ts">
  import axios from 'axios';
  import Vue from "vue";
  import parse from 'github-parse-link';
  import IssueTable from './components/issueTable/IssueTable';
  import Pagination from "./components/Pagination";


  export default Vue.extend({
    data: function() {
      return {
        name: 'Список открытых задач по репозеторию vue:',
        issues: [],
        pageButtons: {},
        link: 'https://api.github.com/repositories/11730342/issues?state=open&per_page=20',
      }
    },

    methods: {
      getData: function (link) {
        async function getIssues(callback) {

          try {
            const response = await axios.get(link);
            callback(response);

          } catch (error) {
            console.error(error);
          }
        }

        //update data after request
        getIssues((response) => {
          const {first, prev, next, last} = parse(response.headers.link);
          this.pageButtons = {
            'Первая': first,
            'Пред.': prev,
            'След.': next,
            'Послед.': last
          };

          this.link = response.config.url
          this.issues = response.data
        });

        function updateQuery(response) {

        }
      }
    },
    created() {
      this.getData(this.link);
    },
    components: {
      IssueTable,
      Pagination
    }
  });
</script>


<style>

  body {
    font-family: Arial, Helvetica, sans-serif;
  }

  h1 {
    width: max-content;
    max-width: 80vw;
  }


  .holder {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .button {
    background-color: darkmagenta;
    color: white;
    border: none;
    border-radius: 2px;
    padding: 5px;
    margin-right: 20px;
    transition: .3s;
    outline: none;
  }

  .button:hover {
    cursor: pointer;
    box-shadow: 2px 3px 5px 1px rgba(0,0,0,0.75);
  }

  .button:hover:disabled {
    cursor:not-allowed;
    box-shadow: none;
  }

  .button:last-child {
    margin-right: 0;
  }

  .button:disabled {
    background-color: grey;
    color: lightgrey;
  }

  .button.is__filter {
    display: inline-block;
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border: 10px solid transparent;
    border-top-color: darkmagenta;
    background-color: transparent;
    padding: 0
  }

  .button.button.is__filter:hover {
    box-shadow: none;
  }

    @media (max-width: 400px) {
    h1 {
      font-size: 1.2em;
      width: 100%;
      padding: 5px;
    }
    .holder {
      margin: 5px;
    }
  }


</style>
