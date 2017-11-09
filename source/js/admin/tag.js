import 'bootstrap/dist/css/bootstrap.css';
import 'admin/tag.scss';

import 'bootstrap/dist/js/bootstrap.js';

import Vue from 'vue';
import {urls} from 'admin/common';

$(function () {
    var vm = new Vue({
        el: '.content',
        data: {
            name: '',
            tags: []
        },
        methods: {
            findTags: function () {
                var _this = this;
                $.post(urls.api_tags_find, {
                    name: this.name
                }).then(function (result) {
                    if (result.code == '1000') {
                        _this.tags = result.data.tags;
                    }
                });
            }
        },
        created: function () {
            this.findTags();
        }
    });
});