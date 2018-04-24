<template>
    <li :class="{[`${classPre}-menu-item`]: true, active: active}">
        <a :href="to">
            <slot name="title"></slot>
        </a>
        <slot></slot>
    </li>
</template>

<script>
export default {
    name: 'MenuItem',
    props: {
        classPre: {type: String, default: 'lb'},
        to: {type: String, default:''},
        active: {type: Boolean, default: false},
    }
}
</script>