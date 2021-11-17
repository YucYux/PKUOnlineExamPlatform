import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state={
    access: 'none',
    refresh: 'none',
    username: 'none',
    footerInfo: '您尚未登录',
    usertype: 'none', 
    classes: []
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
    },
    getClasses(state) {
        return state.classes;
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
    },
    updateClassesM(state, newClasses) {
        state.classes = newClasses;
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
    updateClasses(context, newClasses) {
        context.commit('updateClassesM', newClasses);
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