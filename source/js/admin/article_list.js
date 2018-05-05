import 'admin/article_list.scss';

import Vue from 'vue';
import Menu from 'menu';
import articleService from './service/article';

document.addEventListener('DOMContentLoaded', function() {
    Vue.use(Menu);

    let vm = new Vue({
        el: '#app',
        data: {
            title: '',
            date: '',
            articles: []
        },
        methods: {
           async findArticles() {
               let {code, msg, data} = await articleService.find(this.title, this.date);
               if (code === 1000) {
                    this.articles = data.articles;
               }
           }
        },
        created() {
            this.findArticles();
        }
    });
}, false);