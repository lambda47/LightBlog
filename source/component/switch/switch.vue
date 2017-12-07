<template>
    <div class="lb-switch" @click="change()">
        <input type="hidden" :name="name" :value="value" />
        <div class="lb-switch-wrapper" :class="{'switch-on': isOn, 'switch-off': isOff}">
            <span class="switch-on-btn">{{onText}}</span>
            <span class="switch-block"></span>
            <span class="switch-off-btn">{{offText}}</span>
        </div>
    </div>
</template>
<style lang="scss">
.lb-switch {
    display: inline-block;
    position: relative;
    overflow: hidden;
    vertical-align: middle;

    .lb-switch-wrapper {
        display: flex;
        position: absolute;
        top: 0;

        width: 150%;
        height: 100%;

        &.switch-on {
            left: 0;
        }

        &.switch-off {
            left: -50%;
        }

        .switch-on-btn, .switch-block, .switch-off-btn {
            display: block;
            flex-grow: 1;

            height: 100%;
            width: 50%;

            text-align: center;
        }
    }
}
</style>
<script>
export default {
    props: {
        name: {type: String, default: ''},
        onText: {type: String, default: 'On'},
        offText: {type: String, default: 'Off'},
        onValue: {type: [Boolean, String, Number], default: true},
        offValue: {type: [Boolean, String, Number], default: false},
        default: {type: String, default: 'off'}
    },
    data() {
        return {
            status: this.default
        }
    },
    methods: {
        change() {
            if (this.isOn) {
                this.status = 'off';
            } else {
                this.status = 'on';
            }
            this.$emit('change', 'on')
        }
    },
    computed: {
        isOn() {
            return this.status === 'on';
        },
        isOff() {
            return !this.isOn;
        },
        value() {
            return this.isOn ? this.onValue : this.offValue;
        }
    }
}
</script>