import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state={
    access: '',
    refresh: '',
    username: ''
};
const getters = {   
    getAccess(state) {
        return state.access;
    },
    getRefresh(state) {
        return state.refresh;
    },
    getUsername(state) {
        return state.username;
    }
};
const mutations = {
    changeAccessM(state, newAccess) {
        state.access = newAccess;
    },
    changeRefreshM(state, newRefresh) {
        state.refresh = newRefresh;
    },
    changeUsernameM(state, newUsername) {
        state.username = newUsername;
    }
};
const actions = {
    changeAccess(context, newAccess) {
        context.commit('changeAccessM', newAccess);
    },
    changeRefresh(context, newRefresh) {
        context.commit('changeRefreshM', newRefresh);
    },
    changeUsername(context, newUsername) {
        context.commit('changeUsernameM', newUsername);
    },
    storeInfoWhenLogin(context, newAccess, newRefresh, newUsername) {
        context.commit('changeAccessM', newAccess);
        context.commit('changeRefreshM', newRefresh);
        context.commit('changeUsernameM', newUsername);
    }
};
const store = new Vuex.Store({
    state,
    getters
});
 
export default store;