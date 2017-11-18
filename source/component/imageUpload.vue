<template>
    <div class="tag-box-icon-wrapper" @mouseenter="enterImg()" @mouseleave="leaveImg" @dragenter="enterImg()">
        <img class="image" :src="img"/>
        <input type="file" ref="file" :name="name" class="file" @change="upload($event)" />
        <div class="mask" v-show="showUpload"  @dragleave="leaveImg()" @click="choose" @drop="upload($event)"><i class="iconfont icon-add"></i></div>
    </div>
</template>

<script>
export default {
    props: {
        img: {type: String, default: ''},
        action: {type: String, default: ''},
        name: {type: String, default: 'file'},
        params: {type: Object, default: {}}
    },

    data: function() {
        return {
            isHover: false
        };
    },

    methods: {
        enterImg: function() {
            this.isHover = true;
        },
        leaveImg: function() {
            this.isHover = false;
        },
        choose: function() {
            this.$refs.file.click();
        },
        upload: function(event) {
            if (event.type == 'change') {
                var file = this.$refs.file.files[0];
            } else {
                var file = event.dataTransfer.files[0];
            }
            var formData = new FormData();
            formData.append(this.$refs.file.name, file);
            var params = this.params;
            for (var key in params) {
                formData.append(key, params[key]);
            }
            var _this = this;
            $.ajax({
                url: this.action,
                type: 'post',
                data: formData,
                cache: false,
                processData: false,
                contentType: false,
            }).then(function(data) {
                _this.$emit('result', data);
            });
        }
    },

    computed: {
        showUpload: function() {
            return this.img == '' || this.isHover;
        }
    },

    created: function() {
        // 阻止浏览器默认drop事件
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (value, index, array) {
                document.addEventListener(value, function (event) {
                event.preventDefault();
            }, false);
        })
    }
}
</script>