import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userJWT: "",
        UserName: ""
    },
    mutations: {
        setUserJWT(state, token){
            state.userJWT = token;
        },
        setUserName(state, UserName){
            state.UserName = UserName;
        }

    },
    getters: {
        userJWTToken(state) {
            return state.userJWT;
        },
        UserName(state) {
            return state.UserName;
        }
    }
});
