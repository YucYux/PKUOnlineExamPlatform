/* eslint-disable */
import Vue from 'vue'
import axios from 'axios'
import store from './store'
const sha256 = require("js-sha256").sha256;
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.baseURL = 'http://39.104.48.59:8080/'

export default {
    APIlogin (aUsername, aPassword) {
        return new Promise((resolve, reject) =>
        {
            aPassword = sha256(aPassword);
            axios.post('user/login/', {
                username: aUsername,
                password: aPassword
            }).then(response => {
                console.log(response);
                let aAccess = response.data.access;
                axios.defaults.headers.common['Authorization'] = 'Bearer '+aAccess;
                let aRefresh = response.data.refresh;
                axios.get('user/usertype/')
                    .then(response2 => {console.log(response2);
                                        let aStudentnumber = response2.data.student_number;
                                        let aStudentname = response2.data.student_name;
                                        store.dispatch('changeUsertype',response2.data.admin_type);
                                        store.dispatch('storeInfoWhenLogin', 
                                        {newAccess: aAccess, newRefresh: aRefresh, newUsername: aUsername,
                                        newStudentname: aStudentname, newStudentnumber: aStudentnumber});
                                        resolve(response); })
                    .catch(error2 => {reject(error2)});
            }).catch(error => { // status is not 2xx
                reject(error);
            })
        })
    }, 
    APIloginWithAccess(aAccess){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+aAccess;
    },
    APIregister(aUsername, aPassword) {
        return new Promise((resolve, reject) =>
        {
            aPassword = sha256(aPassword);
            axios.post('user/register/', {
                username: aUsername,
                password: aPassword
            }).then(response => {
                console.log(response);
                resolve(response);
            }).catch(error => { // status is not 2xx
                reject(error);
            })
        })
    }, 
    APIlogout() {
        return new Promise((resolve, reject) =>
        {
            store.dispatch('storeInfoWhenLogin', 
                        {newAccess: '', newRefresh: '', newUsername: ''});
            store.dispatch('changeFooterInfo', '您尚未登录');
            store.dispatch('changeUsertype', '');
            store.dispatch('updateClasses', []);
            store.dispatch('changeClassinfonumber', 0);
            store.dispatch('changeClassmembers', []);
            store.dispatch('changeStudentname','');
            store.dispatch('changeStudentnumber','');
        })
    },
    APIclassesList () {
        return new Promise((resolve, reject) =>
        {
            axios.defaults.headers.common['Authorization'] = 'Bearer '+store.getters.getAccess;
            axios.get('user/getclasslist/').then(response => {
                console.log(response);
                store.dispatch('updateClasses', response.data);
                store.dispatch('changeClassinfonumber', response.data[0].class_number);
                console.log(store.getters.getClasses[0]['class_name']);
                resolve(response);
            }).catch(error => {reject(error)})
        })
    },
    APIclassInfo (class_id) {
        return new Promise((resolve, reject) =>
        {
            axios.defaults.headers.common['Authorization'] = 'Bearer '+store.getters.getAccess;
            axios.get('user/getuserlist/?search='+class_id).then(response => {
                console.log(response);
                store.dispatch('changeClassmembers', response.data);
                resolve(response);
            }).catch(error => {reject(error)})
        })
    },
    APIsetUserClass (userID, classID) {
        return new Promise((resolve, reject) => 
        {
            axios.defaults.headers.common['Authorization'] = 'Bearer '+store.getters.getAccess;
            axios.post('user/setuserclass/',{
                user_id: userID,
                new_class_id: classID
            }).then(response => {
                console.log(userID);
                console.log(classID);
                console.log(response);
                resolve(response);
            }).catch(error => {reject(error);console.log(userID);
                console.log(classID);})
        })
    },
    APIsetTAClass (userID, classID) {
        return new Promise((resolve, reject) => 
        {
            axios.defaults.headers.common['Authorization'] = 'Bearer '+store.getters.getAccess;
            axios.post('user/setuserta/', {
                user_id: userID,
                new_class_id: classID
            }).then(response => {
                console.log(response);
                resolve(response);
            }).catch(error => {reject(error)})
        })
    },
    APIchangeStudentname (newStudentname) {
        return new Promise((resolve, reject) =>
        {
            axios.defaults.headers.common['Authorization'] = 'Bearer '+store.getters.getAccess;
            axios.post('user/edituserprofile/', {
                student_number: '',
                student_name: newStudentname
            }).then(response => {
                console.log(response);
                store.dispatch('changeStudentname', newStudentname);
                resolve(response);
            }).catch(error => {reject(error)})
        })
    },
    APIchangeStudentnumber (newStudentnumber) {
        return new Promise((resolve, reject) =>
        {
            axios.defaults.headers.common['Authorization'] = 'Bearer '+store.getters.getAccess;
            axios.post('user/edituserprofile/', {
                student_number: newStudentnumber,
                student_name: ''
            }).then(response => {
                console.log(response);
                store.dispatch('changeStudentnumber', newStudentnumber);
                resolve(response);
            }).catch(error => {reject(error)})
        })
    },
    APIgetContestList () {
        return new Promise((resolve, reject) =>
        {
            axios.defaults.headers.common['Authorization'] = 'Bearer '+store.getters.getAccess;
            axios.get('contest/getcontestlist/').then(response => {
                console.log(response);
                store.dispatch('changeContests', response.data);
                resolve(response);
            }).catch(error => {reject(error)})
        })
    },
    APIgetAnnouncementList() {
        return new Promise((resolve, reject) =>
        {
            axios.defaults.headers.common['Authorization'] = 'Bearer '+store.getters.getAccess;
            axios.get('announcement/getannouncementlist/').then(response => {
                console.log(response);
                store.dispatch('changeAnnouncements', response.data);
                resolve(response);
            }).catch(error => {reject(error)})
        })
    },
    APIgetQuestionList(exam_id) {
        return new Promise((resolve, reject) =>
        {
            axios.defaults.headers.common['Authorization'] = 'Bearer '+store.getters.getAccess;
            axios.post('problem/getproblemlistfromcontest/', {
                id: exam_id
            }).then(response => {
                console.log(response);
                store.commit('changeQuestionlistM', response.data);
                resolve(response);
            }).catch(error => {reject(error)})
        })
    },
    APIgetQuestionDetail(question_id) {
        return new Promise((resolve, reject) =>
        {
            axios.defaults.headers.common['Authorization'] = 'Bearer '+store.getters.getAccess;
            axios.post('problem/getproblemdetail/', {
                id: question_id
            }).then(response => {
                console.log(response);
                store.commit('changeQuestiondetailM', response.data);
                resolve(response);
            }).catch(error => {reject(error)})
        })
    },
    APIgetAllQuestions() {
        return new Promise((resolve, reject) =>
        {
            axios.defaults.headers.common['Authorization'] = 'Bearer '+store.getters.getAccess;
            axios.get('problem/getproblemlist/').then(response => {
                console.log(response);
                //store.dispatch('changeAnnouncements', response.data);
                resolve(response);
            }).catch(error => {reject(error)})
        })
    },
    APIsearchQuestionsByID(id) {
        return new Promise((resolve, reject) =>
        {
            axios.defaults.headers.common['Authorization'] = 'Bearer '+store.getters.getAccess;
            axios.post('problem/searchproblem/id/', {
                id: id
            }).then(response => {
                console.log(response);
                //store.commit('changeQuestiondetailM', response.data);
                resolve(response);
            }).catch(error => {reject(error)})
        })
    },
    APIsearchQuestionsByTag(tag) {
        return new Promise((resolve, reject) =>
        {
            axios.defaults.headers.common['Authorization'] = 'Bearer '+store.getters.getAccess;
            axios.post('problem/searchproblem/tag/', {
                tag: tag
            }).then(response => {
                console.log(response);
                //store.dispatch('changeQuestiondetail', response.data);
                resolve(response);
            }).catch(error => {reject(error)})
        })
    }
}
