<template>
    <div class="image-box-wrapper" @mouseenter="enterImg()" @mouseleave="leaveImg" @dragenter="enterImg()">
        <img class="image" :src="img" v-if="img"/>
        <div class="image" v-else></div>
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
            let file = null;
            if (event.type == 'change') {
                file = this.$refs.file.files[0];
            } else {
                file = event.dataTransfer.files[0];
            }
            let formData = new FormData();
            formData.append(this.$refs.file.name, file);
            for (let key in this.params) {
                formData.append(key, this.params[key]);
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
        for (let v of ['dragenter', 'dragover', 'dragleave', 'drop']) {
                document.addEventListener(v, event => {
                event.preventDefault();
            }, false);
        }
    }
}
</script>