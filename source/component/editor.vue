<template>
    <textarea class="article-editor">{{article}}</textarea>
</template>

<script>
import 'simplemde/dist/simplemde.min.css';
import 'font-awesome/css/font-awesome.min.css';

import SimpleMDE from 'simplemde';
import hljs from 'highlight.js';

export default {
    props: {
        article: {type: String, default: ''},
        minHeight: {type: Number, default: 300}
    },

    data() {
        return {
            simplemde: null
        };
    },

    methods: {
        markdown() {
            return this.simplemde.value();
        },
        html() {
            return this.simplemde.markdown(this.markdown());
        }
    },

    mounted() {
        // highlight.js
        window.hljs = hljs;
        // SimpleMDE
        this.simplemde = new SimpleMDE({
            element: document.querySelector('.article-editor'),
            autoDownloadFontAwesome: false,
            renderingConfig: {
                singleLineBreaks: false,
                codeSyntaxHighlighting: true,
            }
        });

        document.querySelectorAll('.CodeMirror, .CodeMirror-scroll').forEach(dom => {
            dom.style.minHeight = this.minHeight + 'px';
        });
    }
}
</script>