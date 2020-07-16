import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "y" */ "../views/ViewArticles.vue"),
      children: [
      {
        path: "/articleview/:ArticleID/:edit",
        name: "ViewArticle",
        props: true,
        component: () => 
          import(/* webpackChunkName: "article" */ "../components/Article.vue")
      },
      {
        path: "/articleadd/",
        name: "AddArticle",
        props: true,
        component: () => 
          import(/* webpackChunkName: "article" */ "../views/AddArticle.vue")
      },
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
