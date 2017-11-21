import 'bootstrap/dist/css/bootstrap.css';
import 'admin/tag.scss';

import 'bootstrap/dist/js/bootstrap.js';

import Vue from 'vue';
import loading from 'loading.vue';
import imageUpload from 'imageUpload.vue';
import {urls} from 'admin/common';

$(function () {
    Vue.component('vue-img-uploader', imageUpload);

    var vm = new Vue({
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
            nextKey: function () {
                return this.key++;
            },
            findTags: function () {
                this.cancelEdit();
                $.post(urls.api_tags_find, {
                    name: this.name
                }).then(function (result) {
                    if (result.code == '1000') {
                        this.editingTag.index = -1;
                        result.data.tags.map(function(value, index, array) {
                            value.key = this.nextKey();
                        }.bind(this));
                        this.tags = result.data.tags;
                    }
                }.bind(this));
            },
            isEditing: function(index) {
                return this.editingTag.index == index;
            },
            toEditTag: function(index) {
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
            cancelEdit: function () {
                if (this.mode == 'add') {
                    this.tags.shift();
                }
                this.mode = null;
                this.editingTag.index = -1;
            },
            comfirmEdit: function () {
                if (this.mode == 'add') {
                    $.post(urls.api_tags_add, {
                        'name': this.editingTag.name,
                        'logo': this.editingTag.path
                    }).then(function (result) {
                        if (result.code == '1000') {
                            this.tags[this.editingTag.index].name = this.editingTag.name;
                            this.tags[this.editingTag.index].logo = this.editingTag.logo;
                            this.tags[this.editingTag.index].id = result.data.id;
                            this.mode = null;
                            this.editingTag.index = -1;
                        } else {
                            alert(result.msg);
                        }
                    }.bind(this));
                } else {
                    $.post(urls.api_tags_edit, {
                        'id': this.tags[this.editingTag.index].id,
                        'name': this.editingTag.name,
                        'logo': this.editingTag.path
                    }).then(function (result) {
                        if (result.code == '1000') {
                            this.tags[this.editingTag.index].name = this.editingTag.name;
                            this.tags[this.editingTag.index].logo = this.editingTag.logo;
                            this.mode = null;
                            this.editingTag.index = -1;
                        } else {
                            alert(result.msg);
                        }
                    }.bind(this));
                }

            },
            toAddTag: function() {
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
            toDelTag: function(index) {
                var result = confirm('是否确认删除标签');
                if (result) {
                    $.post(urls.api_tags_del, {
                        id: this.tags[index].id
                    }).then(function (result) {
                        if (result.code == '1000') {
                           this.tags.splice(index, 1);
                        }
                    }.bind(this));
                }
            },
            imageUploaded: function (result) {
                if (result.code == '1000') {
                    this.editingTag.logo = result.data.url;
                    this.editingTag.path = result.data.path;
                }
            }
        },
        mounted: function () {
            this.findTags();
        }
    });
});