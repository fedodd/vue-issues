import axios from 'axios';

export default {
  actions: {
    pseudoFetchIssues(ctx, issues) {
      ctx.commit('updateIssues', issues);
    },
    filterIssues(ctx, checked) {
      ctx.commit('filterIssues', checked);
    },
  },
  mutations: {
    updateIssues(state, issues) {
      state.issues = issues;
    },
    filterIssues(state) {
      state.filteredIssues = state.issues.filter((elem) => elem.comments > 0);
    },
  },
  state: {
    issues: [],
    filteredIssues: [],
    pageButtons: {},
    link: 'https://api.github.com/repositories/11730342/issues?state=open&per_page=20',
    linkParams: {},
    loading: true,
    errored: false,
    isFiltered: false,
  },
  getters: {
    allIssues(state) {
      return state.issues;
    },
    filteredIssues(state) {
      return state.filterIssues;
    },
    //make string id to number
    targetIssue: (state) => (targetId) => {
      return state.issues.find((el) => el.id === +targetId);
    },
  },
};
