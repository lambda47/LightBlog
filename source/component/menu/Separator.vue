<template>
    <li :class="`${classPre}-menu-separator`">
        <slot></slot>
    </li>
</template>

<script>
export default {
    name: 'Separator',
    props: {
        classPre: {type: String, default: 'lb'}
    }
}
</script>