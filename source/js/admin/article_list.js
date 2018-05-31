import 'admin/article_list.scss';

import Vue from 'vue';
import Menu from 'menu';
import Page from 'page';
import articleService from './service/article';
import 'confirm';

document.addEventListener('DOMContentLoaded', function() {
    Vue.use(Menu);
    Vue.use(Page);

    let vm = new Vue({
        el: '#app',
        data: {
            title: '',
            date: '',
            articles: [],
            page: 1,
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
                this.$confirm('是否确认删除文章').then(async() => {
                    let {code, msg, data} = await articleService.del(id);

                    if (code === 1000) {
                        this.findArticles(this.page);
                    } else {
                        this.$message.error(msg);
                    }
                }).catch(() => {
                });
            },
        },
        created() {
            this.findArticles();
        }
    });
}, false);