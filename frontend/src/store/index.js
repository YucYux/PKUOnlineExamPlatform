import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state={
    access: '',
    refresh: ''
};
const getters = {   
    getAccess(state) {
        return state.access;
    },
    getRefresh(state) {
        return state.refresh;
    }
};
const mutations = {
    changeAccess(state, newAccess) {
        state.access = newAccess;
    },
    changeRefresh(state, newRefresh) {
        state.refresh = newRefresh;
    }
};
const store = new Vuex.Store({
    state,
    getters
});
 
export default store;