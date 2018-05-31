<template>
    <div :class="`${classPre}-confirm`" v-show="show">
        <div :class="`${classPre}-confirm-mask`">
        </div>
        <div :class="`${classPre}-confirm-box`">
            <span :class="`${classPre}-confirm-message`">{{message}}</span>
            <i class="iconfont icon-close" @click="cancel"></i>
            <button class="confirm-btn" @click="confirm">确定</button>
            <button class="cancel-btn" @click="cancel">取消</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        classPre: {type: String, default: 'lb'}
    },
    data() {
        return {
            message: '',
            callback: null,
            show: false,
        };
    },
    methods: {
        confirm() {
            this.callback('confirm');
            this.show = false;
        },
        cancel() {
            this.callback('cancel');
            this.show = false;
        }
    }
}
</script>