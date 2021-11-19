/* eslint-disable */
<template>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="助教ID">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit(formInline)">添加助教</Button>
        </FormItem>
    </Form>
</template>
<script>
import api from '../api.js'
import store from '../store'
    export default {
        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                api.APIsetTAClass(parseInt(name.user), store.getters.getClassinfonumber).
                then(response => {this.$Notice.success({title: '修改成功', desc: ''})}).
                catch(error => {this.$Notice.error({title: '修改失败', desc: ''})})
            }
        }
    }
</script>