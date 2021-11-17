<template>
    <div>
    <div>index</div>
    <button @click="APItest()">APItest</button>
    </div>
</template>

<script>
import api from '../../api.js'
import store from '../../store'
export default {
    methods: {
        APItest: function() {
            api.APIclassInfo();
        }
    }
}
</script>
