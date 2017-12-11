import 'admin/login.scss';

import Vue from 'vue';
import Switch from 'switch';
import {urls} from 'admin/common'
import userService from './service/user';

document.addEventListener('DOMContentLoaded', function() {
    Vue.use(Switch);
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
                    const remember_me = this.$refs.remember_me.value;
                    let {code, msg, data} = await userService.login(this.username.value,
                        this.password.value, remember_me);
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
        }
    });
}, false);