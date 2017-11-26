import 'bootstrap/dist/css/bootstrap.css';

import 'highlight.js/styles/solarized-dark.css';
import 'admin/article_editor.scss';

import 'bootstrap/dist/js/bootstrap.js';
import editor from 'editor.vue';
import imageUpload from 'imageUpload.vue';
import {urls} from 'admin/common';
import Vue from 'vue';

$(function () {
    Vue.component('vue-img-uploader', imageUpload);
    Vue.component('vue-editor', editor);

    let vm = new Vue({
        el: '.content',
        computed: {
            editorMinHeight() {
                return document.body.clientHeight - 240;
            }
        }
    });
});