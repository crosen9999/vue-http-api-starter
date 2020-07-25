import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userJWT: "",
    UserName: "",
    update: 0,
    noNav: false,
    ArticleID: 0,
  },
  mutations: {
    setUserJWT(state, token) {
      state.userJWT = token;
    },
    setUserName(state, UserName) {
      state.UserName = UserName;
    },
    setUpdate(state, update) {
      state.update = update;
    },
    setNoNav(state, noNav) {
      state.noNav = noNav;
    },
    setArticleID(state, ArticleID) {
      state.ArticleID = ArticleID;
    },
  },
  getters: {
    userJWTToken(state) {
      return state.userJWT;
    },
    UserName(state) {
      return state.UserName;
    },
    update(state) {
      return state.update;
    },
    noNav(state) {
      return state.noNav;
    },
    ArticleID(state) {
      return state.ArticleID;
    },
  },
});
