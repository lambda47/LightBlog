import 'bootstrap/dist/css/bootstrap.css';

import 'highlight.js/styles/solarized-dark.css';
import 'admin/article_editor.scss';

import 'bootstrap/dist/js/bootstrap.js';
import editor from 'editor.vue';
import {urls} from 'admin/common';
import Vue from 'vue';

$(function () {
    Vue.component('vue-editor', editor);

    let vm = new Vue({
        el: '.content',
        computed: {
            editorMinHeight() {
                return document.body.clientHeight - 240;
            }
        },
        mounted() {
            // window.hljs = hljs;
            // simplemde = new SimpleMDE({
            //     element: document.querySelector('.article-editor'),
            //     autoDownloadFontAwesome: false,
            //     renderingConfig: {
		     //        singleLineBreaks: false,
		     //        codeSyntaxHighlighting: true,
	         //    }
            // });
            //
            // var testPlain = simplemde.value()
            // var testMarkdown = simplemde.markdown('```php\n' +
            //     'echo $a;\n' +
            //     '```');
            // console.log(testMarkdown);
            // let doms = document.querySelectorAll('.CodeMirror, .CodeMirror-scroll');
            // for (let dom of doms) {
            //     dom.style.minHeight = (document.body.clientHeight - 250) + 'px';
            // }
        }
    });
});