import 'admin/article_list.scss';

import Vue from 'vue';
import Menu from 'menu';
import Page from 'page';
import articleService from './service/article';

document.addEventListener('DOMContentLoaded', function() {
    Vue.use(Menu);
    Vue.use(Page);

    let vm = new Vue({
        el: '#app',
        data: {
            title: '',
            date: '',
            articles: [],
            pages: 0
        },
        methods: {
            async findArticles(page = 1) {
                let {code, msg, data} = await articleService.find(this.title, this.date, page);
                if (code === 1000) {
                    this.articles = data.articles;
                    this.pages = data.pages;
                }
            }
        },
        created() {
            this.findArticles();
        }
    });
}, false);