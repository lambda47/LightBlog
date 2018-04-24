import 'bootstrap/dist/css/bootstrap.css';
import 'admin/index.scss';

import 'bootstrap/dist/js/bootstrap.js';
import Vue from 'vue';
import Menu from 'menu';

document.addEventListener('DOMContentLoaded', function () {
    Vue.use(Menu);
    new Vue({
        el: '#app'
    });
}, false);