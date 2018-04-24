import 'bootstrap/dist/css/bootstrap.css';
import 'admin/article_list.scss';

import 'bootstrap/dist/js/bootstrap.js';
import Vue from 'vue';
import Menu from 'menu'

document.addEventListener('DOMContentLoaded', function() {
    Vue.use(Menu);

    let vm = new Vue({
        el: '#app',
        data: {

        },

    });
}, false);