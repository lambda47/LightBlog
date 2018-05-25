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
import 'highlight.js/styles/solarized-dark.css';

import SimpleMDE from 'simplemde';
import hljs from 'highlight.js';
import request from '../../js/util/request';

export default {
    props: {
        article: {type: String, default: ''},
        minHeight: {type: Number, default: 300},
        name: {type: String, default: 'file'},
        uploadAction: {type: String, default: ''},
        uploadParams: {type: Object, defalut: {}}
    },

    data() {
        return {
            simplemde: null
        };
    },

    methods: {
        markdown(value = null) {
            if (value === null)
                return this.simplemde.value();
            else
                this.simplemde.value(value);
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
        },
        async uploadImage(file) {
            let cm = this.simplemde.codemirror;
            let start = cm.getCursor();
            cm.replaceSelection('![](uploading...)');
            let end = cm.getCursor();
            cm.setOption('readOnly', true);

            try {
                let {code, msg, data} = await request(this.uploadAction, 'POST',
                    {...this.uploadParams, [this.name]: file});
                if (code === 1000) {
                    cm.replaceRange(`![](${data.url})`, start, end);
                } else {
                    cm.replaceRange('![]()', start, end);
                }
            } catch(err) {
                cm.replaceRange('![]()', start, end);
            } finally {
                cm.setOption('readOnly', false);
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
            let file = event.dataTransfer.files[0];
            this.uploadImage(file);
        });

        // 粘贴上传
        cm.on('paste', (editor, event) => {
            let file = null;
            if (event.clipboardData.items) {
                for (let item of event.clipboardData.items) {
                    if (item.kind === 'file') {
                        let fileType = item.type;
                        if (fileType.indexOf('image/') === 0) {
                            let fileExt = fileType.split('/').pop();
                            let blob = item.getAsFile();
                            file = new File([blob], `image.${fileExt}`,
                                {type: fileType});
                        }
                    }
                }
            }

            if (file) {
                this.uploadImage(file);
            }
        });
    }
}
</script>