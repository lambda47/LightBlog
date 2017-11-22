import 'bootstrap/dist/css/bootstrap.css';
import 'admin/tag.scss';

import 'bootstrap/dist/js/bootstrap.js';

import Vue from 'vue';
import imageUpload from 'imageUpload.vue';
import {urls} from 'admin/common';

$(function () {
    Vue.component('vue-img-uploader', imageUpload);

    let vm = new Vue({
        el: '.content',
        data: {
            name: '',
            tags: [],
            editingTag: {
               index: -1,
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
            findTags() {
                this.cancelEdit();
                $.post(urls.api_tags_find, {
                    name: this.name
                }).then(result => {
                    if (result.code == '1000') {
                        this.editingTag.index = -1;
                        result.data.tags.map((value, index, array) => {
                            value.key = this.nextKey();
                        });
                        this.tags = result.data.tags;
                    }
                });
            },
            isEditing(index) {
                return this.editingTag.index == index;
            },
            toEditTag(index) {
                if (this.mode == 'add') {
                    this.tags.shift();
                    index--;
                }
                this.mode = 'edit';
                this.editingTag.index = index;
                this.editingTag.name = this.tags[index].name;
                this.editingTag.logo = this.tags[index].logo;
                this.editingTag.path = '';
            },
            cancelEdit() {
                if (this.mode == 'add') {
                    this.tags.shift();
                }
                this.mode = null;
                this.editingTag.index = -1;
            },
            comfirmEdit() {
                if (this.mode == 'add') {
                    $.post(urls.api_tags_add, {
                        'name': this.editingTag.name,
                        'logo': this.editingTag.path
                    }).then(result => {
                        if (result.code == '1000') {
                            this.tags[this.editingTag.index].name = this.editingTag.name;
                            this.tags[this.editingTag.index].logo = this.editingTag.logo;
                            this.tags[this.editingTag.index].id = result.data.id;
                            this.mode = null;
                            this.editingTag.index = -1;
                        } else {
                            alert(result.msg);
                        }
                    });
                } else {
                    $.post(urls.api_tags_edit, {
                        'id': this.tags[this.editingTag.index].id,
                        'name': this.editingTag.name,
                        'logo': this.editingTag.path
                    }).then(result => {
                        if (result.code == '1000') {
                            this.tags[this.editingTag.index].name = this.editingTag.name;
                            this.tags[this.editingTag.index].logo = this.editingTag.logo;
                            this.mode = null;
                            this.editingTag.index = -1;
                        } else {
                            alert(result.msg);
                        }
                    });
                }

            },
            toAddTag() {
                if (this.mode != 'add') {
                    this.mode = 'add';
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
            toDelTag(index) {
                let result = confirm('是否确认删除标签');
                if (result) {
                    $.post(urls.api_tags_del, {
                        id: this.tags[index].id
                    }).then(result => {
                        if (result.code == '1000') {
                           this.tags.splice(index, 1);
                        }
                    });
                }
            },
            imageUploaded(result) {
                if (result.code == '1000') {
                    this.editingTag.logo = result.data.url;
                    this.editingTag.path = result.data.path;
                }
            }
        },
        created() {
            this.findTags();
        }
    });
});