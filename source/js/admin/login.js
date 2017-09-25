import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css';
import 'admin/login.scss';

import 'bootstrap-switch/dist/js/bootstrap-switch.js';
import Vue from 'vue';
import vueForm from 'form.vue';

$(function() {
    Vue.component('vue-form', vueForm);

    var vm = new Vue({
        el: '#login-panel',
        data: {
            username: '',
            password: '',
            username_show_err: false,
            username_err_msg: '',
            password_show_err: false,
            password_err_msg: ''
        },
        methods: {
            clearErrMsg: function(event) {
                if (event.target.name == 'username') {
                    this.username_show_err = false;
                } else if (event.target.name == 'password') {
                    this.password_show_err = false;
                }
            },
            loginValid: function () {
                if (this.username == '') {
                    this.username_err_msg = '请输入用户名';
                    this.username_show_err = true;
                    return false;
                } else {
                    this.username_show_err =false;
                }

                if (this.password == '') {
                    this.password_err_msg = '请输入密码';
                    this.password_show_err = true;
                    return false;
                } else {
                    this.password_show_err =false;
                }
                return true;
            },
            loginSuccess: function(data) {
                if (data.code == '1000') {

                } else {
                    if (data.code == 1102 || data.code == 1104) {
                        this.username_err_msg = data.msg;
                        this.username_show_err = true;
                    } else if (data.code == 1103 || data.code == 1105) {
                        this.password_err_msg = data.msg;
                        this.password_show_err = true;
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