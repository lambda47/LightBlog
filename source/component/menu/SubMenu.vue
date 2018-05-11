<template>
    <li :class="{[`${classPre}-menu-item`]: true, active: active, collapsed: subMenuCollapsed}">
        <a :href="to" @click="handleClick($event)">
            <slot name="title"></slot>
        </a>
        <ul :class="`${classPre}-sub-menu`">
            <slot></slot>
        </ul>
    </li>
</template>

<script>
export default {
    name: 'SubMenu',
    props: {
        collapsed: {type: Boolean, default: true},
        classPre: {type: String, default: 'lb'}
    },
    data () {
        return {
            subMenuCollapsed: this.collapsed,
        }
    },
    methods: {
        handleClick(event) {
            this.subMenuCollapsed = !this.subMenuCollapsed;
            event.preventDefault();
            event.cancelBubble = true;
        },
        collapse() {
            this.subMenuCollapsed = true;
        }
    }
}
</script>