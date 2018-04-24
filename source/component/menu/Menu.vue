<template>
    <ul :class="`${classPre}-menu`">
        <slot></slot>
    </ul>
</template>

<script>
export default {
    name: 'Menu',
    props: {
        classPre: {type: String, default: 'lb'}
    }
}
</script>