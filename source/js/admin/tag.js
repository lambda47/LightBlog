import 'bootstrap/dist/css/bootstrap.css';
import 'admin/tag.scss';

import 'bootstrap/dist/js/bootstrap.js';

import Vue from 'vue';
import loading from 'loading.vue';
import {urls} from 'admin/common';

$(function () {
    Vue.component('vue-loader', loading);

    var vm = new Vue({
        el: '.content',
        data: {
            name: '',
            tags: [],
            mode: null,
            editingIndex: -1
        },
        methods: {
            findTags: function () {
                var _this = this;
                this.$refs.loader.show();
                $.post(urls.api_tags_find, {
                    name: this.name
                }).then(function (result) {
                    _this.$refs.loader.hide();
                    if (result.code == '1000') {
                        _this.editingIndex = -1;
                        _this.tags = result.data.tags;
                    }
                });
            },
            isEditing: function(index) {
                return this.editingIndex == index;
            },
            toEditTag: function(index) {
                if (this.mode == 'add') {
                    this.cancelEdit();
                    index--;
                }
                this.mode = 'edit';
                this.editingIndex = index;
            },
            cancelEdit: function () {
                if (this.mode == 'add') {
                    this.tags.shift();
                }
                this.mode = null;
                this.editingIndex = -1;
            },
            comfirmEdit: function () {
                this.cancelEdit();
            },
            toAddTag: function() {
                if (this.mode != 'add') {
                    this.mode = 'add';
                    this.tags.unshift({'id': '', 'name': '', 'logo': ''});
                    this.editingIndex = 0;
                }
            }
        },
        mounted: function () {
            this.findTags();
        }
    });
});