import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [
  {
    path: "/viewa",
    name: "ViewA",
    component: () =>
      import(/* webpackChunkName: "x" */ "../views/ViewA.vue")
  },
  {
    path: "/viewb",
    name: "ViewB",
    component: () =>
      import(/* webpackChunkName: "y" */ "../views/ViewB.vue"),
    children: [
      {
        path: "/article/:ArticleID",
        name: "Article",
        props: true,
        component: () => 
          import(/* webpackChunkName: "z" */ "../components/Article.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
