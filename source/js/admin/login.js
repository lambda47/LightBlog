import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css';
import 'admin/login.scss';

import 'bootstrap-switch/dist/js/bootstrap-switch.js';
import Vue from 'vue';
import {urls} from 'admin/common'
import userService from './service/user';

$(function() {
    Vue.component('vue-form', vueForm);

    let vm = new Vue({
        el: '#login-panel',
        data: {
            username: {
                value: '',
                show_err: false,
                err_msg: ''
            },
            password: {
                value: '',
                show_err: false,
                err_msg: ''
            }
        },
        methods: {
            clearErrMsg(event) {
                if (event.target.name === 'username') {
                    this.username.show_err = false;
                } else if (event.target.name === 'password') {
                    this.password.show_err = false;
                }
            },
            loginValid() {
                if (this.username.value === '') {
                    this.username.err_msg = '请输入用户名';
                    this.username.show_err = true;
                    return false;
                } else {
                    this.username.show_err =false;
                }

                if (this.password.value === '') {
                    this.password.err_msg = '请输入密码';
                    this.password.show_err = true;
                    return false;
                } else {
                    this.password.show_err =false;
                }
                return true;
            },
            async login() {
                if (this.loginValid()) {
                    let {code, msg, data} = await userService.login(this.username.value,
                        this.password.value);
                    if (code === '1000') {
                        document.location.href = urls.view_admin_index;
                    } else {
                        if (!this.username.show_err && code === '1102' || code === '1104') {
                            this.username.err_msg = msg;
                            this.username.show_err = true;
                        } else if (!this.password.show_err && code === '1103'
                                || code === '1105') {
                            this.password.err_msg = msg;
                            this.password.show_err = true;
                        }
                    }
                }
            }
        },
        mounted() {
            this.$nextTick(function() {
                $(":checkbox[name='remember_me']").bootstrapSwitch();
            });
        }
    });
});