import Vue from "vue";
import Router from "vue-router";
import IssueList from "./views/IssueList.vue";
import IssuePage from "./views/IssuePage.vue";

Vue.use(Router);

export default new Router({

  routes: [
    {
      path: "/",
      component: IssueList
    },
    {
      path: "/issues/:id",
      component: IssuePage
    }
  ]
});
