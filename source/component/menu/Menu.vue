<template>
    <ul :class="`${classPre}-menu`" v-if="dropDownMenu" v-clickoutside="handleClickOutside">
        <slot></slot>
    </ul>
    <ul :class="`${classPre}-menu`" v-else>
        <slot></slot>
    </ul>
</template>

<script>
import {clickoutside} from 'util/directives';

export default {
    name: 'Menu',
    props: {
        classPre: {type: String, default: 'lb'},
        dropDownMenu: {type: Boolean, default: false}
    },
    directives: {
        clickoutside
    },
    methods: {
        handleClickOutside() {
            if (this.dropDownMenu) {
                for (let child of this.$children) {
                    if (child.$options.name === 'SubMenu') {
                        child.collapse();
                    }
                }
            }
        }
    }
}
</script>