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

    data() {
        return {
            isHover: false
        };
    },

    methods: {
        enterImg() {
            this.isHover = true;
        },
        leaveImg() {
            this.isHover = false;
        },
        choose() {
            this.$refs.file.click();
        },
        upload(event) {
            if (event.type == 'change') {
                var file = this.$refs.file.files[0];
            } else {
                var file = event.dataTransfer.files[0];
            }
            let formData = new FormData();
            formData.append(this.$refs.file.name, file);
            let params = this.params;
            for (let key in params) {
                formData.append(key, params[key]);
            }
            $.ajax({
                url: this.action,
                type: 'post',
                data: formData,
                cache: false,
                processData: false,
                contentType: false,
            }).then(data => {
                this.$emit('result', data);
            });
        }
    },

    computed: {
        showUpload() {
            return this.img == '' || this.isHover;
        }
    },

    created() {
        // 阻止浏览器默认drop事件
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((value, index, array) => {
                document.addEventListener(value, event => {
                event.preventDefault();
            }, false);
        })
    }
}
</script>