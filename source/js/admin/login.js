import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css';
import 'admin/login.scss';

import 'bootstrap-switch/dist/js/bootstrap-switch.js';
import Vue from 'vue';
import vueForm from 'form.vue';
import {urls} from 'admin/common'

$(function() {
    Vue.component('vue-form', vueForm);

    var vm = new Vue({
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
            clearErrMsg: function(event) {
                if (event.target.name == 'username') {
                    this.username.show_err = false;
                } else if (event.target.name == 'password') {
                    this.password.show_err = false;
                }
            },
            loginValid: function () {
                if (this.username.value == '') {
                    this.username.err_msg = '请输入用户名';
                    this.username.show_err = true;
                    return false;
                } else {
                    this.username.show_err =false;
                }

                if (this.password.value == '') {
                    this.password.err_msg = '请输入密码';
                    this.password.show_err = true;
                    return false;
                } else {
                    this.password.show_err =false;
                }
                return true;
            },
            loginSuccess: function(data) {
                if (data.code == '1000') {
                    document.location.href = urls.view_admin_index;
                } else {
                    if (!this.username.show_err
                            && data.code == 1102 || data.code == 1104) {
                        this.username.err_msg = data.msg;
                        this.username.show_err = true;
                    } else if (!this.password.show_err
                            && data.code == 1103 || data.code == 1105) {
                        this.password.err_msg = data.msg;
                        this.password.show_err = true;
                    }
                }
            }
        },
        mounted: function () {
            this.$nextTick(function() {
                $(":checkbox[name='remember_me']").bootstrapSwitch();
            });
        }
    });
});