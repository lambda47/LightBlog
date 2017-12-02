import 'bootstrap/dist/css/bootstrap.css';

import 'highlight.js/styles/solarized-dark.css';
import 'admin/article_editor.scss';

import 'bootstrap/dist/js/bootstrap.js';
import editor from 'editor.vue';
import imageUpload from 'imageUpload.vue';
import Message from 'message';
import {urls} from 'admin/common';
import Vue from 'vue';

$(function () {
    Vue.use(Message, {transitionName: 'message-fade', duration: 2, classPre: 'admin'});
    Vue.component('vue-img-uploader', imageUpload);
    Vue.component('vue-editor', editor);

    const DRAFT = 1;
    const PUBLISH = 2;

    let vm = new Vue({
        el: '.content',
        data: {
            article: {
                title: "",
                draft: "",
                tags: []
            },
            showPublishBar: false,
            uploadAction: urls.api_upload_image
        },
        computed: {
            editorMinHeight() {
                return document.body.clientHeight - 240;
            }
        },
        methods: {
            toDraft() {
                if (this.article.title === '') {
                    this.$message.error('请输入文章标题');
                    return;
                }
                $.post(urls.api_article_add, {
                    type: DRAFT,
                    title: this.article.title,
                    draft: this.$refs.editor.markdown()
                }).then(result => {
                    if (result.code === '1000') {
                        this.$message.info('已经保存为草稿');
                    }
                });
            },
            toPublish() {

            }
        }
    });
});