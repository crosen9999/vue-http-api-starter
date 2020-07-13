import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [
  {
    path: "/viewa",
    name: "ViewA",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ViewA.vue")
  },
  {
    path: "/viewb",
    name: "ViewB",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ViewB.vue"),
    children: [
      {
        path: "/article",
        name: "Article",
        props: true,
        component: () => 
          import(/* webpackChunkName: "about" */ "../components/Article.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
