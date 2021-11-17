<template>
    <div>
    <div>index</div>
    <button @click="APItest()">APItest</button>
    </div>
</template>

<script>
import api from '../../api.js'
export default {
    methods: {
        APItest: function() {
            api.APIsetTAClass(8,1);
        }
    }
}
</script>
