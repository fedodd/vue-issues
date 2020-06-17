import Vue from "vue";
import Router from "vue-router";
import IssueList from "./views/IssueList";
import IssuePage from "./views/IssuePage";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [{
      path: "/",
      component: () => import("./views/IssueList")
    },
    {
      path: "/issues/:id",
      component: IssuePage,
      props: true
    }
  ]
});
