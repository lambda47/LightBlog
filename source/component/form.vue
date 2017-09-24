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

    mounted: function() {
        var that = this;

        $(this.$el).ajaxForm({
            url: that.action,
            dataType: 'json',
            beforeSubmit: function(arr, $form, action) {
                var submitArr = that.$emit('before', arr);
                return submitArr;
            },
            success: function(data, statusText) {
                that.$emit('success', data);
            },
            error: function(data) {
                that.$emit('error', data)
            }

        });
    }
}
</script>