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
            },
            async toDelArticle(id) {
                let result = confirm('是否确认删除文章');
                if (result) {
                    let {code, msg, data} = await articleService.del(id);

                    if (code === 1000) {
                        this.findArticles();
                    } else {
                        this.$message.error(msg);
                    }
                }
            },
        },
        created() {
            this.findArticles();
        }
    });
}, false);