/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
  access: '',
  refresh: '',
  username: '',
  footerInfo: '您尚未登录',
  usertype: '',
  student_name: '',
  student_number: '',
  classes: [],
  classinfonumber: 0,
  classmembers: [],
  contests: [],
  announcements: [],
  questionlist: [],
  questiondetail: {},
  allquestions: []
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
  },
  getClassinfonumber(state) {
    return state.classinfonumber;
  },
  getClassmembers(state) {
    return state.classmembers;
  },
  getStudentnumber(state) {
    return state.student_number;
  },
  getStudentname(state) {
    return state.student_name;
  },
  getContests(state) {
    return state.contests;
  },
  getAnnouncements(state) {
    return state.announcements;
  },
  getQuestionlist(state) {
    return state.questionlist;
  },
  getQuestiondetail(state) {
    return state.questiondetail;
  },
  getAllquestions(state) {
    return state.allquestions;
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
  },
  changeClassinfonumberM(state, newClassinfonumber) {
    state.classinfonumber = newClassinfonumber;
  },
  changeClassmembersM(state, newClassmembers) {
    state.classmembers = newClassmembers;
  },
  changeStudentnameM(state, newStudentname) {
    state.student_name = newStudentname;
  },
  changeStudentnumberM(state, newStudentnumber) {
    state.student_number = newStudentnumber;
  },
  changeContestsM(state, newContests) {
    state.contests = newContests;
  },
  changeAnnouncementsM(state, newAnnouncements) {
    state.announcements = newAnnouncements;
  },
  changeQuestionlistM(state, newQuestionlist) {
    state.questionlist = newQuestionlist;
  },
  changeQuestiondetailM(state, newQuestiondetail) {
    state.questiondetail = newQuestiondetail;
  },
  changeAllquestionsM(state, newAllquestions) {
    state.allquestions = newAllquestions;
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
  changeClassinfonumber(context, newClassinfonumber) {
    context.commit('changeClassinfonumberM', newClassinfonumber);
  },
  changeClassmembers(context, newClassmembers) {
    context.commit('changeClassmembersM', newClassmembers);
  },
  changeStudentname(context, newStudentname) {
    context.commit('changeStudentnameM', newStudentname);
  },
  changeStudentnumber(context, newStudentnumber) {
    context.commit('changeStudentnumberM', newStudentnumber);
  },
  changeContests(context, newContests) {
    context.commit('changeContestsM', newContests);
  },
  changeAnnouncements(context, newAnnouncements) {
    context.commit('changeAnnouncementsM', newAnnouncements);
  },
  changeQuestionlist(context, newQuestionlist) {
    context.commit('changeQuestionlistM', newQuestionlist);
  },
  changeQuestiondetail(context, newQuestiondetail) {
    context.commit('changeQuestiondetailM', newQuestiondetail);
  },
  changeAllquestions(context, newAllquestions) {
    context.commit('changeAllquestionsM', newAllquestions);
  },
  storeInfoWhenLogin(context, newInfo) {
    context.commit('changeAccessM', newInfo.newAccess);
    context.commit('changeRefreshM', newInfo.newRefresh);
    context.commit('changeUsernameM', newInfo.newUsername);
    context.commit('changeStudentnameM', newInfo.newStudentname);
    context.commit('changeStudentnumberM', newInfo.newStudentnumber);
  },

};
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store;
