import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "x" */ "../views/Login.vue"),
  },
  {
    path: "/createaccount",
    name: "CreateAccount",
    component: () =>
      import(/* webpackChunkName: "x" */ "../views/CreateAccount.vue"),
  },
  {
    path: "/articles",
    name: "ViewArticles",
    component: () =>
      import(/* webpackChunkName: "y" */ "../views/ViewArticles.vue"),
    children: [
      {
        path: "articleview/:ArticleID/:edit",
        name: "ViewArticle",
        props: true,
        component: () =>
          import(/* webpackChunkName: "article" */ "../views/ViewArticle.vue"),
      },
      {
        path: "articleadd",
        name: "AddArticle",
        props: true,
        component: () =>
          import(/* webpackChunkName: "article" */ "../views/AddArticle.vue"),
      },
    ],
  },
  {
    path: "/viewa",
    name: "ViewA",
    component: () => import(/* webpackChunkName: "x" */ "../views/ViewA.vue"),
    children: [
      {
        path: "viewa1",
        name: "ViewA1",
        props: true,
        component: () =>
          import(/* webpackChunkName: "article" */ "../views/ViewA1.vue"),
      },
    ],
  },
  {
    path: "/viewb",
    name: "ViewB",
    component: () => import(/* webpackChunkName: "x" */ "../views/ViewB.vue"),
  },
  {
    path: "/viewc",
    name: "ViewC",
    component: () => import(/* webpackChunkName: "x" */ "../views/ViewC.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
