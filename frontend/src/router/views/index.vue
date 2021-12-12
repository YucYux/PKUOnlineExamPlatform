/* eslint-disable */
<template>
    <div v-if="username != ''">
        <div>index</div>
        <button @click="APItest()">APItest</button>
        <board></board>
    </div>
    <div v-else>
        <div>您尚未登录，主页将不会显示任何信息。</div>
    </div>
</template>

<script>
import api from '../../api.js'
import store from '../../store'
import board from '../../components/announcement_board.vue'
export default {
    methods: {
        APItest: function() {
            api.APItemp();
        }
    },
    computed: {
        username: function() {
            return store.getters.getUsername;
        }
    },
    components: {
        board
    }
}
</script>