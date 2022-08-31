import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import LogoutView from "../views/LogoutView.vue";
import ScoresIndex from "../views/ScoresIndex.vue";
import ScoresNew from "../views/ScoresNew.vue";
import ScoresShow from "../views/ScoresShow.vue";
import ScoresEdit from "../views/ScoresEdit.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  { path: "/signup", name: "signup", component: SignupView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/logout", name: "logout", component: LogoutView },
  { path: "/scores", name: "scores-index", component: ScoresIndex },
  { path: "/scores/new", name: "scores-new", component: ScoresNew },
  { path: "/scores/:id", name: "scores-show", component: ScoresShow },
  { path: "/scores/:id/edit", name: "scores-edit", component: ScoresEdit },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
