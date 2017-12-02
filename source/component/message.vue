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
        showMessage(msg, type) {
            clearTimeout(this.timer);
            this.message = msg;
            this.type = type;
            this.show = true;
            this.timer = setTimeout(() => {
                this.close();
            }, this.duration * 1000)
        },
        error(msg) {
            this.showMessage(msg, 'error');
        },
        info(msg) {
            this.showMessage(msg, 'info');
        },
        close () {
            this.show = false;
        }
    }
}
</script>