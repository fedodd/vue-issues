import axios from "axios";

export default {
  actions: {
    pseudoFetchIssues(ctx, issues) {
      ctx.commit("updateIssues", issues);
    }
  },
  mutations: {
    updateIssues(state, issues) {
      state.issues = issues;
    }
  },
  state: {
    issues: [],
    pageButtons: {},
    link:
      "https://api.github.com/repositories/11730342/issues?state=open&per_page=20",
    linkParams: {},
    loading: true,
    errored: false
  },
  getters: {
    allIssues(state) {
      return state.issues;
    },
    //make string id to number
    targetIssue: state => targetId => {
      return state.issues.find(el => el.id === +targetId);
    }
  }
};
