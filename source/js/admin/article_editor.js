import 'bootstrap/dist/css/bootstrap.css';
import 'admin/article_editor.scss';

import 'bootstrap/dist/js/bootstrap.js';
import editor from 'editor.vue';
import ImageUpload from 'image-upload';
import Message from 'message';
import {urls, matchImageUrl} from 'admin/common';
import Vue from 'vue';
import tagService from './service/tag'
import articleService from './service/article'

$(function () {
    Vue.use(Message, {transitionName: 'message-fade', duration: 2, classPre: 'admin'});
    Vue.use(ImageUpload);
    Vue.component('vue-editor', editor);

    const DRAFT = 1;
    const PUBLISH = 2;

    const NOT_EDITING = Symbol('no_editing_index');

    let vm = new Vue({
        el: '.content',
        data: {
            article: {
                id: null,
                title: '',
                draft: '',
                img: '',
                imgPath: '',
                tags: [{id: null, name: '+'}]
            },
            existedTags: null,
            editingTagIndex: NOT_EDITING,
            showPublishBar: false,
            uploadAction: urls.api_upload_image
        },
        computed: {
            editorMinHeight() {
                return document.body.clientHeight - 240;
            }
        },
        methods: {
            async findArticle(id) {
                let {code, msg, data} = await articleService.detail(id);
                if (code === '1000') {
                    const article = data.article;
                    this.article.title = article.title;
                    this.article.draft = article.draft;
                    this.article.tags.unshift(...article.tags);
                } else {
                    this.$message.error(msg);
                }
            },
            async toDraft() {
                if (this.article.title === '') {
                    this.$message.error('请输入文章标题');
                    return;
                }
                if (this.article.id === null) { // 新增
                    let {code, msg, data} = await articleService.add(DRAFT, {
                        title: this.article.title,
                        draft: this.$refs.editor.markdown()
                    });
                    if (code === '1000') {
                        this.$message.info('已经保存为草稿');
                    }
                } else { // 保存
                    let {code, msg, data} = await articleService.save(this.article.id, DRAFT, {
                        type: DRAFT,
                        title: this.article.title,
                        draft: this.$refs.editor.markdown()
                    });
                    if (code === '1000') {
                        this.$message.info('已经保存为草稿');
                    }
                }
            },
            async toPublish() {
                this.article.content = this.$refs.editor.html();
                // 获取文章内首张图片
                if (this.article.img === '') {
                    this.article.img = matchImageUrl(this.article.content);
                }
                let {code, msg, data} = await tagService.find('');
                if (code === '1000') {
                    this.existedTags = new Map();
                    for (let tag of data.tags) {
                        this.existedTags.set(tag.name, tag.id);
                    }
                    this.showPublishBar = true;
                }
            },
            async confirmPublish() {
                if (this.article.title === '') {
                    this.$message.error('请输入文章标题');
                    return;
                }
                let tags = [];
                for (let tag of this.article.tags) {
                    if (tag.id !== null) {
                        tags.push(tag.id);
                    }
                }
                if (this.article.id === null) { // 新增
                    let {code, msg, data} = await articleService.add(PUBLISH, {
                        title: this.article.title,
                        draft: this.$refs.editor.markdown(),
                        content: this.$refs.editor.html(),
                        img: this.article.imgPath,
                        tags
                    });
                    if (code === '1000') {
                        this.$message.info('已发布成功');
                        this.showPublishBar = false;
                    }
                } else { // 保存
                    let {code, msg, data} = await articleService.save(this.article.id,
                        PUBLISH, {
                            title: this.article.title,
                            draft: this.$refs.editor.markdown(),
                            content: this.$refs.editor.html(),
                            img: this.article.imgPath,
                            tags
                        });
                    if (code === '1000') {
                        this.$message.info('已发布成功');
                        this.showPublishBar = false;
                    }
                }
            },
            cancelPublish() {
                this.showPublishBar = false;
            },
            addTagEditor() {
                this.article.tags.push({
                    id: null,
                    name: '+',
                    editing: false
                });
            },
            isEditingTag(index) {
                return index === this.editingTagIndex;
            },
            editTag(index) {
                if (index === this.article.tags.length - 1) {
                    this.article.tags[index].name = '';
                }
                this.editingTagIndex = index;
            },
            saveTag(index) {
                this.editingTagIndex = NOT_EDITING;
                if (index === this.article.tags.length - 1) {
                    this.addTagEditor();
                }
                let tagName = this.article.tags[index].name;
                if (tagName === '' || this.hasSameTag(index, tagName)) {
                    this.article.tags.splice(index, 1);
                } else {
                    if (this.existedTags.has(tagName)) {
                        this.article.tags[index].id = this.existedTags.get(tagName);
                    } else {
                        this.article.tags[index].id = null;
                    }
                }
            },
            isErrorTag(index) {
                return index !== this.article.tags.length - 1
                    && this.article.tags[index].id === null;
            },
            hasSameTag(index, name) {
                for (let i = 0; i < this.article.tags.length; i++) {
                    if (index !== i && name === this.article.tags[i].name) {
                        return true;
                    }
                }
                return false;
            },
            imageUploaded(result) {
                if (result.code === '1000') {
                    this.article.img = result.data.url;
                    this.article.imgPath = result.data.path;
                } else {
                    this.$message.error(result.msg);
                }
            }
        },
        watch: {
            ['article.draft'](draft) {
                this.$refs.editor.markdown(draft);
            }
        },
        created() {
            // 编辑文正时，获取文章Id，加载文章详情
            const contentMain = document.querySelector('.content-main');
            const id = contentMain ? contentMain.getAttribute('data-id') : '';
            if (id && id !== '') {
                this.article.id = id;
                this.findArticle(id);
            }
        },
        directives: {
            focus: {
                inserted: function (el, {value}) {
                    if (value) {
                        el.focus();
                    }
                }
            }
        }
    });
});