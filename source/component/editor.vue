<template>
    <textarea class="article-editor">{{article}}</textarea>
</template>
<style>
.editor-dragover {
    border: 3px dashed #ddd;
    padding: 8px;
}
</style>
<script>
import 'simplemde/dist/simplemde.min.css';
import 'font-awesome/css/font-awesome.min.css';

import SimpleMDE from 'simplemde';
import hljs from 'highlight.js';

export default {
    props: {
        article: {type: String, default: ''},
        minHeight: {type: Number, default: 300},
        uploadAction: {type: String, default: ''},
        uploadParams: {type: Object, defalut: {}}
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
        },
        editorStyle(dragOver) {
            let codeMirrorEditor = document.querySelector('.CodeMirror');
            if (dragOver) {
                codeMirrorEditor.classList.add('editor-dragover');
            } else {
                codeMirrorEditor.classList.remove('editor-dragover');
            }
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

        // 设置编辑区最小高度
        document.querySelectorAll('.CodeMirror, .CodeMirror-scroll').forEach(dom => {
            dom.style.minHeight = this.minHeight + 'px';
        });

        let cm = this.simplemde.codemirror;

        // 图片拖拽到编辑区
        cm.on('dragover', () => {
            this.editorStyle(true);
        });

        // 图片拖拽出编辑区
        cm.on('dragleave', () => {
            this.editorStyle(false);
        });

        // 拖拽释放上传图片
        cm.on('drop', (editor, event) => {
            this.editorStyle(false);

            let cm = this.simplemde.codemirror;
            let start = cm.getCursor();
            cm.replaceSelection('![](uploading...)');
            let end = cm.getCursor();
            cm.setOption('readOnly', true);

            let file = event.dataTransfer.files[0];
            let formData = new FormData();
            formData.append('image', file);
            for (let key in this.uploadParams) {
                formData.append(key, this.uploadParams[key]);
            }
            $.ajax({
                url: this.uploadAction,
                type: 'post',
                data: formData,
                cache: false,
                processData: false,
                contentType: false,
            }).then(result => {
                cm.replaceRange(`![](${result.data.url})`, start, end);
                cm.setOption('readOnly', false);
            }).fail(() => {
                cm.replaceRange('![]()', start, end);
                cm.setOption('readOnly', false);
            });
        });
    }
}
</script>