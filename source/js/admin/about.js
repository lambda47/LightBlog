import 'admin/about.scss';

import Editor from 'editor';
import Message from 'message';
import Vue from 'vue';
import Menu from 'menu'

document.addEventListener('DOMContentLoaded', function() {
    Vue.use(Menu);
    Vue.use(Message, {transitionName: 'message-fade', duration: 2, classPre: 'admin'});
    Vue.use(Editor);

    let vm = new Vue({
        el: '#app'
    });
}, false);