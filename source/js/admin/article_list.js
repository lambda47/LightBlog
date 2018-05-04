import 'admin/article_list.scss';

import Vue from 'vue';
import Menu from 'menu';
import articleService from './service/article';

document.addEventListener('DOMContentLoaded', function() {
    Vue.use(Menu);

    let vm = new Vue({
        el: '#app',
        data: {

        },
        async created() {
            let result = await articleService.find('', '');
            console.log(result)
        }
    });
}, false);