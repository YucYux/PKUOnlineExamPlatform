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
                let aAccess = response.data.access;
                axios.defaults.headers.common['Authorization'] = 'Bearer '+aAccess;
                let aRefresh = response.data.refresh;
                store.dispatch('storeInfoWhenLogin', 
                    {newAccess: aAccess, newRefresh: aRefresh, newUsername: aUsername});
                axios.get('user/usertype/')
                    .then(function (response2) {store.dispatch('changeUsertype',response2.data)})
                    .catch(error => {reject(error2)});
                resolve(response); 
            }).catch(error => { // status is not 2xx
                reject(error);
            })
        })
    }, 
    APIclassesList () {
        return new Promise((resolve, reject) =>
        {
            axios.get('user/')
        })
    }
}

