import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "y" */ "../views/Home.vue"),
    children: [
      {
        path: "/articleview/:ArticleID",
        name: "ArticleView",
        props: true,
        component: () => 
          import(/* webpackChunkName: "article" */ "../components/Article.vue")
      }
    ]
  },
  {
    path: "/viewa",
    name: "ViewA",
    component: () =>
      import(/* webpackChunkName: "x" */ "../views/ViewA.vue")
  },  
];

const router = new VueRouter({
  routes
});

export default router;
