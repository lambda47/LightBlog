<template>
    <ul v-if="pageNumbers">
        <li><a @click="toFirst"><<</a></li>
        <li><a @click="toPrev"><</a></li>
        <li v-for="num in pageNumbers" :class="{active: page == num}"><a @click="to(num)">{{num}}</a></li>
        <li><a @click="toNext">></a></li>
        <li><a @click="toLast">>></a></li>
    </ul>
</template>

<script>
export default {
    props: {
        pageNumber: {type: Number, default: 5},
        pages: {type: Number, default: 0},
        currentPage: {type: Number, default: 1}
    },
    data() {
        return {
            page: this.currentPage
        }
    },
    computed: {
       pageNumbers() {
           if (this.pages === 0) {
               return [];
           }
           let offset = Math.floor(this.pageNumber / 2);
           let begin = Math.max(1, this.page - offset);
           let end = Math.min(this.pages, this.page + offset);
           if (end - begin + 1 < this.pageNumber) {
               begin = Math.max(1, end - this.pageNumber + 1);
               end = Math.min(this.pages, begin + this.pageNumber - 1);
           }
           let items = [];
           for (let i = begin; i <= end; i++) {
               items.push(i);
           }
           return items;
       }
    },
    methods: {
        to(page) {
            this.page = page;
            this.$emit('update:currentPage', page);
            this.$emit('page-change', page);
        },
        toFirst() {
            this.to(1);
        },
        toLast() {
            this.to(this.pages);
        },
        toPrev() {
            if (this.page > 1) {
                this.page--;
                this.to(this.page);
            }
        },
        toNext() {
            if (this.page < this.pages) {
                this.page++;
                this.to(this.page);
            }
        }
    }
}
</script>