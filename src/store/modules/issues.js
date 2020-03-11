import axios from "axios";

export default {
  actions: {
    pseudoFetchIssues(ctx, issues) {
      ctx.commit('updateIssues', issues)
    },
    sortIssues(ctx, direction) {
      ctx.commit('sortIssues', direction)
    },
    filterIssues(ctx, checked) {
      ctx.commit('filterIssues', checked)
    }
  },
  mutations: {
    updateIssues(state, issues) {
      state.issues = issues;
    },
    sortIssues(state, direction) {
      function sort(a, b) {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase()
        if (aTitle > bTitle) {
          return 1;
        } else if (aTitle < bTitle) {
          return -1;
        }
        return 0;
      }

      if (direction) {
        state.issues.sort((a, b) => sort(b, a))
      } else {
        state.issues.sort((a, b) => sort(a, b))
      }
    },
    filterIssues(state, checked) {
      checked ?
        state.issues = state.issues.filter(elem => elem.comments > 0) : null;
    }
  },
  state: {
    issues: [],
    pageButtons: {},
    link: 'https://api.github.com/repositories/11730342/issues?state=open&per_page=20',
    linkParams: {},
    loading: true,
    errored: false,
  },
  getters: {
    allIssues(state) {
      return state.issues
    },
    targetIssue: state => targetId => {
      return state.issues.find(el => el.id === +targetId);
    }
  }
}
