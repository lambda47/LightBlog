import 'admin/index.scss';

import Vue from 'vue';
import Menu from 'menu';

document.addEventListener('DOMContentLoaded', function () {
    Vue.use(Menu);
    new Vue({
        el: '#app'
    });
}, false);