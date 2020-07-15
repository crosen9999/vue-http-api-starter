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
    path: "/home",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "y" */ "../views/Home.vue"),
    children: [
      {
        path: "/article/:ArticleID",
        name: "Article",
        props: true,
        component: () => 
          import(/* webpackChunkName: "article" */ "../components/Article.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
