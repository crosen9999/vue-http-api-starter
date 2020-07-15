import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        xuserJWT: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMSIsInVzZXJuYW1lIjoiam9obiJ9LCJpYXQiOjE1OTQ3NDQxNTJ9.KoYZcSflr3y41L2mwW7Z6O0tEKm01bpZTB6y8tuW4n4",
        userJWT: ""
    },
    mutations: {
        setUserJWT(state, token){
            state.userJWT = token;
        }

    },
    getters: {
        userJWTToken(state) {
        return state.userJWT;
        }
    }
});
