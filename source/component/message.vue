<template>
    <transition :name="transitionName">
        <div :class="[classPre + '-message', type]" v-show="show">
            <span :class="classPre + '-content'">{{message}}</span><i class="iconfont icon-close" @click="close"></i>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        transitionName: {type: String},
        classPre: {type: String, default: 'vue'},
        defaultMsg: {type: String, default: ''},
        duration: {type: Number, default: 2}
    },
    data() {
       return {
           show: false,
           message: this.defaultMsg,
           type: false,
           timer: null,
       }
    },
    methods: {
        error(msg) {
            clearTimeout(this.timer);
            this.message = msg;
            this.type = 'error';
            this.show = true;
            this.timer = setTimeout(() => {
                this.close();
            }, this.duration * 1000)
        },
        close () {
            this.show = false;
        }
    }
}
</script>