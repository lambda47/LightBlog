import 'admin/password.scss';
import Vue from 'vue';
import Menu from 'menu';
import Message from 'message';

document.addEventListener('DOMContentLoaded', function() {
    Vue.use(Menu);
    Vue.use(Message);

    let vm = new Vue({
        el: '#app'
    });
}, false);
