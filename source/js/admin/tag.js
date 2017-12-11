import 'bootstrap/dist/css/bootstrap.css';
import 'admin/tag.scss';

import 'bootstrap/dist/js/bootstrap.js';

import {urls} from 'admin/common';
import Vue from 'vue';
import Message from 'message';
import ImageUpload from 'image-upload'
import tagService from './service/tag';

document.addEventListener('DOMContentLoaded', function() {
    Vue.use(Message, {transitionName: 'message-fade', duration: 2, classPre: 'admin'});
    Vue.use(ImageUpload);

    const NOT_EDITING = Symbol('no_editing_index');
    const MODE = {
        ADD: Symbol('add'),
        EDIT: Symbol('edit')
    };

    let vm = new Vue({
        el: '.content',
        data: {
            name: '',
            tags: [],
            editingTag: {
               index: NOT_EDITING,
               name: '',
               logo: '',
               path: ''
            },
            mode: null,
            key: 0,
            uploadAction: urls.api_upload_image
        },
        methods: {
            nextKey() {
                return this.key++;
            },
            async findTags() {
                this.cancelEdit();
                this.tags = [];
                let {code, msg, data} = await tagService.find(this.name);
                if (code === '1000') {
                    this.editingTag.index = NOT_EDITING;
                    data.tags.map(value => {
                        value.key = this.nextKey();
                    });
                    this.tags = data.tags;
                }
            },
            isEditing(index) {
                return this.editingTag.index === index;
            },
            toEditTag(index) {
                if (this.mode === MODE.ADD) {
                    this.tags.shift();
                    index--;
                }
                this.mode = MODE.EDIT;
                this.editingTag.index = index;
                this.editingTag.name = this.tags[index].name;
                this.editingTag.logo = this.tags[index].logo;
                this.editingTag.path = '';
            },
            cancelEdit() {
                if (this.mode === MODE.ADD) {
                    this.tags.shift();
                }
                this.mode = null;
                this.editingTag.index = NOT_EDITING;
            },
            async comfirmEdit() {
                if (this.editingTag.name === '') {
                    this.$message.error('请填写标签名');
                    return;
                }
                if (this.mode === MODE.ADD) {
                    if (this.editingTag.logo === '') {
                        this.$message.error('请上传标签图片');
                        return;
                    }
                    let {code, msg, data} = await tagService.add(this.editingTag.name, this.editingTag.path);
                    if (code === '1000') {
                        this.tags[this.editingTag.index].name = this.editingTag.name;
                        this.tags[this.editingTag.index].logo = this.editingTag.logo;
                        this.tags[this.editingTag.index].id = data.id;
                        this.mode = null;
                        this.editingTag.index = NOT_EDITING;
                    } else {
                        this.$message.error(msg);
                    }
                } else {
                    let {code, msg, data} = await tagService.edit(this.tags[this.editingTag.index].id,
                        this.editingTag.name, this.editingTag.path);
                    if (code === '1000') {
                        this.tags[this.editingTag.index].name = this.editingTag.name;
                        this.tags[this.editingTag.index].logo = this.editingTag.logo;
                        this.mode = null;
                        this.editingTag.index = NOT_EDITING;
                    } else {
                        this.$message.error(msg);
                    }
                }

            },
            toAddTag() {
                if (this.mode !== MODE.ADD) {
                    this.mode = MODE.ADD;
                    this.tags.unshift({
                        id: '',
                        name: '',
                        logo: '',
                        key: this.nextKey()
                    });
                    this.editingTag.index = 0;
                    this.editingTag.name = '';
                    this.editingTag.logo = '';
                    this.editingTag.path = '';
                }
            },
            async toDelTag(index) {
                let result = confirm('是否确认删除标签');
                if (result) {
                    let {code, msg, data} = await tagService.del(this.tags[index].id);

                    if (code === '1000') {
                       this.tags.splice(index, 1);
                    }
                }
            },
            imageUploaded(result) {
                if (result.code === '1000') {
                    this.editingTag.logo = result.data.url;
                    this.editingTag.path = result.data.path;
                }
            }
        },
        created() {
            this.findTags();
        }
    });
}, false);