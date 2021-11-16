import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state={
    access: 'none',
    refresh: 'none',
    username: 'none',
    footerInfo: '您尚未登录',
    usertype: 'none', 
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
    },
    getFooterInfo(state) {
        return state.footerInfo;
    },
    getUsertype(state) {
        return state.usertype;
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
    },
    changeFooterInfoM(state, newInfo) {
        state.footerInfo = newInfo;
    },
    changeUsertypeM(state, newUsertype) {
        state.usertype = newUsertype;
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
    changeFooterInfo(context, newInfo) {
        context.commit('changeFooterInfoM', newInfo);
    },  
    changeUsertype(context, newUsertype) {
        context.commit('changeUsertypeM', newUsertype);
    },
    storeInfoWhenLogin(context, newInfo) {
        context.commit('changeAccessM', newInfo.newAccess);
        context.commit('changeRefreshM', newInfo.newRefresh);
        context.commit('changeUsernameM', newInfo.newUsername);
    },
     

};
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
 
export default store;