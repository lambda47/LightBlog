import 'bootstrap/dist/css/bootstrap.css';
import 'admin/tag.scss';

import 'bootstrap/dist/js/bootstrap.js';

import Vue from 'vue';
import loading from 'loading.vue';
import imageUpload from 'imageUpload.vue';
import {urls} from 'admin/common';

$(function () {
    Vue.component('vue-loader', loading);
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
            uploadAction: urls.api_upload_image
        },
        methods: {
            findTags: function () {
                this.cancelEdit();
                $.post(urls.api_tags_find, {
                    name: this.name
                }).then(function (result) {
                    if (result.code == '1000') {
                        this.editingTag.index = -1;
                        result.data.tags.map(function(value, index, array) {
                            value.key = array.length - index - 1;
                        });
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
            },
            cancelEdit: function () {
                this.mode = null;
                this.editingTag.index = -1;
                this.editingTag.name = '';
                this.editingTag.logo = '';
                this.editingTag.path = '';
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
                            this.cancelEdit();
                        } else {
                            alert(result.msg);
                        }
                    }.bind(this));
                } else {

                }

            },
            toAddTag: function() {
                if (this.mode != 'add') {
                    this.mode = 'add';
                    this.tags.unshift({
                        id: '',
                        name: '',
                        logo: '',
                        key: this.tags.length
                    });
                    this.editingTag.index = 0;
                    this.editingTag.name = '';
                    this.editingTag.logo = '';
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