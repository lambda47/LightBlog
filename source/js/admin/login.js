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
        methods: {
            loginSuccess: function(data) {
                if (data.code == '1000') {

                } else {
                    alert(data.msg);
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