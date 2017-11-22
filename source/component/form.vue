<template >
    <form>
        <slot></slot>
    </form>
</template>

<script>
import 'jquery-form/dist/jquery.form.min.js';

export default {
    prop: {
        action: {type: 'String', default: ''}
    },

    mounted() {
        $(this.$el).ajaxForm({
            url: this.action,
            dataType: 'json',
            beforeSubmit: (arr, $form, action) => {
                let result = this.$emit('valid');
                if (result == false) {
                    return false;
                }
                let submitArr = this.$emit('before', arr);
                return submitArr;
            },
            success: (data, statusText) => {
                this.$emit('success', data);
            },
            error: data => {
                this.$emit('error', data)
            }

        });
    }
}
</script>