import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css';
import 'admin/login.scss';

import 'bootstrap-switch/dist/js/bootstrap-switch.js';
import Vue from 'vue';

$(function() {
    var vm = new Vue({
        el: '#login-panel',
        mounted: function () {
            this.$nextTick(function() {
                $(":checkbox[name='remember_me']").bootstrapSwitch();
            });
        }
    });
});