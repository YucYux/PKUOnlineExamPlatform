/* eslint-disable */
import Vue from 'vue'
import axios from 'axios'
import store from './store'

axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.baseURL = 'http://39.104.48.59:8080/'

export default {
    APIlogin (aUsername, aPassword) {
        return new Promise((resolve, reject) =>
        {
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
                                        store.dispatch('changeUsertype',response2.data.admin_type);
                                        store.dispatch('storeInfoWhenLogin', 
                                        {newAccess: aAccess, newRefresh: aRefresh, newUsername: aUsername});
                                        resolve(response); })
                    .catch(error2 => {reject(error2)});
            }).catch(error => { // status is not 2xx
                reject(error);
            })
        })
    }, 
    APIregister(aUsername, aPassword) {
        return new Promise((resolve, reject) =>
        {
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
                        {newAccess: 'none', newRefresh: 'none', newUsername: 'none'});
            store.dispatch('changeFooterInfo', '您尚未登录');
            store.dispatch('changeUsertype', 'none');
            store.dispatch('updateClasses', []);
            store.dispatch('changeClassinfonumber', 0);
            store.dispatch('changeClassmembers', []);
        })
    },
    APIclassesList () {
        return new Promise((resolve, reject) =>
        {
            axios.defaults.headers.common['Authorization'] = 'Bearer '+store.getters.getAccess;
            axios.get('user/getclasslist/').then(response => {
                console.log(response);
                store.dispatch('updateClasses', response.data);
                console.log(store.getters.getClasses[0]['class_name']);
                resolve(response);
            }).catch(error => {reject(error)})
        })
    },
    APIclassInfo () {
        return new Promise((resolve, reject) =>
        {
            axios.defaults.headers.common['Authorization'] = 'Bearer '+store.getters.getAccess;
            axios.get('user/getuserlist/?search='+1).then(response => {
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
                console.log(response);
                resolve(response);
            }).catch(error => {reject(error)})
        })
    },
    APIsetTAClass (userID, classID) {
        return new Promise((resolve, reject) => 
        {
            axios.defaults.headers.common['Authorization'] = 'Bearer '+store.getters.getAccess;
            axios.post('user/setuserta/',{
                user_id: userID,
                new_class_id: classID
            }).then(response => {
                console.log(response);
                resolve(response);
            }).catch(error => {reject(error)})
        })
    },
}
